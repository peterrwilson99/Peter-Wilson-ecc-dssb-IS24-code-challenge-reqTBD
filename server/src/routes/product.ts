import express from 'express';
import { CreateProductProps, Methodology, Product, UpdateProductProps } from '../types/Product';
import { products } from '..';
import { generateId } from '../utils/generateId';

const router = express.Router();

const methodologyOptions: Methodology[] = ["Agile", "Waterfall"];

router.get('/', (req, res) => {
    try{
        return res.status(200).json(products);
    }catch(error){
        console.log(error);
        return res.status(500);
    }
});

router.post('/', (req, res) => {
    try{
        const body: CreateProductProps = req.body;
    
        // Validate all fields are present
        if (!body.productName || !body.productOwnerName || !body.scrumMasterName || !body.startDate || !body.methodology) {
            return res.status(400).json({ message: 'Missing required field' });
        }
    
        // ensure methodology is valid
        if(!methodologyOptions.includes(body.methodology)){
            return res.status(400).json({ message: 'Invalid methodology' });
        }
    
        // ensure date is valid
        const date = new Date(body.startDate);
        if(date.toString() === "Invalid Date"){
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
    
        newProduct.Developers = body.Developers || [];
    
        // Validate max 5 developers
        if (newProduct.Developers.length > 5) {
            return res.status(400).json({ message: 'Product cannot have more than 5 developers' });
        }
        
    
        products.push(newProduct);
        products.sort((a,b) => {
            return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        });
    
        return res.status(201).json(newProduct);
    }catch(error){
        console.log(error);
        return res.status(500);
    }
});

router.get('/:productId', (req, res) => {
    try{
        const { productId } = req.params;
        const product = products.find(product => product.productId === Number(productId));
        if (!product) {
            return res.status(404).json({ message: `Product with ID ${productId} not found` });
        }
        res.status(200).json(product);
    }catch(error){
        console.log(error);
        return res.status(500);
    }
});

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

router.delete('/:productId', (req, res) => {
    try{
        const { productId } = req.params;
        const index = products.findIndex(product => product.productId === Number(productId));
        if (index === -1) {
            return res.status(404).json({ message: `Product with ID ${productId} not found` });
        }
    
        products.splice(index, 1);
        res.status(200);
    }catch(error){
        console.log(error);
        return res.status(500);
    }
});

export default router;