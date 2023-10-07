# ecc-dssb-code-challenge-reqTBD

## Instructions for IS-24 Full Stack Developer Position

For this code challenge we are asking you to build a Web Application that tracks and manages Web Applications developed by the Province of BC as described by the User Stories below. 

In order to move forward to the next part of the competition you must demonstrate knowledge in the following areas of your submission:

* GitHub Repository
* Modern Backend API Framework 
    * **BONUS** Swagger Documentation
* Modern Frontend Web Application Framework
    * 3 user stories providing basic functionality
    * **BONUS** 2 user stories providing a search for product resource names
* Basic Documentation on how to effortlessly run your solution components on a local development machine
    * This includes basic npm or docker commands required to have your solution stood up on **any** workstation
    * **ASSUMPTIONS!** The marking panel for this assignment will have basic development tools installed on their workstations such as node, npm, docker. If your solution requires any other frameworks or languages to be present on a workstation in order for your solution to work, please provide basic instructions on how to install your tech stack before trying to build and run your web application.

### Important!

* Read the Code Challenge Context, User Stories and Assessment Scoring for this challenge carefully. Development of the functionality described in these sections is what you are being marked against.

* Only solutions that build and run without warning or error will be considered, or solutions that take minimal effort to troubleshoot and resolve errors at build/runtime to move forward to the next step of this competition.

* This code challenge does not require a database to accomplish your solution. In memory data storage or mock-data is highly encouraged.

* **BONUS** Swagger Documentation that allows a developer with no knowledge of your Web Application API to integrate with the endpoints that you have developed

## What to Submit

### GitHub Repository

Create a GitHub repository using your GitHub Account. The name of the repository should use the following convention:

[FIRST_NAME]-[LAST_NAME]-ecc-dssb-IS24-code-challenge-reqTBD

Your working solution should be present on the **main** branch of the repository. Please trim or remove any extraneous branches prior to submission.

Your submission to the marking panel should come in the form of a link to the repository you have created with your working solution.

Please send the final copy of your solution via a link to your repository in an email to chris.ditcher@gov.bc.ca and include ecc-dssb-code-challenge-reqTBD in the subject line.

### API Component

The API component should use a modern framework or language (of your choice) to create API endpoints utilized by the Frontend component. All endpoints should originate from http://localhost:3000/api

**Example** A GET endpoint to retrieve a product with a specific product id

http://localhost:3000/api/product/:productId

**User Authentication/Authorization is not required for the purposes of your solution.**

Your API should include at minimum the following functionality:
* A health endpoint that returns a http 200 response indicating your component is healthy
* All GET, POST, PUT and DELETE endpoints return the proper response codes when consumed

### Sample JSON Schema

```
    {
        productId: VALUE,
        productName: VALUE,
        productOwnerName: VALUE,
        Developers: [
         "NAME_1",
         "NAME_2",
         "NAME_3",
         "NAME_4",
         "NAME_5"
        ],
        scrumMasterName: VALUE,
        startDate: "YYYY/MM/DD",
        methodology: VALUE,
        location: VALUE
    }
```

Pre-populate a JSON object within your solution with up to 40 sample products. This will not be provided for your solution. Use of a random generator is encouraged.

### BONUS - Swagger Documentation

All API endpoints that are created in order to develop the required frontend application functionality should be documented via Swagger.

The Swagger documentation should be consumed by anyone building the product on their local workstation at http://localhost:3000/api/api-docs.

### Frontend Component

This component should be developed using a modern javascript framework (of your choice). This component should utilize endpoints developed in your API solution to
provide your Frontend component with basic CRUD actions described in the user stories provided. 

This component should be comprised of a basic table or data table that displays information related to the Web Applications being listed.

**BONUS** Two user stories outlining a search on data that is present in the basic table will be asked.

## Code Challenge Context

