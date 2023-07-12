"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSaleOrder = exports.updateSaleOrder = exports.createSaleOrder = exports.getSaleOrder = exports.getAllSalesOrders = void 0;
const models_1 = __importDefault(require("../models"));
const sale_orders_1 = __importDefault(require("../validators/sale-orders"));
const order_items_1 = __importDefault(require("../validators/order-items"));
const saleOrders = models_1.default.rest.models.saleOrder;
const OrderItem = models_1.default.rest.models.orderItem;
const getAllSalesOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const salesOrders = yield saleOrders.findAll();
    return res.status(200).json(salesOrders);
});
exports.getAllSalesOrders = getAllSalesOrders;
const getSaleOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const saleOrder = yield saleOrders.findOne({
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
});
exports.getSaleOrder = getSaleOrder;
const createSaleOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customer, items, deliveryAddress, paymentMethod } = req.body;
    const { error, value } = sale_orders_1.default.validate({
        customer,
        deliveryAddress,
        paymentMethod,
    });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    let newSaleOrder = yield saleOrders.create(value);
    const orderItems = yield Promise.all(items.map((item) => OrderItem.create({
        saleOrderId: newSaleOrder.id,
        product: item.product,
        quantity: item.quantity,
        price: item.price,
    })));
    return res.status(201).json({ newSaleOrder, orderItems });
});
exports.createSaleOrder = createSaleOrder;
const updateSaleOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { customer, items, deliveryAddress, paymentMethod } = req.body;
    const { error, value } = sale_orders_1.default.validate({
        id,
        customer,
        deliveryAddress,
        paymentMethod,
    });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const saleOrder = yield saleOrders.findOne({ where: { id } });
    if (!saleOrder)
        return res.status(404).json({ message: "Sale order not found" });
    yield saleOrder.update(value);
    yield updateSaleOrderItems(Number(id), items);
    return res.status(200).json(saleOrder);
});
exports.updateSaleOrder = updateSaleOrder;
const deleteSaleOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const saleOrder = yield saleOrders.findOne({ where: { id } });
    if (!saleOrder)
        return res.status(404).json({ message: "Sale order not found" });
    yield saleOrder.destroy();
    return res.status(200).json(saleOrder);
});
exports.deleteSaleOrder = deleteSaleOrder;
// saleOrderService.js
const updateSaleOrderItems = (id, items) => __awaiter(void 0, void 0, void 0, function* () {
    if (items) {
        yield Promise.all(items.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const { product, quantity, price, id: itemId, delete: deleteItem, } = item;
            const { error, value } = order_items_1.default.validate({
                product,
                quantity,
                price,
                saleOrderId: id,
            });
            if (error)
                return;
            // Check if the item is new
            if (!itemId) {
                // Create a new OrderItem instance and associate it with the saleOrder
                yield OrderItem.create({
                    saleOrderId: id,
                    product,
                    quantity,
                    price,
                });
            }
            else {
                // Find the item by ID
                const orderItem = yield OrderItem.findByPk(itemId);
                // Make sure the item belongs to the order
                if (orderItem && orderItem.saleOrderId === id) {
                    // Update the item
                    if (deleteItem)
                        yield orderItem.destroy();
                    else
                        yield orderItem.update(value);
                }
            }
        })));
    }
});
