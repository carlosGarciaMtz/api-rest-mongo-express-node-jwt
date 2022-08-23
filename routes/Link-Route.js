import express from "express";
import { getLinks, getOneLink, createLink, updateLink, removeLink } from "../controllers/Link-Controller.js";
import { requireToken } from "../middlewares/Require-Auth.js";
import { validateLinks, validateParamsLink } from "../middlewares/Validator-Manager.js";

const router = express.Router();


router.get("/", requireToken, getLinks);
router.get("/:nanoLink", getOneLink);
router.post("/", requireToken, validateLinks, createLink);
router.patch("/:id",requireToken, validateParamsLink, validateLinks, updateLink);
router.delete("/:id",requireToken, validateParamsLink, removeLink);

router.get("/healtcheck", (req, res) => {
  res.json({
    status: "success",
    message: "links is running",
    version: "1.0.0"
  });
});

export default router;