The BC Government Ministry of Education and Child Care (ECC) is currently trying to catalog current modern web applications in GitHub, as well as new products that are coming up in the future. Currently there are 40 products marked for modernization that need to be catalogued, as well as 3 products that are either actively being developed or in a maintenance lifecycle.

Product owners have expressed the desire to communicate to the branch where these products are housed (GitHub Repository). 

The user base for this application will include a wide array of technical skills, therefore making this application as simple as possible to display, create and edit information is being stressed by the ECC Senior Leadership Team (SLT).

## Personas

**Lisa** A director within ECC that is fairly new to the branch, but has worked with BC Government for 10+ years. She has experience with software development products as she was previously a Product Owner for a product that had a successful production launch. She currently manages Service Design and SCRUM Master resources, and would like to know at a glance who is resourced on what product. She understands Agile philosophy and knows that a solution may take many iterations to achieve a desired state of functionality.

**Alan** A DevOps resource that has worked for ECC for the last 3 years. He has worked on many products, including from inception to maintenance life-cycles for ECC, setting up deployment pipelines and integrating technologies into products that help increase developer velocity. He actively engages the developer community to understand their ever changing needs from product to product. Alan is currently looking to build a tool that allows product owners/stakeholders within ECC to understand resource utilization across all products within ECC to help avoid developer/resource burn-out.

**Both ECC Employees** are looking for a tool that offers all users within ECC easily digestible data based on the breadth and depth of the many products they currently develop and maintain, as well as products that are on the horizon for ECC. Displaying exactly the right amount of information at a glance is paramount to both Lisa and Alan.

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

## Assessment Scoring

The following tables will be provided to you via email after marking of your solution is complete.

### GitHub Repository Component
| Rating                  | Criteria                                                                        |
|-------------------------|---------------------------------------------------------------------------------|
| Pass/Acceptable         | * Organized, easy to read                                                       |
|                         | * Documentation when required                                                   |
|                         | * Solution is present on main branch of repository                              |
|                         | * Extraneous branches removed/trimmed from repo                                 |
| Fail/Unacceptable       | * Any of the requirements of Pass/Acceptable are not met                        |

### Backend API Component
| Rating                  | Criteria                                                               |
|-------------------------|------------------------------------------------------------------------|
| Pass/Acceptable         | * RESTful                                                              |
|                         | * Endpoints return http responses required for given CRUD actions      |
|                         | * Basic commenting of your solution                                    |
| Fail/Unacceptable       | * More than one requirement of Pass/Acceptable are not met             |

### BONUS - API Swagger Documentation

| Rating                  | Criteria                                                                                                      |
|-------------------------|---------------------------------------------------------------------------------------------------------------|
| Pass/Acceptable         | * Swagger documentation present for all endpoints developed, and served at http://localhost:3000/api/api-docs |
| Fail/Unacceptable       | * Swagger Documentation is incomplete or not present                                                          |

### Frontend Component
| Rating                  | Criteria                                                                                                               |
|-------------------------|------------------------------------------------------------------------------------------------------------------------|
| Pass/Acceptable         | * Microservice component                                                                                               |
|                         | * Functional or Class based component design based on requirement                                                      | 
|                         | * Appropriate naming of components, elements, classes, etc.                                                            |
|                         | * Basic error handling when interacting with API (ex// API is not present or healthy)                                  |
|                         | * Basic commenting of your solution                                                                                    | 
|                         | * Utilizes API to perform required GET, PUT, POST or DELETE actions when required (3 of 4 CRUD actions is acceptable)  |
|                         | * Acceptance criteria for User Story 1 is complete                                                                     |
|                         | * Acceptance criteria for User Story 2 is complete                                                                     |
|                         | * Acceptance criteria for User Story 3 is complete                                                                     |
|                         | * **BONUS** Acceptance criteria for User Story 4 is complete                                                           |
|                         | * **BONUS** Acceptance criteria for User Story 5 is complete                                                           |
| Fail/Unacceptable       | * More than one requirement of Pass/Acceptable are not met (bonus user stories excluded)                               |