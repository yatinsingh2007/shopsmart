const { z } = require('zod');

const registerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

const productSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.number().positive(),
    categoryId: z.number().int().positive(),
    imageUrl: z.string().url().optional(),
    stock: z.number().int().nonnegative().optional(),
  }),
});

const cartItemSchema = z.object({
  body: z.object({
    productId: z.number().int().positive(),
    quantity: z.number().int().positive().default(1),
  }),
});

const updateCartItemSchema = z.object({
  body: z.object({
    quantity: z.number().int().nonnegative(), // 0 to remove
  }),
});

const orderSchema = z.object({
  body: z.object({
    shippingAddress: z.string().min(5),
  }),
});

const updateOrderStatusSchema = z.object({
  body: z.object({
    status: z.enum(['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']),
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
  productSchema,
  cartItemSchema,
  updateCartItemSchema,
  orderSchema,
  updateOrderStatusSchema
};
