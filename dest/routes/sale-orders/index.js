"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const saleOrders_1 = require("../../controllers/saleOrders");
const router = express_1.default.Router();
router.get("/", saleOrders_1.getAllSalesOrders);
router.post("/", saleOrders_1.createSaleOrder);
router.get("/:id", saleOrders_1.getSaleOrder);
router.put("/:id", saleOrders_1.updateSaleOrder);
router.delete("/:id", saleOrders_1.deleteSaleOrder);
exports.default = router;
