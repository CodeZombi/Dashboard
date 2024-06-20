import express from "express";
import { getProductDetails, getProducts} from "../controllers/client.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/products/:itemName",getProductDetails);


export default router;