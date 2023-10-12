# ECC -DSSB Code Challenge Frontend

This is a Next.js application that utilizes Material UI components.

## Installation and Running

To install the necessary packages, run the following command in your terminal:

```bash
npm i
```

To run the application in development mode, execute:

```bash
npm run dev
```

The app will run on http://localhost:3001

*Note this is assuming you are running the server on port 3000 and have Node.js 18+*


## Repository layout

#### Pages
- `/pages`
    - `add.tsx`: Page for adding new products
    - `index.tsx`: Home page
    - `_app.tsx`: Application wrapper
    - `_document.tsx`: Document wrapper
    - `/api`
        - `index.ts`: Product API endpoint
        - `[productId].ts`: Individual product API endpoint
    - `/edit`
        - `[productId].tsx`: Edit product page
#### Source Code
- `/src`
    - `/components`
        - `EditProductForm.tsx`: Form component for editing a product
        - `MultipleTextField.tsx`: Multiple text field component
        - `Navbar.tsx`: Navigation bar component
        - `NewProductForm.tsx`: Form component for creating a new product
        - `ProductTable.tsx`: Table component for displaying products
    - `createEmotionCache.ts`: Emotion cache creation utility
    - `theme.ts`: Theming utility
#### Config files
- `.eslintrc.json`
- `next.config.js`
- `package-lock.json`
- `package.json`
- `tsconfig.json`
