# Auth Controller Endpoints Documentation

## Base URL
```
/auth
```

## Endpoints

### 1. Login

**Endpoint:**
```
POST /auth/login
```

**Description:**
Authenticates a user and returns a JWT token.

**Request:**
```json
{
  "login": "string",
  "password": "string"
}
```

**Responses:**
- `200 OK` - Returns a JWT token.
- `401 UNAUTHORIZED` - Invalid login or password.

**Response Example:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 2. Get Authenticated User

**Endpoint:**
```
GET /auth/me
```

**Description:**
Returns the authenticated user's data.

**Headers:**
```
Authorization: Bearer <token>
```

**Responses:**
- `200 OK` - Returns the authenticated user's data.
- `401 UNAUTHORIZED` - Invalid or expired token.

**Response Example:**
```json
{
  "id": 1,
  "login": "user@example.com",
  "role": "USER"
}
```

---

### 3. Register User

**Endpoint:**
```
POST /auth/register
```

**Description:**
Registers a new user on the platform.

**Request:**
```json
{
  "login": "string",
  "password": "string",
  "role": "USER | ADMIN | ETC" 
}
```

**Responses:**
- `200 OK` - User successfully registered.
- `400 BAD REQUEST` - Username already in use.

**Error Response Example:**
```json
{
  "error": "Login/Username already in use"
}
```
