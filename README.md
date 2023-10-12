# ECC DSSB Code Challenge 
> Peter Wilson

## Project Summary

This repository houses the BC WebApp Tracker, a full-stack application comprised of a frontend, backend, and data fetching scripts. The frontend is a Next.js application written in TypeScript and styled with Material-UI components. The backend is an Express.js server, also written in TypeScript, which utilizes in-memory storage for products, with a test suite written using jest. Additional data fetching scripts were used to populate the application with dummy data from the bcgov GitHub account, which can be found in the `/data` folder.

## Documentation

Documentation for the server API can be found at http://localhost:3000/api/api-docs

## Requirements

- Node.js v18 and npm

### Frontend

- Next.js
- TypeScript
- Material-UI

### Backend

- Express.js
- TypeScript
- Faker.js for dummy data

## Repository Structure

- `/data`
    - Scripts for fetching dummy data from the bcgov GitHub account
- `/frontend`
    - Next.js application built with TypeScript and Material-UI
- `/server`
    - Express.js API built with TypeScript, utilizes in-memory storage for products
- `/.github`
    - GitHub Actions for Continuous Integration


## Run Production

### Using Docker

If first time running application, run
```bash
docker-compose up --build -d
# or without the -d to run in foreground
docker-compose up --build
```

otherwise run

```bash
docker-compose up -d
# or without the -d to run in foreground
docker-compose up
```


### Using Node
1. Install server dependencies
```bash
cd server
npm i
```
2. Build Server
```bash
npm run build
```
3. Run Server
```bash
npm start
```
4. Open a new terminal window in base repository folder
5. Install frontend dependencies
```bash
cd frontend
npm i
```
6. Build frontend
```bash
npm run build
```
7. Run frontend
```bash
npm start
```

The server will be running on http://localhost:3000 and the frontend will be running on http://localhost:3001

## Run Development

1. Install server dependencies
```bash
cd server
npm i
```
2. Run Server
```bash
npm run dev
```
3. Open a new terminal window in base repository folder
4. Install frontend dependencies
```bash
cd frontend
npm i
```
5. Run frontend
```bash
npm run dev
```

The server will be running on http://localhost:3000 and the frontend will be running on http://localhost:3001


## Additional Information

For more detailed information, please refer to the README files within each respective folder (`/data`, `/frontend`, `/server`).

## User Stories

### User Story One

As Lisa, I want to see a list of all products that ECC currently develops or maintains in a list view. 

Given that I don't need to be an authorized user  
When I navigate to the application landing page  
I can see a list of all products within ECC  
And all relevant information related to each product 
* Product Number
* Product Name
* Scrum Master
* Product Owner
* Developer Names (up to 5)
* Start Date
* Methodology (Agile or Waterfall)
* Location (Github repository link which can be any project under github.com/bcgov organization for demo purposes)

**Acceptance Criteria**
* All columns fit on the page
* I can see a title for each column
* I can see a total number of all products at ECC

### User Story Two

As Lisa, I want to be able to add a product to the list of products that ECC is developing or maintaining.  

Given that I am on the product view list  
When I click add new product call to action button  
Then I am able to answer the following questions on a form:

* Product Name
* Scrum Master
* Product Owner
* Developer Names (up to 5)
* Start Date
* Methodology (Agile or Waterfall)

**Acceptance Criteria**
* Product number generated is automatic, and doesn't collide with previously generated product IDs
* User must answer all questions in order to save
* Click on save button

### User Story Three

As Alan, I want to be able to add or edit product related information so that I can ensure that product data is accurate.

Given that I don't need to be an authorized user  
When I am on the list page and I click on an edit button  
Then I am able to edit the following fields:

* Product Name
* Scrum Master
* Product Owner
* Developer Names (up to 5)
* Methodology (Agile or Waterfall)
* Location (Github repository link which can be any project under github.com/bcgov organization for demo purposes)

**Acceptance Criteria**
* Call to action button for saving exits  
* I can see my changes saved immediately
* Data created or edited is persistent through the event of a page refresh

### **BONUS** User Story Four

As Lisa, I want to search for a specific Scrum Master name so that I can see all of the products that they are currently working on.

Given that I don't need to be an authorized user  
When I am on the list view page  
Then I can search for a specific person in the Scrum Master role

**Acceptance Criteria**
* All columns fit on the page
* I can see a title for each column
* I can see a total number of all products the Scrum Master is in
* The only products listed include the Scrum Master Name

### **BONUS** User Story Five

As Alan, I want to search for a specific Developer name so that I can see all of the products that they are currently working on.

Given that I don't need to be an authorized user  
When I am on the list view page  
I can search for a specific developer  

**Acceptance Criteria**
* All columns fit on the page
* I can see a title for each column
* I can see a total number of all products the Developer being searched for is working on
* Only products where the developer is assigned to are shown




