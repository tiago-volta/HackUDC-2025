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
Obtém o calendário do usuário para uma data específica, incluindo notas, mensagens de chat e avaliação do dia. O sistema pode gerar uma avaliação automática baseada nas interações do usuário.

**Cabeçalhos Necessários:**
```
Authorization: Bearer <token>
```

**Parâmetros de Path:**
- `date`: Data no formato YYYY-MM-DD

**Respostas:**
- `200 OK` - Retorna os dados do calendário
- `401 UNAUTHORIZED` - Token inválido ou expirado

**Exemplo de Resposta:**
```json
{
    "date": "2024-03-20",
    "note": "Exemplo de nota do dia",
    "chats": [
        {
            "message": "Exemplo de mensagem",
            "date": "2024-03-20T10:30:00"
        }
    ],
    "justificative": "Avaliação positiva baseada nas interações",
    "grade": 8
}
```

---

### 2. Atualizar Nota do Calendário

**Endpoint:**
```
PUT /calendar/{date}
```

**Descrição:**
Atualiza ou cria uma nota no calendário do usuário para uma data específica. Também pode disparar uma reavaliação automática do dia.

**Cabeçalhos Necessários:**
```
Authorization: Bearer <token>
```

**Parâmetros de Path:**
- `date`: Data no formato YYYY-MM-DD

**Corpo da Requisição:**
```json
{
    "note": "string"
}
```

**Respostas:**
- `200 OK` - Nota atualizada com sucesso
- `401 UNAUTHORIZED` - Token inválido ou expirado

**Exemplo de Resposta:**
```json
{
    "date": "2024-03-20",
    "note": "Nova nota atualizada",
    "chats": [
        {
            "message": "Exemplo de mensagem",
            "date": "2024-03-20T10:30:00"
        }
    ],
    "justificative": "Nova avaliação baseada na nota atualizada",
    "grade": 7
}
```

## Funcionalidades Especiais

### Avaliação Automática
- O sistema realiza avaliações automáticas baseadas em:
  - Mensagens de chat do dia
  - Notas do usuário
  - Conteúdo do arquivo prompt-dayevaluation.txt

### Reavaliação Periódica
- As avaliações são atualizadas automaticamente após 15 minutos
- Utiliza um sistema de IA para análise do conteúdo
- Gera uma nota (grade) e justificativa baseada nas interações

## Observações Técnicas

1. **Autenticação**
   - Requer token JWT válido
   - Token deve ser enviado no formato Bearer

2. **Formato de Dados**
   - Datas devem seguir o padrão YYYY-MM-DD
   - Notas são armazenadas como texto
   - Avaliações incluem nota numérica e justificativa

3. **Armazenamento**
   - As notas e avaliações são persistidas no banco de dados
   - Histórico de chat é mantido para referência

4. **Limitações**
   - Avaliações automáticas dependem da qualidade dos dados fornecidos
   - Sistema requer configuração adequada do arquivo prompt-dayevaluation.txt

## Códigos de Erro

- `401` - Problemas de autenticação
- `400` - Requisição mal formatada
- `500` - Erro interno do servidor
