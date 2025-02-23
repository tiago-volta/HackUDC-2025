# Chat Controller Endpoints Documentation

## Base URL
```
/chat
```

## Endpoints

### 1. Create New Chat

**Endpoint:**
```
POST /chat/new
```

**Description:**
Creates a new chat session for the authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Responses:**
- `200 OK` - Chat created successfully
- `400 BAD REQUEST` - User not found

**Response Example:**
```json
{
  "chatId": "123456789"
}
```

---

### 2. Get Chat

**Endpoint:**
```
GET /chat/{id}
```

**Description:**
Retrieves a specific chat by its ID.

**Path Parameters:**
- `id`: Chat ID

**Responses:**
- `200 OK` - Returns chat details
- `400 BAD REQUEST` - Chat not found

**Response Example:**
```json
{
  "id": "123456789",
  "messages": [],
  "userId": "987654321"
}
```

---

### 3. Send Message

**Endpoint:**
```
POST /chat/{id}
```

**Description:**
Sends a message to a specific chat and receives an AI response.

**Headers:**
```
Authorization: Bearer <token>
```

**Path Parameters:**
- `id`: Chat ID

**Request Body:**
```json
{
  "msg": "string"
}
```

**Responses:**
- `200 OK` - Returns AI response
- `400 BAD REQUEST` - Chat/User not found or error in response

---

### 4. Delete Chat

**Endpoint:**
```
DELETE /chat/{id}
```

**Description:**
Deletes a specific chat.

**Path Parameters:**
- `id`: Chat ID

**Responses:**
- `200 OK` - Chat deleted successfully

---

### 5. Get Chat History

**Endpoint:**
```
GET /chat/history
```

**Description:**
Retrieves chat history for the authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Responses:**
- `200 OK` - Returns list of chats
- `400 BAD REQUEST` - User not found

**Response Example:**
```json
[
  {
    "id": "123456789",
    "title": "Chat Title",
    "messages": []
  }
]
```

---

### 6. Get Grouped Chats

**Endpoint:**
```
GET /chat/group
```

**Description:**
Retrieves chats grouped by day for the authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Responses:**
- `200 OK` - Returns chats grouped by date
- `400 BAD REQUEST` - User not found

**Response Example:**
```json
{
  "2024-03-20": [
    {
      "chatId": "123456789",
      "messages": []
    }
  ]
}
```

## Technical Notes

1. **Authentication**
   - All endpoints require JWT authentication
   - Token must be provided in Bearer format

2. **Chat Title Generation**
   - First message in a chat automatically generates a title
   - Title length is limited to 25-30 characters

3. **Error Handling**
   - Returns appropriate error messages for invalid requests
   - Handles AI response formatting errors

4. **Response Format**
   - All successful responses return JSON format
   - Error responses include descriptive messages
