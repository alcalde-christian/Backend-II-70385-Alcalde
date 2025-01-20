import { Router } from "express";
import { login, register } from "../controllers/sessionsController.js";

const sessionRouter = Router()

sessionRouter.post("/login", login)
sessionRouter.post("/register", register)

export default sessionRouter