Aqui está o arquivo Markdown gerado com base no código fornecido e no formato dos exemplos que você compartilhou:

```markdown
# Documentação dos Endpoints do CalendarController

## Base URL
```
/calendar
```

## Endpoints

### 1. Obter Calendário do Usuário

**Endpoint:**
```
GET /calendar/{date}
```

**Descrição:**
Obtém o calendário do usuário autenticado para uma data específica.

**Cabeçalhos:**
```
Authorization: Bearer <token>
```

**Parâmetros de Caminho:**
- `date` (string): Data no formato `yyyy-MM-dd`.

**Respostas:**
- `200 OK` - Retorna o calendário do usuário para a data especificada.
- `401 UNAUTHORIZED` - Token inválido ou expirado.

**Exemplo de Resposta:**
```json
{
  "date": "2023-10-01",
  "note": "No note",
  "chats": [
    {
      "id": 1,
      "message": "Exemplo de mensagem",
      "date": "2023-10-01T10:00:00"
    }
  ],
  "justificative": "No evaluation",
  "grade": 0
}
```

---

### 2. Atualizar Calendário do Usuário

**Endpoint:**
```
PUT /calendar/{date}
```

**Descrição:**
Atualiza o calendário do usuário autenticado para uma data específica.

**Cabeçalhos:**
```
Authorization: Bearer <token>
```

**Parâmetros de Caminho:**
- `date` (string): Data no formato `yyyy-MM-dd`.

**Requisição:**
```json
{
  "note": "string"
}
```

**Respostas:**
- `200 OK` - Retorna o calendário atualizado do usuário.
- `401 UNAUTHORIZED` - Token inválido ou expirado.

**Exemplo de Resposta:**
```json
{
  "date": "2023-10-01",
  "note": "Atualização de nota",
  "chats": [
    {
      "id": 1,
      "message": "Exemplo de mensagem",
      "date": "2023-10-01T10:00:00"
    }
  ],
  "justificative": "Justificativa atualizada",
  "grade": 5
}
```

---

## Detalhes Adicionais

### 1. Lógica de Avaliação Automática

Se o usuário não tiver uma avaliação para a data especificada, o sistema tenta gerar uma avaliação automática com base nas mensagens do dia e no diário do usuário. A avaliação é feita utilizando um prompt armazenado no arquivo `prompt-dayevaluation.txt`.

### 2. Estrutura de Resposta do Calendário

A resposta do calendário contém os seguintes campos:
- `date` (string): Data do calendário.
- `note` (string): Nota do usuário para o dia.
- `chats` (array): Lista de mensagens do dia.
- `justificative` (string): Justificativa da avaliação.
- `grade` (integer): Nota da avaliação.

### 3. Erros Possíveis

- `401 UNAUTHORIZED`: O token de autenticação é inválido ou expirou.
- `500 INTERNAL SERVER ERROR`: Erro interno no servidor ao processar a requisição.

---

## Observações

- O sistema utiliza o ChatGPT para gerar avaliações automáticas com base nas mensagens e notas do usuário.
- O arquivo `prompt-dayevaluation.txt` é essencial para a lógica de avaliação automática. Certifique-se de que ele esteja configurado corretamente.
- O tempo limite para reavaliação automática é de 15 minutos após a última avaliação.

``` 

Se precisar de ajustes ou mais endpoints, é só me avisar! 😊
