import { Request, Response } from "express";
import { OrderService } from "../services/order.service";
import { CreateOrderDto, UpdateOrderDto } from "../dtos/order.dto";

export class OrderController {
  constructor(private orderService: OrderService) {}

  async createOrder(req: Request, res: Response) {
    try {
      const orderData: CreateOrderDto = req.body;
      const order = await this.orderService.createOrder(orderData, req.user.id);
      return res.status(201).json(order);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getOrders(req: Request, res: Response) {
    try {
      const orders = await this.orderService.getOrders(
        req.user.id,
        req.user.role
      );
      return res.json(orders);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getOrderById(req: Request, res: Response) {
    try {
      const order = await this.orderService.getOrderById(
        req.params.id,
        req.user.id,
        req.user.role
      );
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      return res.json(order);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateOrder(req: Request, res: Response) {
    try {
      const updateData: UpdateOrderDto = req.body;
      const order = await this.orderService.updateOrder(
        req.params.id,
        updateData,
        req.user.id,
        req.user.role
      );
      return res.json(order);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async cancelOrder(req: Request, res: Response) {
    try {
      await this.orderService.cancelOrder(
        req.params.id,
        req.user.id,
        req.user.role
      );
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
