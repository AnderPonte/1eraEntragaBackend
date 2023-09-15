import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const product = new ProductManager();
const productRouter = Router();

productRouter.post("/", async (req, res) => {
  let newProduct = req.body;
  res.send(await product.addProducts(newProduct));
});

productRouter.get("/", async (req, res) => {
  res.send(await product.getProducts());
});

productRouter.get("/:id", async (req, res) => {
  res.send(await product.getProductsById(req.params.id));
});

productRouter.put("/:id", async (req, res) => {
  let updateProduct = req.body;
  res.send(await product.updateProduct(req.params.id, updateProduct));
});

productRouter.delete("/:id", async (req, res) => {
  res.send(await product.deleteProduct(req.params.id));
});

export default productRouter;
