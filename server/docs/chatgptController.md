# ChatGPT Controller Endpoints Documentation

## Base URL
```
/gpt
```

## Endpoints

### 1. Ask ChatGPT

**Endpoint:**
```
GET /gpt/ask
```

**Description:**
Makes a query to ChatGPT and returns the response.

**Request:**
```json
{
  "query": "string"
}
```

**Responses:**
- `200 OK` - Returns ChatGPT's response.
- `400 BAD REQUEST` - Request error.

**Response Example:**
```json
{
  "response": "Here is the AI's response..."
}
```
