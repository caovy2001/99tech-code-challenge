# Problem 5: A Crude Server

A minimal Express + TypeScript API that persists users in MySQL via TypeORM.  

## Requirements

- Node.js ≥ 20
- npm
- Docker (for the bundled MySQL service)

## Quick Start

### Environment Variables

This project uses a `.env` file (see `.gitignore`) to manage environment variables for local development. In production, set environment variables via your deployment platform.

**Example `.env` file:**
```
PORT=3000
NODE_ENV=dev
```

- `PORT`: Port for the Express server (default: `3000`).
- `NODE_ENV`: `dev` for local/development environment, `prod` for production environment

**Note:** The app will fall back to default values if a variable is omitted.


1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Start MySQL 8.0 via Docker**
   ```bash
   docker compose up -d
   ```
   - Database: `expressdb`
   - Username / password: `root` / `root`
   - Port exposed locally: `3306`
3. **Run migrations (schema + sample data)**
   ```bash
   npm run migration:run
   ```
   
4. **Start the API in watch mode**
   ```bash
   npm run dev
   ```

5. **Build & run the production bundle**
   ```bash
   npm run build
   npm start
   ```

## Available Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the API with live reload (`ts-node-dev`). |
| `npm run build` | Compile TypeScript sources into `dist`. |
| `npm start` | Run the compiled server (`node dist/index.js`). |
| `npm run migration:run` | Execute pending TypeORM migrations using `src/configs/data-source.ts`. |

## Database & Configuration

- Connection settings live in `src/data-source.ts` (host `127.0.0.1`, port `3306`, db `expressdb`, user `root`, password `root`).
- To change them, edit the DataSource or provide environment variables before starting Docker/MySQL.
- All migrations reside in `src/migrations/` and are automatically versioned via timestamps.

## API Endpoints

| Method & Path | Description |
| --- | --- |
| `POST /users` | Create a user (requires `name` ≤ 200 chars and `description`). |
| `GET /users` | List users; supports `q` (name search), `limit`, `offset`. |
| `GET /users/:id` | Fetch a single user by numeric ID. |
| `PUT /users/:id` | Update `name` and/or `description`. At least one field is required. |
| `DELETE /users/:id` | Remove a user. Returns `204` when successful. |


### Request / Response Examples

```bash
# Create
curl -X POST http://localhost:3000/users \
  -H 'Content-Type: application/json' \
  -d '{"name":"John Doe","description":"User description"}'

# List with filters
curl "http://localhost:3000/users?q=John&limit=5&offset=0"

# Retrieve
curl http://localhost:3000/users/1

# Update
curl -X PUT http://localhost:3000/users/1 \
  -H 'Content-Type: application/json' \
  -d '{"description":"Updated Description"}'

# Delete
curl -X DELETE http://localhost:3000/users/1
```
