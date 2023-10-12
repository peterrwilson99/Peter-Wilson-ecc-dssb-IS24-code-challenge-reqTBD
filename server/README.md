# ECC -DSSB Code Challenge Server

This is a TypeScript-based Express backend application. It uses in-memory storage to manage products. For dummy data, bcgov GitHub repositories and contributers were scraped and then paired with random data to fill necessary fields.

## Installation and Running
To install the necessary packages, run the following command in your terminal:

```bash
npm i
```

To run the application in development mode, execute:

```bash
npm run dev
```

The app will run on 3000

*Node.js v18 is required to run this application*

## Documentation

Documentation for the API can be found at http://localhost:3000/api/api-docs

## Routes
- `GET /health`
    - Healthcheck of server endpoint
    - Returns status code of 200 if successful
- `GET /api/product`
    - Gets all products
    - Return status code of 200 if successful
- `POST /api/product`
    - Posts new product into memory, accepts JSON of following shape
    - ```ts
            interface CreateProductProps {
                productName: string;
                productOwnerName: string;
                Developers: string[];
                scrumMasterName: string;
                startDate: string;
                methodology: Methodology;
            }
    - Return status code of 201 if successful
- `GET /api/product/:productId`
    - Gets product with productId
    - Return status code of 200 if successful
- `PUT /api/product/:productId`
    - Edits product with productId with fields provided, accepts JSON of the following shape
    - ```ts
            interface UpdateProductProps {
                productName?: string;
                productOwnerName?: string;
                Developers?: string[];
                scrumMasterName?: string;
                startDate?: string;
                methodology?: Methodology;
                location?: string;
            }
    - Return status code of 200 if successful
- `DELETE /api/product/:productId`
    - Deletes product with productId
    - Return status code of 200 if successful


## Repository Layout

### Source Code

- `/src`
    - `index.ts`: Entry point for the Express application

### Data Storage

- `/src/data`
    - `dummy.ts`: File containing dummy data logic
    - `products.ts`: bcgov GitHub Project info

### Middleware

- `/src/middleware`
    - `error.ts`: Error handling middleware
    - `notFound.ts`: 404 Not Found middleware

### Routes

- `/src/routes`
    - `product.ts`: Product-related routes

### Types

- `/src/types`
    - `Product.d.ts`: Type definitions for products

### Utilities

- `/src/utils`
    - `generateId.ts`: Utility for generating product IDs

### Configuration Files

- `.gitignore`: Specifies files to ignore in version control
- `package-lock.json`: Lock file for npm packages
- `package.json`: Project metadata and dependencies
- `tsconfig.json`: TypeScript configuration file
