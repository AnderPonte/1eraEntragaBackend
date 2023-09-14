import express from "express";
const router = express.Router();
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

// Ruta GET /api/products/
router.get("/", (req, res) => {
  const { limit } = req.query;
  const productsData = JSON.parse(
    fs.readFileSync("../data/products.json", "utf-8")
  );
  const products = limit ? productsData.slice(0, limit) : productsData;
  res.json(products);
});

// Ruta GET /api/products/:pid
router.get("/:pid", (req, res) => {
  const { pid } = req.params;
  const productsData = JSON.parse(
    fs.readFileSync("../data/products.json", "utf-8")
  );
  const product = productsData.find((p) => p.id === pid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

// Ruta POST /api/products/
router.post("/", (req, res) => {
  const { title, description, code, price, stock, category, thumbnails } =
    req.body;

  if (!title || !description || !code || !price || !stock || !category) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newProduct = {
    id: uuidv4(),
    title,
    description,
    code,
    price,
    status: true,
    stock,
    category,
    thumbnails,
  };

  const productsData = JSON.parse(fs.readFileSync("products.json", "utf-8"));
  productsData.push(newProduct);
  fs.writeFileSync("products.json", JSON.stringify(productsData, null, 2));

  res.status(201).json(newProduct);
  return "producto agregado";
});

// Ruta PUT /api/products/:pid
router.put("/:pid", (req, res) => {
  const { pid } = req.params;
  const updatedProduct = req.body;

  if (!updatedProduct) {
    return res.status(400).json({ error: "Invalid data" });
  }

  const productsData = JSON.parse(
    fs.readFileSync("../data/products.json", "utf-8")
  );
  const existingProductIndex = productsData.findIndex((p) => p.id === pid);

  if (existingProductIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  productsData[existingProductIndex] = {
    ...productsData[existingProductIndex],
    ...updatedProduct,
    id: pid,
  };

  fs.writeFileSync(
    "../data/products.json",
    JSON.stringify(productsData, null, 2)
  );
  res.json(productsData[existingProductIndex]);
});

// Ruta DELETE /api/products/:pid
router.delete("/:pid", (req, res) => {
  const { pid } = req.params;
  const productsData = JSON.parse(
    fs.readFileSync("../data/products.json", "utf-8")
  );
  const updatedProductsData = productsData.filter((p) => p.id !== pid);

  if (updatedProductsData.length === productsData.length) {
    return res.status(404).json({ error: "Product not found" });
  }

  fs.writeFileSync(
    "../data/products.json",
    JSON.stringify(updatedProductsData, null, 2)
  );
  res.json({ message: "Product deleted successfully" });
});

export default router;
