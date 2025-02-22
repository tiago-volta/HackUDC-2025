Documentação dos Endpoints do CalendarController

Base URL

/calendar

Endpoints

1. Obter Calendário do Utilizador

Endpoint:

GET /calendar/{date}

Descrição:
Retorna as informações do calendário do utilizador para uma data específica, incluindo notas, chats, avaliação e justificativa.

Cabeçalhos:

Authorization: Bearer <token>

Parâmetros de Caminho:

date (string): Data no formato yyyy-MM-dd.

Respostas:

200 OK - Retorna os dados do calendário.

401 UNAUTHORIZED - Token inválido ou expirado.

404 NOT FOUND - Dados do calendário não encontrados.

Exemplo de Resposta:

{
  "date": "2024-02-22",
  "note": "Reunião com terapeuta às 10h",
  "chats": [
    {
      "id": "chat1",
      "message": "Como foi o seu dia?",
      "date": "2024-02-22"
    }
  ],
  "justificative": "Paciente relatou ansiedade moderada.",
  "grade": 3
}

2. Atualizar Calendário do Utilizador

Endpoint:

PUT /calendar/{date}

Descrição:
Atualiza as notas e a avaliação do utilizador para uma data específica.

Cabeçalhos:

Authorization: Bearer <token>

Parâmetros de Caminho:

date (string): Data no formato yyyy-MM-dd.

Requisição:

{
  "note": "Atualização da nota do dia."
}

Respostas:

200 OK - Calendário atualizado com sucesso.

400 BAD REQUEST - Dados inválidos.

401 UNAUTHORIZED - Token inválido ou expirado.

