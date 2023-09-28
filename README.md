# CRUD_products-backend

You can find the frontend repository [Here](https://github.com/GabSilv219/CRUD_products-Frontend/tree/master)
> Status: Done ✅

## 🔨 Tools and Libs used in this project:
* [NodeJS](https://nodejs.org/en)
* [Express](https://expressjs.com/pt-br/)
* [Nodemon](https://www.npmjs.com/package/nodemon)
* [Typescript](https://www.typescriptlang.org/)
* [Sequelize](https://sequelize.org/docs/v6/getting-started/)
* [MySQL](https://www.mysql.com/)
* [Cors](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS)

## Table and Entities
### Products
```
id: INTEGER
name: STRING,
description: STRING,
price: DOUBLE,
stock: INTEGER
```

## CRUD Methods
### Get all products
~~~
export const getProducts = async (req: Request, res: Response) => {
  try {
    const listProducts = await Product.findAll();
    return res.status(200).json(listProducts);
  } catch (error) {
    return res.status(400).json({message: "No Products Founded!"});
  }
}
~~~
### Post
~~~
export const postProduct = async (req: Request, res: Response) => {
  const { body } = req;
  try {
      const product = await Product.create(body);
      res.status(200).json({product, message: 'Product Added Successfully!'});
  } catch (error) {
    console.log(error);
    res.status(400).json({error});
  }
}
~~~
### Update
~~~
export const updateProduct = async (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if(product) {
      await product.update(body);
      res.status(200).json({message: 'Product Updated Successfully!'})
    } else {
      res.status(401).json({message: `Product ${id} Not Founded}`})
    }
  } catch (error) {
      console.log(error);
      return res.status(400).json({error});
  } 
}
~~~
### Delete
~~~
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);

    if(product) {
      await product.destroy();
      res.status(200).json({message: 'Product Deleted Successfully!'})
    } else {
      res.status(401).json({message: `Product ${id} Not Founded}`})
    } 
  } catch (error) {
    return res.status(400).json({error});
  }
}
~~~

## Routes
~~~
import { Router } from 'express';
import { deleteProduct, getProduct, getProducts, postProduct, updateProduct } from './controllers/ProductsController';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.delete('/:id', deleteProduct);
router.post('/', postProduct);
router.put('/:id', updateProduct);

export default router
~~~
