import { getRepository } from "typeorm";
import { Product } from "../models/product.model";
import { NotFoundError } from "../utils/errors";
import { logger } from "../utils/logger";

export class ProductService {
  private productRepository = getRepository(Product);

  async createProduct(productData: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(productData);
    await this.productRepository.save(product);
    logger.info(`Product created with ID: ${product.id}`);
    return product;
  }

  async findAllProducts(options?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    page?: number;
    limit?: number;
  }): Promise<{ products: Product[]; total: number }> {
    const queryBuilder = this.productRepository.createQueryBuilder("product");

    if (options?.category) {
      queryBuilder.where(":category = ANY(product.categories)", {
        category: options.category,
      });
    }

    if (options?.minPrice !== undefined) {
      queryBuilder.andWhere("product.price >= :minPrice", {
        minPrice: options.minPrice,
      });
    }

    if (options?.maxPrice !== undefined) {
      queryBuilder.andWhere("product.price <= :maxPrice", {
        maxPrice: options.maxPrice,
      });
    }

    if (options?.sort) {
      const [field, order] = options.sort.split(":");
      queryBuilder.orderBy(
        `product.${field}`,
        order.toUpperCase() as "ASC" | "DESC"
      );
    }

    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const skip = (page - 1) * limit;

    queryBuilder.skip(skip).take(limit);

    const [products, total] = await queryBuilder.getManyAndCount();
    return { products, total };
  }

  async findProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundError(`Product with ID ${id} not found`);
    }
    return product;
  }

  async updateProduct(
    id: string,
    updateData: Partial<Product>
  ): Promise<Product> {
    const product = await this.findProductById(id);
    Object.assign(product, updateData);
    await this.productRepository.save(product);
    logger.info(`Product updated with ID: ${id}`);
    return product;
  }

  async deleteProduct(id: string): Promise<void> {
    const product = await this.findProductById(id);
    await this.productRepository.remove(product);
    logger.info(`Product deleted with ID: ${id}`);
  }

  async updateStock(id: string, quantity: number): Promise<Product> {
    const product = await this.findProductById(id);
    if (product.stock + quantity < 0) {
      throw new Error("Insufficient stock");
    }
    product.stock += quantity;
    await this.productRepository.save(product);
    return product;
  }
}
