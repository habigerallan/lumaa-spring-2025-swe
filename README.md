# Project Setup

## Backend Setup
1. Navigate to `/backend/`
2. Install dependencies:  
   ```sh
   npm install
   ```
3. Run database migrations:  
   ```sh
   npx knex migrate:latest
   ```
4. Start the backend server:  
   ```sh
   npm start
   ```
5. If the frontend host has changed from default, update CORS settings in `server.js`.

## Environment Variables (Backend)
Ensure the following environment variables are set:

```env
DATABASE_URL=postgres://username:password@host/task_db
JWT_SECRET=your_jwt_secret
```

Adjust values as needed for your environment.

## Frontend Setup
1. Navigate to `/frontend/`
2. Install dependencies:  
   ```sh
   npm install
   ```
3. Start the frontend server:  
   ```sh
   npm start
   ```
4. If the backend host has changed from default, update `api.ts` in the frontend.
