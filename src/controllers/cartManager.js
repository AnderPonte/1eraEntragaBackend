import { promises as fs } from "fs";
import { v4 as uuid } from "uuid";
import ProductManager from "./ProductManager.js";

const productAll = new ProductManager();

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

  isCart = async (id) => {
    let carts = await this.readCarts();
    return carts.find((item) => item.id === id);
  };

  addCart = async () => {
    let cartCurrent = await this.readCarts();
    let id = uuid();
    let cartsAll = [{ id: id, products: [] }, ...cartCurrent];
    await this.writeCarts(cartsAll);
    return "carrito agregado";
  };

  getCartById = async (id) => {
    let cartById = await this.isCart(id);
    if (!cartById) {
      return "Carrito no encontrado";
    } else {
      return cartById;
    }
  };

  addProductInCart = async (cartId, productId) => {
    let cartById = await this.isCart(cartId);
    if (!cartById) return "Carrito no encontrado";
    let productById = await productAll.isId(productId);
    if (!productById) return "Producto no encontrado";

    let cartAll = await this.readCarts();
    let cartFilter = cartAll.filter((item) => item.id != cartId);

    if (cartById.products.some((item) => item.id === productId)) {
      let productInCart = cartById.products.find(
        (item) => item.id === productId
      );
      productInCart.quantity++;
      let cartProduct = [cartById, ...cartFilter];
      await this.writeCarts(cartProduct);
      return "Cantidad agregada al carrito";
    } else {
      cartById.products.push({ id: productById.id, quantity: 1 });
      let cartProduct = [cartById, ...cartFilter];
      await this.writeCarts(cartProduct);
      return "Producto agregado al carrito";
    }
  };
}

export default cartManager;
