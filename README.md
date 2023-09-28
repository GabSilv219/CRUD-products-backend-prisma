# CRUD_products-backend-prisma

You can find the frontend repository [Here](https://github.com/GabSilv219/CRUD_products-Frontend/tree/master)
> Status: Done ✅

## 🔨 Tools and Libs used in this project:
* [NodeJS](https://nodejs.org/en)
* [Express](https://expressjs.com/pt-br/)
* [Nodemon](https://www.npmjs.com/package/nodemon)
* [Typescript](https://www.typescriptlang.org/)
* [Prisma](https://www.prisma.io/docs/getting-started/)
* [Prostgres](https://www.postgresql.org/)
* [Cors](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS)

## Table and Entities
### Products
```
model Product {
  id          Int      @id @default(autoincrement())
  name        String   @unique
  description String
  price       Decimal
  stock       Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
```

## CRUD Methods
### Get all products
~~~
  async getAllProducts(req: Request, res: Response) {
    try {
      const product = await prismaClient.product.findMany();
      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).json({error: "No Products Founded!"})
    }
  },
~~~
### Post
~~~
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
~~~
### Update
~~~
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
~~~
### Delete
~~~
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
~~~

## Routes
~~~
import { Router } from "express";
import ProductController from "./controllers/ProductController";

const router = Router();

router.get("/products", ProductController.getAllProducts);  
router.get("/product/:id", ProductController.getProduct);  
router.post("/create-product", ProductController.createProduct);  
router.put("/update-product/:id", ProductController.updateProduct);  
router.delete("/delete-product/:id", ProductController.deleteProduct);  

export { router };
~~~
