import Joi from 'joi';
import { OrderStatus } from '../models/order.model';

const shippingAddressSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  zipCode: Joi.string().required(),
  country: Joi.string().required(),
});

export const CreateOrderSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().required().min(1),
      })
    )
    .min(1)
    .required(),
  shippingAddress: shippingAddressSchema.required(),
});

export const UpdateOrderSchema = Joi.object({
  status: Joi.string().valid(...Object.values(OrderStatus)),
  trackingNumber: Joi.string(),
  shippingAddress: shippingAddressSchema,
}).min(1);

