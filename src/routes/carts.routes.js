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

export default cartRouter;
