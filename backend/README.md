# Innosci Alumni Connect Backend

Backend service for the Innosci Alumni Connect application.

Stack:

- FastAPI
- MySQL
- AWS Cognito Authentication
- JWT Authorization

---

# Local Setup

## 1. Clone repository

```bash
git clone <repository-url>
cd backend
```

---

## 2. Install dependencies

This project uses **uv**.

Install dependencies:

```bash
uv sync
```

This creates and manages the project virtual environment.

---

## 3. Configure environment variables

Create `.env` file in the backend directory:

```env
DB_HOST=<mysql-host>
DB_USER=<mysql-user>
DB_PASSWORD=<mysql-password>
DB_NAME=innosci

COGNITO_REGION=<aws-region>
COGNITO_USER_POOL_ID=<user-pool-id>
COGNITO_CLIENT_ID=<client-id>
```

---

## 4. Run backend

```bash
uv run uvicorn backend.main:app --reload
```

Backend:

```
http://127.0.0.1:8000
```

---

# API Documentation

Swagger UI:

```
http://127.0.0.1:8000/docs
```

Use Swagger for:

- API endpoints
- Request payloads
- Responses
- Testing APIs

Swagger is the source of truth for the API contract.

---

# Cognito Authentication Testing

A test script is available:

```
test_cognito.py
```

Run:

```bash
uv run python test_cognito.py
```

The script authenticates with Cognito and returns an access token.

To test protected APIs:

1. Open:

```
http://127.0.0.1:8000/docs
```

2. Click **Authorize**

3. Enter:

```
Bearer <access_token>
```

Example:

```
Bearer eyJxxxxxxxx
```

---

# Authentication Flow

```
Frontend / Test Client
        |
        | Login with SPA App Client
        |
        v
AWS Cognito
        |
        | JWT Access Token
        |
        v
FastAPI Backend
        |
        | verify_token()
        |
        v
MySQL User Lookup
        |
        v
/me response
```

Protected requests must include:

```
Authorization: Bearer <token>
```

---

# Available Features

Current backend supports:

- User registration
- Cognito authentication
- User profiles
- Profile updates
- Alumni directory and search
- Admin approval workflow
- Admin dashboard statistics
- Alumni Spotlight carousel

---

# Full architecture

```
                         ┌───────────────┐
                         │     USER      │
                         │   Browser     │
                         └───────┬───────┘
                                 │
                                 ▼

                  ┌────────────────────────┐
                  │       FRONTEND         │
                  │   React Application    │
                  │  (AWS cloudfront + s3) │
                  │                        │
                  │ - Login / Signup       │
                  │ - Profile              │
                  │ - Search               │
                  │ - Spotlight Carousel   │
                  │ - Admin Screens        │
                  └───────────┬────────────┘
                              │
              ┌───────────────┴───────────────┐
              │                               │
              │ Authentication                │ API Requests
              │                               │ JWT Token
              ▼                               ▼

       ┌───────────────┐          ┌──────────────────────┐
       │ AWS COGNITO   │          │   FASTAPI BACKEND    │
       │               │          │ Elastic Beanstalk    │
       │ - Signup      │          │                      │
       │ - Login       │          │ - API Endpoints      │
       │ - JWT Tokens  │          │ - JWT Verification   │
       │               │          │ - Business Logic     │
       └───────────────┘          │ - User Management    │
                                  │ - Admin Workflow     │
                                  │ - Spotlight APIs     │
                                  └──────────┬───────────┘
                                             │
                                             │ SQL
                                             ▼

                                  ┌──────────────────────┐
                                  │      MYSQL DB        │
                                  │       (RDS)          │
                                  │                      │
                                  │ Tables:              │
                                  │ - users              │
                                  │ - spotlight          │
                                  └──────────────────────┘
```


---

# Frontend Notes

- Users appear in the directory only after admin approval.
- Admin endpoints require an ADMIN Cognito token.
- Spotlight APIs provide homepage carousel content.
- Always refer to Swagger for the latest API definitions.
