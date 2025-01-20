import { Router } from "express";

const router = Router()

router.get("/login", async (req, res) => {
    res.render("templates/login", {})
})

router.get("/register", async (req, res) => {
    res.render("templates/register", {})
})

export default router