# Lead Manager

A simple lead management application built to help manage potential customers in one place. Users can add leads, view and update their details, track their status, and search or filter records.

## Tech Stack

**Frontend**
- React.js
- Vite
- Tailwind CSS
- React Router

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

## Features

- Add new leads with name, email, phone, company, source, and status.
- View all leads in a table.
- Edit lead information and update lead status.
- Delete leads with a confirmation prompt.
- Search leads by name.
- Filter leads by status.
- Dashboard with total lead counts for each status.
- Recent leads overview.
- Pagination and sorting.
- Frontend and backend validation for required fields, email, and phone number.

## Run Locally

### Prerequisites

Make sure you have installed:
- Node.js and npm
- MongoDB Community Server
- Git (optional)

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd lead-manager
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/leadManager
```

Start the backend:

```bash
npm run dev
```

The API will run at `http://localhost:5000`.

### 3. Set up the frontend

Open another terminal from the project root:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_URL=http://localhost:5000/api/leads
```

Start the frontend:

```bash
npm run dev
```

Open the local URL displayed by Vite, usually `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/leads` | Get all leads |
| POST | `/api/leads` | Create a lead |
| PUT | `/api/leads/:id` | Update a lead |
| DELETE | `/api/leads/:id` | Delete a lead |

## Assumptions

- Each lead has a name, email, phone number, company, and source.
- A newly created lead has the default status `New`.
- The available statuses are `New`, `Contacted`, `Qualified`, and `Lost`.
- Phone numbers are stored as strings and must contain 10–15 digits.
- The application is designed as a single-user local management tool. Authentication and user-specific lead access are not included.
- MongoDB runs locally by default, but the connection string can be changed through the environment configuration.

## Improvements With More Time

- Add user registration, login, and authentication.
- Add role-based access and user-specific leads.
- Add pagination and sorting through the backend for larger datasets.
- Add automated API and frontend tests.
- Improve deployment and production configuration.
- Add CSV import and export for lead records.

## Author

**Sameer Bisayati**