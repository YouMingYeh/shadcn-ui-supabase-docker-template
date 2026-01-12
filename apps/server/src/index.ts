// Load environment variables from .env file
// In development: nodemon also uses --env-file flag (redundant but harmless)
// In production Docker: env vars come from docker-compose.yml (dotenv is no-op)
// For local production builds: dotenv provides fallback
import "dotenv/config";

// Import the app
import { app } from "./app.js";

const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || "development";

const server = app.listen(PORT, async () => {
  console.log(`🚀 Server running in ${NODE_ENV} mode on port ${PORT}`);
});