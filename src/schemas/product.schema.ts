import Joi from 'joi';

export const CreateProductSchema = Joi.object({
  name: Joi.string().required().min(3).max(100),
  description: Joi.string().required().min(10),
  price: Joi.number().required().min(0),
  stock: Joi.number().required().min(0),
  categories: Joi.array().items(Joi.string()).min(1),
  images: Joi.array().items(Joi.string().uri()),
});

export const UpdateProductSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  description: Joi.string().min(10),
  price: Joi.number().min(0),
  stock: Joi.number().min(0),
  categories: Joi.array().items(Joi.string()),
  images: Joi.array().items(Joi.string().uri()),
}).min(1);
