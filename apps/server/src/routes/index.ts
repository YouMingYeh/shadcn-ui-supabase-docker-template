import { Router, type IRouter } from "express";
import { healthCheck } from "../controllers/health.controller.js";

const router: IRouter = Router();

// Health check endpoint
router.get("/health", healthCheck);

// Add other API routes here as needed

export { router };