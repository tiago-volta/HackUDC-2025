package health.mental.domain.Chat;

public class MessageRequestDTO {
    private String msg;

    public MessageRequestDTO() {}

    public MessageRequestDTO(String msg) {
        this.msg = msg;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
