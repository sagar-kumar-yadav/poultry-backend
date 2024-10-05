import express from "express";
import {
  forgotPasswordController,
  loginController,
  registerController,
  testController,
} from "../controllers/authController.js";
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";

// router object
const router = express.Router();

// routing
// Register || Method POST
router.post("/register", registerController);

// Login || POST
router.post("/login", loginController);

// forgot password || POST
router.post("/forgot-password", forgotPasswordController);

// test routes || GET
// we create two middlewares in requireSignIn we check token and isAdmin we check the admin
router.get("/test", requireSignIn, isAdmin, testController);

// protected user route auth || GET
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;