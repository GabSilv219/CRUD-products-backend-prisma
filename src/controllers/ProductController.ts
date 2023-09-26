import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';

export default {
  async getProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const product = await prismaClient.product.findUnique({where: {id: Number(id)}});
      
      if(!product){
        return res.status(401).json({error: "Product Not Found!"});
      }
  
      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).json({ error })
    }
  },

  async getAllProducts(req: Request, res: Response) {
    try {
      const product = await prismaClient.product.findMany();
      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).json({error: "No Products Founded!"})
    }
  },

  async createProduct(req: Request, res: Response) {
    try {
      const { name, description, price, stock } = req.body;

      let product = await prismaClient.product.findUnique({where: { name }});
      
      if(product){
        return res.status(401).json({error: "Already exists a product with this name"})
      }

      product = await prismaClient.product.create({
        data: {
          name,
          description,
          price,
          stock
        },
      });
  
      return res.status(200).json({product, message: "Product created successfully!"});
    } catch (error) {
      return res.status(400).json({error: "Error trying to create product!"})
    }
  },
  
  async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, description, price, stock } = req.body;

      let product = await prismaClient.product.findUnique({where: { id: Number(id) }});
      
      if(!product){
        return res.status(401).json({error: "Product Not Found!"});
      }

      product = await prismaClient.product.update({
        where: {id: Number(id)},
        data: {
          name,
          description,
          price,
          stock
        },
      });
  
      return res.status(200).json({product, message: "Product updated successfully!"});
    } catch (error) {
      return res.status(400).json({error: "Error trying to update product!"})
    }
  },

  async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;

      let product = await prismaClient.product.findUnique({where: { id: Number(id) }});
      
      if(!product){
        return res.status(401).json({error: "Product Not Found!"});
      }

      product = await prismaClient.product.delete({where: {id: Number(id)}});
      return res.status(200).json({product, message: "Product deleted successfully!"});

    } catch (error) {
      return res.status(400).json({error: "Error trying to delete product!"})
    }
  },
};
