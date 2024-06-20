import express, { Router } from "express";
import {getUser} from '../controllers/authController.js'

const router = express.Router();

router.get("/user/:username", getUser);


export default router;