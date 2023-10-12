import request from 'supertest';
import { app } from '../../index';
import { products } from '../../index';

describe('Test Announcement Endpoints', () => {
});

describe('Test Product Endpoints', () => {
  describe('GET /api/product', () => {
    test('Should get list of products with 200 status', async () => {
      const res = await request(app)
          .get('/api/product')
      
      expect(res.status).toEqual(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe('POST /api/product', () => {
    test('should create a new product and return 201 status', async () => {
      const newProduct = {
        productName: "New Product",
        productOwnerName: "Owner",
        scrumMasterName: "Scrum Master",
        startDate: "2022/10/12",
        methodology: "Agile",
        Developers: ["dev1", "dev2"]
      };
  
      const res = await request(app)
          .post('/api/product')
          .send(newProduct);
  
      expect(res.status).toEqual(201);
      expect(res.body).toHaveProperty('productId');
      expect(res.body.productName).toEqual(newProduct.productName);
      expect(res.body.productOwnerName).toEqual(newProduct.productOwnerName);
    });

    test('should fail when a required field is missing and return 400 status', async () => {
      const incompleteProduct = {
        productOwnerName: "Owner",
        scrumMasterName: "Scrum Master",
        startDate: "2022/10/12",
        methodology: "Agile",
      };
  
      const res = await request(app)
          .post('/api/product')
          .send(incompleteProduct);
  
      expect(res.status).toEqual(400);
      expect(res.body.message).toEqual('Missing required field');
    });

    test('should fail when invalid methodology is provided and return 400 status', async () => {
      const invalidMethodologyProduct = {
        productName: "New Product",
        productOwnerName: "Owner",
        scrumMasterName: "Scrum Master",
        startDate: "2022/10/12",
        methodology: "InvalidMethodology",
        Developers: ["dev1", "dev2"]
      };
  
      const res = await request(app)
          .post('/api/product')
          .send(invalidMethodologyProduct);
  
      expect(res.status).toEqual(400);
      expect(res.body.message).toEqual('Invalid methodology');
    });

    test('should fail when an invalid date is provided and return 400 status', async () => {
      const invalidDateProduct = {
        productName: "New Product",
        productOwnerName: "Owner",
        scrumMasterName: "Scrum Master",
        startDate: "Invalid Date",
        methodology: "Agile",
        Developers: ["dev1", "dev2"]
      };
  
      const res = await request(app)
          .post('/api/product')
          .send(invalidDateProduct);
  
      expect(res.status).toEqual(400);
      expect(res.body.message).toEqual('Invalid date');
    });

  });
  describe('GET /api/product/:productId', () => {
    test('should return a specific product if product ID exists', async () => {
      const existingProductId = products[0].productId;
      const res = await request(app).get(`/api/product/${existingProductId}`);
  
      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty('productId', existingProductId);
    });

    test('should return 404 if product ID does not exist', async () => {
      const nonExistentProductId = 999999; // Assuming this ID doesn't exist
      const res = await request(app).get(`/api/product/${nonExistentProductId}`);
  
      expect(res.status).toEqual(404);
    });
  });
  describe('PUT /api/product/:productId', () => {
    test('should update the product if product ID exists and valid field present', async () => {
      const existingProductId = products[0].productId;
      const res = await request(app)
        .put(`/api/product/${existingProductId}`)
        .send({ productName: 'Updated Name' });
  
      expect(res.status).toEqual(200);
      expect(res.body.productName).toEqual('Updated Name');
    });

    test('should return 404 if product ID does not exist', async () => {
      const nonExistentProductId = 999999; // Assuming this ID doesn't exist
      const res = await request(app).put(`/api/product/${nonExistentProductId}`).send({ productName: 'Updated Name' });
  
      expect(res.status).toEqual(404);
    });

    test('should return 400 for invalid fields', async () => {
      const existingProductId = products[0].productId;
      const res = await request(app)
        .put(`/api/product/${existingProductId}`)
        .send({ invalidField: 'invalid' });
  
      expect(res.status).toEqual(400);
    });

    test('should return 400 if more than 5 developers', async () => {
      const existingProductId = products[0].productId;
      const res = await request(app)
        .put(`/api/product/${existingProductId}`)
        .send({ Developers: Array(6).fill('Developer') });
  
      expect(res.status).toEqual(400);
    });

  });

  describe('DELETE /api/product/:productId', () => {
    test('should delete the product and return 200 if product ID exists', async () => {
      const existingProductId = products[0].productId;
      const res = await request(app).delete(`/api/product/${existingProductId}`);
  
      expect(res.status).toEqual(200);
      expect(res.body.message).toEqual(`Product with ID ${existingProductId} deleted`);
    });

    test('should return 404 if product ID does not exist', async () => {
      const nonExistentProductId = 999999; // Assuming this ID doesn't exist
      const res = await request(app).delete(`/api/product/${nonExistentProductId}`);
  
      expect(res.status).toEqual(404);
    });
  });

});

afterEach(() => {
  jest.clearAllMocks();
});
