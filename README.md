# Project Setup

## Backend Setup
1. Navigate to `/backend/`
2. Install dependencies:  
   ```sh
   npm install
   ```
3. Create postgres database named "task_db". [Installation Instructions](https://www.postgresql.org/docs/current/tutorial-install.html)

4. Run database migrations:  
   ```sh
   npm run knex migrate:latest
   ```
5. Start the backend server:  
   ```sh
   npm start
   ```
6. If the frontend host has changed from default, update CORS settings in `server.js`.

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

## Video Demonstration
[https://drive.google.com/file/d/1klW5zL9PPoBZlVNWDTYpL28GADF5wssb/view?usp=sharing](https://drive.google.com/file/d/1klW5zL9PPoBZlVNWDTYpL28GADF5wssb/view?usp=sharing)


## Monthly Salary
$4000