import express from 'express';
import { CreateProductProps, Methodology, Product, UpdateProductProps } from '../types/Product';
import { products } from '..';
import { generateId } from '../utils/generateId';


const router = express.Router();

const methodologyOptions: Methodology[] = ["Agile", "Waterfall"];

/**
 * @swagger
 * /api/product:
 *  get:
 *      tags:
 *          - Product
 *      description: Get all products and returns them as a list
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                         type: array
 *                         items:
 *                            $ref: '#/components/schemas/Product'
 *          500:
 *              description: Server Error
 */
router.get('/', (req, res) => {
    try{
        return res.status(200).json(products);
    }catch(error){
        console.log(error);
        return res.status(500);
    }
});


/**
 * @swagger
 * /api/product:
 *  post:
 *      tags:
 *          - Product
 *      description: Create a new product
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateProductProps'
 *      responses:
 *          201:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request
 *          500:
 *              description: Server Error
 * 
*/
router.post('/', (req, res) => {
    try {
        const body: CreateProductProps = req.body;
        
        // Validate all fields are present
        if (!body.productName || !body.productOwnerName || !body.scrumMasterName || !body.startDate || !body.methodology) {
            return res.status(400).json({ message: 'Missing required field' });
        }
        
        // Ensure methodology is valid
        if (!methodologyOptions.includes(body.methodology)) {
            return res.status(400).json({ message: 'Invalid methodology' });
        }
        
        // Ensure date is valid
        const date = new Date(body.startDate);
        if (date.toString() === "Invalid Date") {
            return res.status(400).json({ message: 'Invalid date' });
        }
        
        const newProduct: Product = {
            productId: generateId(),
            productName: body.productName,
            productOwnerName: body.productOwnerName,
            Developers: body.Developers || [],
            scrumMasterName: body.scrumMasterName,
            startDate: body.startDate,
            methodology: body.methodology,
        };
        
        // Validate max 5 developers
        if (newProduct.Developers.length > 5) {
            return res.status(400).json({ message: 'Product cannot have more than 5 developers' });
        }

        products.push(newProduct);
        products.sort((a, b) => {
            return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        });
        
        return res.status(201).json(newProduct);
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
});


/**
 * @swagger
 * /api/product/{productId}:
 *   get:
 *     tags:
 *      - Product
 *     description: Get a single product by ID.
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router.get('/:productId', (req, res) => {
    try {
        const { productId } = req.params;
        const product = products.find(product => product.productId === Number(productId));
        
        if (!product) {
            return res.status(404).json({ message: `Product with ID ${productId} not found` });
        }
        
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
});


/**
 * @swagger
 * /api/product/{productId}:
 *   put:
 *     tags:
 *      - Product
 *     description: Update a product by ID
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductProps'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router.put('/:productId', (req, res) => {
    try{
        const { productId } = req.params;
        const body = req.body as UpdateProductProps;
    
        // ensure productId doesn't slip through
    
        // Validate body has at least 1 field is present and are valid
        if (!body.productName && !body.productOwnerName && !body.scrumMasterName && !body.startDate && !body.methodology && !body.location) {
            return res.status(400).json({ message: 'Missing required field' });
        }
    
        // Validate max 5 developers
        if (body.Developers && body.Developers.length > 5) {
            return res.status(400).json({ message: 'Product cannot have more than 5 developers' });
        }
        // if methodology is present, ensure it is valid
        if(body.methodology && !methodologyOptions.includes(body.methodology)){
            return res.status(400).json({ message: 'Invalid methodology' });
        }
        // if date is present, ensure it is valid
        if(body.startDate){
            const date = new Date(body.startDate);
            if(date.toString() === "Invalid Date"){
                return res.status(400).json({ message: 'Invalid date' });
            }
        }
    
    
        const index = products.findIndex(product => product.productId === Number(productId));
        if (index === -1) {
            return res.status(404).json({ message: `Product with ID ${productId} not found` });
        }
    
        const originalId = products[index].productId;
    
        products[index] = {
            ...products[index],
            ...body
        };
    
        // ensure productId doesn't change
        products[index].productId = originalId;
    
        products.sort((a,b) => {
            return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        });
    
        res.status(200).json(products[index]);
    }catch(error){
        console.log(error);
        return res.status(500);
    }
});

/**
 * @swagger
 * /api/product/{productId}:
 *   delete:
 *     tags:
 *      - Product
 *     description: Delete a product by ID
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router.delete('/:productId', (req, res) => {
    try {
        const { productId } = req.params;
        const index = products.findIndex(product => product.productId === Number(productId));
        if (index === -1) {
            return res.status(404).json({ message: `Product with ID ${productId} not found` });
        }

        products.splice(index, 1);
        res.status(200).json({ message: `Product with ID ${productId} deleted` });
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
});

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - productId
 *         - productName
 *         - productOwnerName
 *         - scrumMasterName
 *         - startDate
 *         - methodology
 *       properties:
 *         productId:
 *           type: integer
 *           description: The auto-generated id of the product
 *         productName:
 *           type: string
 *           description: The name of the product
 *         productOwnerName:
 *           type: string
 *           description: The name of the product owner
 *         Developers:
 *           type: array
 *           items:
 *             type: string
 *           description: The names of the developers
 *         scrumMasterName:
 *           type: string
 *           description: The name of the scrum master
 *         startDate:
 *           type: string
 *           description: The start date of the product (YYYY/MM/DD)
 *         methodology:
 *           type: string
 *           enum:
 *             - Agile
 *             - Waterfall
 *           description: The methodology of the product
 *         location:
 *           type: string
 *           description: The GitHub URL of the product
 *     CreateProductProps:
 *       type: object
 *       required:
 *         - productName
 *         - productOwnerName
 *         - scrumMasterName
 *         - startDate
 *         - methodology
 *       properties:
 *         productName:
 *           type: string
 *           default: "Product 1"
 *         productOwnerName:
 *           type: string
 *           default: "Product Owner 1"
 *         Developers:
 *           type: array
 *           items:
 *             type: string
 *           default: ["Developer 1", "Developer 2"]
 *         scrumMasterName:
 *           type: string
 *           default: "Scrum Master 1"
 *         startDate:
 *           type: string
 *           default: "2021/01/01"
 *         methodology:
 *           type: string
 *           enum:
 *             - Agile
 *             - Waterfall
 *           default: Agile
 *     UpdateProductProps:
 *       type: object
 *       properties:
 *         productName:
 *           type: string
 *           default: "Product 1"
 *         productOwnerName:
 *           type: string
 *           default: "Product Owner 1"
 *         Developers:
 *           type: array
 *           items:
 *             type: string
 *           default: ["Developer 1", "Developer 2"]
 *         scrumMasterName:
 *           type: string
 *           default: "Scrum Master 1"
 *         startDate:
 *           type: string
 *           default: "2021/01/01"
 *         methodology:
 *           type: string
 *           enum:
 *             - Agile
 *             - Waterfall
 *           default: Agile
 *         location:
 *           type: string
 *           default: "https://github.com/bcgov"
 */
export default router;
