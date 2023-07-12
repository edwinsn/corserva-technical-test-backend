import express from "express";
import {
  getAllSalesOrders,
  createSaleOrder,
  getSaleOrder,
  updateSaleOrder,
  deleteSaleOrder,
} from "../../controllers/saleOrders";

const router = express.Router();

router.get("/", getAllSalesOrders);
router.post("/", createSaleOrder);
router.get("/:id", getSaleOrder);
router.put("/:id", updateSaleOrder);
router.delete("/:id", deleteSaleOrder);

export default router;
