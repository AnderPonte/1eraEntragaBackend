import { promises as fs } from "fs";
import { v4 as uuid } from "uuid";

class cartManager {
  constructor() {
    this.path = "./src/models/carts.json";
  }

  readCarts = async () => {
    let carts = await fs.readFile(this.path, "utf-8");
    return JSON.parse(carts);
  };

  writeCarts = async (cart) => {
    await fs.writeFile(this.path, JSON.stringify(cart));
  };

  addCart = async () => {
    let cartCurrent = await this.readCarts();
    let id = uuid();
    let cartsAll = [{ id: id, products: [] }, ...cartCurrent];
    await this.writeCarts(cartsAll);
    return "producto agregado";
  };
}

export default cartManager;
