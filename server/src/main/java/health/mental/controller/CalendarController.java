package health.mental.controller;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import health.mental.domain.Calendar.*;
import health.mental.domain.Calendar.Calendar;
import health.mental.domain.User.User;
import health.mental.infra.security.TokenService;
import health.mental.repositories.CalendarRepo;
import health.mental.repositories.ChatRepository;
import health.mental.repositories.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.jose4j.json.internal.json_simple.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static java.nio.file.Paths.get;

@RestController
@RequestMapping("/calendar")
@Tag(name = "Calendar Controller", description = "Endpoints for user calendar")
public class CalendarController {


    @Autowired
    private CalendarRepo calendarRepo;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private ChatgptController chatgptController;

    private final String promptTxtPath = "src/main/java/health/mental/domain/calendar/prompt-dayevaluation.txt";
    @GetMapping("/{date}")
    @Operation(summary = "Get user calendar", description = "Get user calendar by user id and date")
    public ResponseEntity getCalendar(@RequestHeader("Authorization") String bearerToken, @PathVariable String date) throws IOException {
        String token = bearerToken.substring(7);
        String userLogin = tokenService.validateToken(token);
        User u = (User) userRepository.findByLogin(userLogin);
        String userId = u.getId();

        Integer grade = 0;
        String justificative = "No evaluation";
        var calendarUser = calendarRepo.findAllByUserId(userId);
        String changeDay ="" ;
        for(var eval : calendarUser.getEvaluationDay()){
            if(eval.getDay().equals(date)){
                grade = eval.getEvaluation();
                changeDay = eval.getDateOfEvaluation();
                justificative = eval.getEvaluationJustification();
            }
        }
        if(!changeDay.equals("")){
            // se ja passou mais de 15 minutos printa ola
            Date date1 = new Date();
            SimpleDateFormat formatter = new SimpleDateFormat("EEE MMM dd HH:mm:ss z yyyy", Locale.ENGLISH);
            Date date2 = null;
            try {
                 date2 = formatter.parse(changeDay);
                System.out.println("Data convertida: " + date2);
            } catch (ParseException e) {
                e.printStackTrace();
            }
            if (date1.getTime() - date2.getTime() > 900000) {

                var eval = getEvaluationCalendar(getChatsFromDay(date,userId),"No note");


                try {
                    ObjectMapper objectMapper = new ObjectMapper();
                    EvaluationDTO evaluation = objectMapper.readValue(eval.toString(), EvaluationDTO.class);

                    grade = evaluation.getGrade();
                    justificative = evaluation.getJustification();

                    for( var evall : calendarUser.getEvaluationDay() ){

                        evall.setDateOfEvaluation(new Date().toString());
                    }

                    calendarRepo.save(calendarUser);

                } catch (Exception e) {
                    System.out.println("Erro ao processar JSON: " + e.getMessage());
                }





            }

        }

        for (var noteDay : calendarUser.getNoteday()) {
            if (noteDay.getDate().equals(date)) {
                return ResponseEntity.ok(new CalendarReturnDTO(noteDay.getDate(), noteDay.getNote(), getChatsFromDay(date,userId), justificative, grade));
            }
        }


       var chats = getChatsFromDay(date,userId);
        var calendar = calendarRepo.findAllByUserId(userId);

        for(var eval : calendar.getEvaluationDay()){
            if(eval.getDay().equals(date)){
                return ResponseEntity.ok(new CalendarReturnDTO(date, "No note", chats, eval.getEvaluationJustification(), eval.getEvaluation()));
            }
        }
        if(chats != "No chat" ){


            var eval = getEvaluationCalendar(chats,"No note");
            int newGrade = 0;
            String newJustificative = "No evaluation";

            try {
                ObjectMapper objectMapper = new ObjectMapper();
                EvaluationDTO evaluation = objectMapper.readValue(eval.toString(), EvaluationDTO.class);

                 newGrade = evaluation.getGrade();
                 newJustificative = evaluation.getJustification();


            } catch (Exception e) {
                System.out.println("Erro ao processar JSON: " + e.getMessage());
            }


            EvaluationDay newEval = new EvaluationDay(date,newGrade,newJustificative,new Date().toString());
            List<EvaluationDay> evals = new ArrayList   <>();
            evals.add(newEval);

             calendar = calendarRepo.findAllByUserId(userId);
            calendar.setEvaluationDay(evals);
            calendarRepo.save(calendar);

            return ResponseEntity.ok(new CalendarReturnDTO(date, "No note", chats, newJustificative, newGrade));
        }
        return ResponseEntity.ok(new CalendarReturnDTO(date, "No note", "No chat", "No evaluation"));
    }

    @PutMapping("/{date}")
    @Operation(summary = "Update user calendar", description = "Update user calendar by user id and date")
    public ResponseEntity updateCalendar(@RequestHeader("Authorization") String bearerToken, @RequestBody CalendarInsertDTO calendarInsertDTO, @PathVariable String date) {

        String token = bearerToken.substring(7);
        String userLogin = tokenService.validateToken(token);
        User u = (User) userRepository.findByLogin(userLogin);
        String userId = u.getId();

        var calendarUser = calendarRepo.findAllByUserId(userId);

        for(var noteDay : calendarUser.getNoteday()){
            if(noteDay.getDate().equals(date)){
                noteDay.setNote(calendarInsertDTO.note);
                CalendarReturnDTO res = new CalendarReturnDTO(noteDay.getDate(), noteDay.getNote(), getChatsFromDay(date,userId),getEvaluationCalendar(getChatsFromDay(date,userId), noteDay.getNote()).toString());

                for(var eval : calendarUser.getEvaluationDay()){
                    if(eval.getDay().equals(date)) {
                        eval.setEvaluation(res.getGrade());
                        eval.setEvaluationJustification(res.getJustificative());
                        eval.setDateOfEvaluation(new Date().toString());
                    }
                }

                calendarRepo.save(calendarUser);
                return ResponseEntity.ok(res);
            }
        }
        PairNoteDay newNoteDay = new PairNoteDay(calendarInsertDTO.note, date);
        calendarUser.getNoteday().add(newNoteDay);



        calendarRepo.save(calendarUser);
        return ResponseEntity.ok(new CalendarReturnDTO(date, calendarInsertDTO.note, "No chat", "No evaluation"));

    }

    private Object getChatsFromDay(String date,String userId) {
        var chats = chatRepository.findAllByUserId(userId);
        List<Object> chatList = new ArrayList<>();
        for (var chat : chats) {
            for(var msg: chat.getChatMsgs()){

                if(msg.getDate().toLocalDate().toString().equals(date)){
                    chatList.add(msg);
                }

            }
        }
        if(chatList.size() > 0){
            return chatList;
        }
        return "No chat";
    }



    private Object getEvaluationCalendar(Object msgs,String note){
        String txtContent = "";

        try {
            Path path = get(promptTxtPath);
            txtContent = Files.readString(path);

            Map<String,String> userInfo = new HashMap<>();
            userInfo.put("diario",note);
            userInfo.put("mensagens",msgs.toString());

            ObjectMapper objectMapper = new ObjectMapper();
            String toReplace = objectMapper.writeValueAsString(userInfo);

            txtContent = txtContent.replace("{JSON}",toReplace);

            var res = chatgptController.ask(txtContent);



            return res.getBody();
        } catch (IOException e) {
            throw new RuntimeException("Erro ao ler o ficheiro " + promptTxtPath, e);
        }
    }

}
