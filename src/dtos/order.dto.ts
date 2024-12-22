import { OrderStatus } from "../models/order.model";

export interface OrderItemDto {
  productId: string;
  quantity: number;
}

export interface CreateOrderDto {
  items: OrderItemDto[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface UpdateOrderDto {
  status?: OrderStatus;
  trackingNumber?: string;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}
