import express from 'express';
import { finalizeOrder,createCheckoutSession} from '../controllers/StripeController.js';
const router = express.Router();

router.post("/create",createCheckoutSession);
router.post("/capture", finalizeOrder);


export default router;