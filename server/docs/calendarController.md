# Calendar Controller Endpoints Documentation

## Base URL
```
/calendar
```

## Endpoints

### 1. Get User Calendar

**Endpoint:**
```
GET /calendar/{date}
```

**Description:**
Gets the user's calendar for a specific date, including notes, chat messages, and day evaluation. The system can generate an automatic evaluation based on user interactions.

**Required Headers:**
```
Authorization: Bearer <token>
```

**Path Parameters:**
- `date`: Date in YYYY-MM-DD format

**Responses:**
- `200 OK` - Returns calendar data
- `401 UNAUTHORIZED` - Invalid or expired token

**Response Example:**
```json
{
    "date": "2024-03-20",
    "note": "Example day note",
    "chats": [
        {
            "message": "Example message",
            "date": "2024-03-20T10:30:00"
        }
    ],
    "justificative": "Positive evaluation based on interactions",
    "grade": 8
}
```

---

### 2. Update Calendar Note

**Endpoint:**
```
PUT /calendar/{date}
```

**Description:**
Updates or creates a note in the user's calendar for a specific date. Can also trigger an automatic day re-evaluation.

**Required Headers:**
```
Authorization: Bearer <token>
```

**Path Parameters:**
- `date`: Date in YYYY-MM-DD format

**Request Body:**
```json
{
    "note": "string"
}
```

**Responses:**
- `200 OK` - Note successfully updated
- `401 UNAUTHORIZED` - Invalid or expired token

**Response Example:**
```json
{
    "date": "2024-03-20",
    "note": "New updated note",
    "chats": [
        {
            "message": "Example message",
            "date": "2024-03-20T10:30:00"
        }
    ],
    "justificative": "New evaluation based on updated note",
    "grade": 7
}
```

## Special Features

### Automatic Evaluation
- The system performs automatic evaluations based on:
  - Day's chat messages
  - User notes
  - Content from prompt-dayevaluation.txt file

### Periodic Re-evaluation
- Evaluations are automatically updated after 15 minutes
- Uses an AI system for content analysis
- Generates a grade and justification based on interactions

## Technical Notes

1. **Authentication**
   - Requires valid JWT token
   - Token must be sent in Bearer format

2. **Data Format**
   - Dates must follow YYYY-MM-DD pattern
   - Notes are stored as text
   - Evaluations include numerical grade and justification

3. **Storage**
   - Notes and evaluations are persisted in the database
   - Chat history is maintained for reference

4. **Limitations**
   - Automatic evaluations depend on provided data quality
   - System requires proper configuration of prompt-dayevaluation.txt file

## Error Codes

- `401` - Authentication issues
- `400` - Malformed request
- `500` - Internal server error
