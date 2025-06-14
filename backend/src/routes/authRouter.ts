import { Router } from "express";
import { registerUser } from "../controllers/authRegister"
import { loginUser } from "../controllers/authLogin"

const router = Router()

router.post("/register", registerUser)
router.post("/login", loginUser)

export default router
