import {Router} from "express"
import {registerData,loginData,logout} from "../controllers/user.controllers.js"
import { verifyToken } from "../middlewares/auth.middlewares.js"
import {sendMailer} from "../controllers/nodemailer.js"
import {zodValidator} from "../middlewares/validator.middlewares.js"
import { zodSchema } from "../validators/auth-validators.js"

const router = Router()

router.route("/register").post(zodValidator(zodSchema),registerData)
router.route("/login").post(loginData)
router.route("/token").get(verifyToken)
router.route("/logout").get(verifyToken,logout)
router.route("/email").post(sendMailer)

export default router