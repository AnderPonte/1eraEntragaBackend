import { Router } from "express";
import cartManager from "../controllers/cartManager.js";

const cartRouter = Router();
const carts = new cartManager();

cartRouter.post("/", async (req, res) => {
  res.send(await carts.addCart());
});

cartRouter.get("/", async (req, res) => {
  res.send(await carts.readCarts());
});
cartRouter.get("/:id", async (req, res) => {
  res.send(await carts.getCartById(req.params.id));
});

cartRouter.post("/:cid/products/:pid", async (req, res) => {
  let cartId = req.params.cid;
  let productId = req.params.pid;
  res.send(await carts.addProductInCart(cartId, productId));
});

export default cartRouter;
