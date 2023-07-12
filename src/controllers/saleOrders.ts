import db from "../models";
import { Request, Response } from "express";
import saleOrderValidator from "../validators/sale-orders";
import orderItemValidator from "../validators/order-items";
import { OrderItemAttributes } from "../models/rest/sale-item";

const saleOrders = db.rest.models.saleOrder;
const OrderItem = db.rest.models.orderItem;

export const getAllSalesOrders = async (req: Request, res: Response) => {
  const salesOrders = await saleOrders.findAll();
  return res.status(200).json(salesOrders);
};

export const getSaleOrder = async (req: Request, res: Response) => {
  const id = req.params.id;

  const saleOrder = await saleOrders.findOne({
    where: { id },
    include: [
      {
        model: OrderItem,
        as: "items",
      },
    ],
  });
  if (!saleOrder)
    return res.status(404).json({ message: "Sale order not found" });

  return res.status(200).json(saleOrder);
};

export const createSaleOrder = async (req: Request, res: Response) => {
  const { customer, items, deliveryAddress, paymentMethod } = req.body;

  const { error, value } = saleOrderValidator.validate({
    customer,
    deliveryAddress,
    paymentMethod,
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  let newSaleOrder = await saleOrders.create(value);

  const orderItems = await Promise.all(
    items.map((item: any) =>
      OrderItem.create({
        saleOrderId: newSaleOrder.id,
        product: item.product,
        quantity: item.quantity,
        price: item.price,
      })
    )
  );

  return res.status(201).json({ newSaleOrder, orderItems });
};

export const updateSaleOrder = async (req: Request, res: Response) => {
  const id = req.params.id;

  const { customer, items, deliveryAddress, paymentMethod } = req.body;

  const { error, value } = saleOrderValidator.validate({
    id,
    customer,
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const saleOrder = await saleOrders.findOne({ where: { id } });
  if (!saleOrder)
    return res.status(404).json({ message: "Sale order not found" });

  await saleOrder.update(value);

  await updateSaleOrderItems(Number(id), items);

  return res.status(200).json(saleOrder);
};

export const deleteSaleOrder = async (req: Request, res: Response) => {
  const id = req.params.id;

  const saleOrder = await saleOrders.findOne({ where: { id } });
  if (!saleOrder)
    return res.status(404).json({ message: "Sale order not found" });

  await saleOrder.destroy();

  return res.status(200).json(saleOrder);
};

// saleOrderService.js
const updateSaleOrderItems = async (
  id: Number,
  items: [OrderItemAttributes & { delete?: boolean }]
) => {
  if (items) {
    await Promise.all(
      items.map(async (item) => {
        const {
          product,
          quantity,
          price,
          id: itemId,
          delete: deleteItem,
        } = item;
        const { error, value } = orderItemValidator.validate({
          product,
          quantity,
          price,
        });

        if (error) return;

        // Check if the item is new
        if (!itemId) {
          // Create a new OrderItem instance and associate it with the saleOrder
          await OrderItem.create({
            saleOrderId: id,
            product,
            quantity,
            price,
          });
        } else {
          // Find the item by ID
          const orderItem = await OrderItem.findByPk(itemId);

          // Make sure the item belongs to the order
          if (orderItem && orderItem.saleOrderId === id) {
            // Update the item
            if (deleteItem) await orderItem.destroy();
            else await orderItem.update(value);
          }
        }
      })
    );
  }
};
