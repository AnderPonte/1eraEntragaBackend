import { promises as fs } from "fs";
import { v4 as uuid } from "uuid";

class ProductManager {
  constructor() {
    this.path = "./src/models/products.json";
  }

  readProducts = async () => {
    let products = await fs.readFile(this.path, "utf-8");
    return JSON.parse(products);
  };

  writeProducts = async (product) => {
    await fs.writeFile(this.path, JSON.stringify(product));
  };

  isId = async (id) => {
    let products = await this.readProducts();
    return products.find((item) => item.id === id);
  };

  addProducts = async (product) => {
    let productsCurrent = await this.readProducts();
    product.id = uuid();
    let productAll = [...productsCurrent, product];
    await this.writeProducts(productAll);
    return "producto agregado";
  };

  getProductsById = async (id) => {
    let productById = await this.isId(id);
    if (!productById) {
      return "producto no encontrado";
    } else {
      return productById;
    }
  };

  updateProduct = async (id, updateProduct) => {
    let productById = await this.isId(id);
    await this.deleteProduct(id);
    let productsCurrent = await this.readProducts();
    let products = [{ ...updateProduct, id: id }, ...productsCurrent];
    await this.writeProducts(products);
    return "Producto actualizado";
  };

  deleteProduct = async (id) => {
    let products = await this.readProducts();
    let existProducts = products.some((item) => item.id === id);
    if (existProducts) {
      let filterProducts = products.filter((item) => item.id != id);
      await this.writeProducts(filterProducts);
      return "producto eliminado";
    }
    return "producto a eliminar no existe";
  };
}

export default ProductManager;
