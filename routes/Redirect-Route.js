import express from "express";
import { redirectLink } from "../controllers/Redirect-controller.js";

const router = express.Router();

router.get('/:nanoLink', redirectLink)

export default router;