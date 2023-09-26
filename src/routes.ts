import { Router } from "express";
import ProductController from "./controllers/ProductController";

const router = Router();

router.get("/products", ProductController.getAllProducts);  
router.get("/product/:id", ProductController.getProduct);  
router.post("/create-product", ProductController.createProduct);  
router.put("/update-product/:id", ProductController.updateProduct);  
router.delete("/delete-product/:id", ProductController.deleteProduct);  

export { router };