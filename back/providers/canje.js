const { OrdenDeCanje, Producto, Usuario } = require("../models");

const createOrder = async (userId, productInfoArray) => {
  try {
    const user = await Usuario.findByPk(userId);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const emisionDate = new Date();

    let totalCostInHours = 0;

    for (let productInfo of productInfoArray) {
      const { product, quantity } = productInfo;
      const productFound = await Producto.findByPk(product.productId);

      if (!productFound) {
        throw new Error("Producto no encontrado");
      }

      if (quantity > product.stock) {
        throw new Error("No hay suficiente stock disponible");
      }

      totalCostInHours += productFound.costInHours * quantity;

      productFound.stock -= quantity;
      await productFound.save();

    }

    if (user.hoursAcc < totalCostInHours) {
      throw new Error("No tiene suficiente saldo en horas");
    }

    user.hoursAcc -= totalCostInHours;
    await user.save();

    const order = await OrdenDeCanje.create({
      userId: userId,
      productInfo: productInfoArray,
      emisionDate: emisionDate,
    });

    return order;
  } catch (error) {
    console.error("Error creating order", error);
    throw error;
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await OrdenDeCanje.findAll({
      order: [["emisionDate", "DESC"]],
    });
    return orders;
  } catch (err) {
    console.error("Error getting orders", err);
    throw err;
  }
};

const getOrderById = async (id) => {
  try {
    const order = await OrdenDeCanje.findByPk(id);
    return order;
  } catch (error) {
    console.error("Error getting order", err);
    throw err;
  }
};

const deleteOrderById = async (id) => {
  try {
    const deletedOrder = await OrdenDeCanje.findOne({
      where: {
        id: orderId,
        deletedAt: null,
      },
    });

    if (!deletedOrder) {
      throw new Error("Order not found");
    }

    await OrdenDeCanje.update(
      { deletedAt: new Date() },
      { where: { orderId } }
    );
  } catch (error) {
    console.error("Ocurrió un error al eliminar la orden de canje.", error);
    throw error;
  }
};

module.exports = { createOrder, getAllOrders, getOrderById, deleteOrderById };
