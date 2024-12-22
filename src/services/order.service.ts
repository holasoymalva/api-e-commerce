import { getRepository } from "typeorm";
import { Order, OrderStatus } from "../models/order.model";
import { Product } from "../models/product.model";
import { CreateOrderDto, UpdateOrderDto } from "../dtos/order.dto";
import { NotFoundError, UnauthorizedError } from "../utils/response";

export class OrderService {
  private orderRepository = getRepository(Order);
  private productRepository = getRepository(Product);

  async createOrder(orderData: CreateOrderDto, userId: string): Promise<Order> {
    const order = new Order();
    order.user = userId;
    order.shippingAddress = orderData.shippingAddress;

    // Calculate total and check stock
    let total = 0;
    for (const item of orderData.items) {
      const product = await this.productRepository.findOne(item.productId);
      if (!product) {
        throw new NotFoundError(`Product ${item.productId} not found`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product ${product.name}`);
      }
      total += product.price * item.quantity;

      // Update stock
      product.stock -= item.quantity;
      await this.productRepository.save(product);
    }

    order.totalAmount = total;
    order.items = orderData.items;

    return this.orderRepository.save(order);
  }

  async getOrders(userId: string, userRole: string): Promise<Order[]> {
    if (userRole === "admin") {
      return this.orderRepository.find({ relations: ["user", "items"] });
    }
    return this.orderRepository.find({
      where: { user: userId },
      relations: ["items"],
    });
  }

  async getOrderById(
    orderId: string,
    userId: string,
    userRole: string
  ): Promise<Order> {
    const order = await this.orderRepository.findOne(orderId, {
      relations: ["user", "items"],
    });
    if (!order) {
      throw new NotFoundError("Order not found");
    }
    if (userRole !== "admin" && order.user.id !== userId) {
      throw new UnauthorizedError("Not authorized to access this order");
    }
    return order;
  }

  async updateOrder(
    orderId: string,
    updateData: UpdateOrderDto,
    userId: string,
    userRole: string
  ): Promise<Order> {
    const order = await this.getOrderById(orderId, userId, userRole);

    if (updateData.status && userRole !== "admin") {
      throw new UnauthorizedError("Only admins can update order status");
    }

    Object.assign(order, updateData);
    return this.orderRepository.save(order);
  }

  async cancelOrder(
    orderId: string,
    userId: string,
    userRole: string
  ): Promise<void> {
    const order = await this.getOrderById(orderId, userId, userRole);

    if (order.status !== OrderStatus.PENDING) {
      throw new Error("Can only cancel pending orders");
    }

    order.status = OrderStatus.CANCELLED;

    // Restore stock
    for (const item of order.items) {
      const product = await this.productRepository.findOne(item.productId);
      if (product) {
        product.stock += item.quantity;
        await this.productRepository.save(product);
      }
    }

    await this.orderRepository.save(order);
  }
}
