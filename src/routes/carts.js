import express from "express";
const router = express.Router();
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

// Ruta POST /api/carts/
router.post("/", (req, res) => {
  const newCart = {
    id: uuidv4(),
    products: [],
  };

  const cartsData = JSON.parse(fs.readFileSync("carts.json", "utf-8"));
  cartsData.push(newCart);
  fs.writeFileSync("carts.json", JSON.stringify(cartsData, null, 2));

  res.status(201).json(newCart);
});

// Ruta GET /api/carts/:cid
router.get("/:cid", (req, res) => {
  const { cid } = req.params;
  const cartsData = JSON.parse(fs.readFileSync("carts.json", "utf-8"));
  const cart = cartsData.find((c) => c.id === cid);
  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).json({ error: "Cart not found" });
  }
});

// Ruta POST /api/carts/:cid/product/:pid
router.post("/:cid/product/:pid", (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ error: "Invalid quantity" });
  }

  const cartsData = JSON.parse(fs.readFileSync("carts.json", "utf-8"));
  const cart = cartsData.find((c) => c.id === cid);

  if (!cart) {
    return res.status(404).json({ error: "Cart not found" });
  }

  const productToAdd = {
    product: pid,
    quantity,
  };

  const existingProduct = cart.products.find((p) => p.product === pid);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.products.push(productToAdd);
  }

  fs.writeFileSync("carts.json", JSON.stringify(cartsData, null, 2));
  res.status(201).json(productToAdd);
});

export default router;
