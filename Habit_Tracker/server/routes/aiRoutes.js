import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { getCoaching } from "../controllers/aiController.js";

const aiRouter = Router();

aiRouter.post("/coach", protect, getCoaching);

export default aiRouter;
