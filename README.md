# QA-Buckhill-Pet-Shop Tests

## Project Overview

This repository contains automated tests for the Buckhill Pet Shop application using Cypress. The tests cover various functionalities including user authentication, product management, and purchasing processes.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)
- Git

### Installation

1. **Clone the repository to your local machine:**
   ```sh
   git clone <repository-url>
   ```
2. **Navigate to the project directory:**
   ```sh
   cd <project-directory>
   ```
3. **Install the project dependencies:**
   ```sh
   npm install
   ```

### Running Cypress Tests

Cypress tests can be run in both headless and headed modes. Follow the instructions below to run the tests:

#### Headless Mode

In headless mode, tests will run without opening the Cypress GUI.

1. **Run all the Cypress tests in headless mode:**
   ```sh
   npx cypress run --headless
   ```

#### Headed Mode 

In headed mode, the Cypress GUI will open, and you can see the tests running.

1. **Run all the Cypress tests in headed mode:**
   ```sh
   npx cypress run --headed
   ```

## Test Scenarios and Test Cases Covered in this Test Suite


## 1. Admin Add New Customer

### Test Case 1: Admin is able to add a new customer successfully

#### Test Steps:
1. Generate new customer details.
2. Log in as an admin.
3. Navigate to the "Customers" page using the sidebar.
4. Click on "add new customer".
6. Enter the customer's first name, last name, email, phone number, location, password, and confirm password.
7. Click the "Add new customer" button.
8. Verify the newly added customer's details on the table.

#### Expected Results:
- New customer details should be successfully added and displayed correctly on the table.

---

## 2. Admin Add New Product

### Test Case 2: Admin is able to add a new product successfully

#### Test Steps:
1. Generate new product details.
2. Log in as an admin.
3. Navigate to the "Products" page using the sidebar.
4. Click on "add new product".
5. Upload the product image.
6. Select a product brand from the list.
7. Enter the product name, price, and description.
8. Select a product category from the list.
9. Click the "save changes" button.

#### Expected Results:
- New product details should be successfully added and displayed correctly on the product list.

---

## 3. Customer Purchase Items

### Test case 3: Customer is able to add items from different categories to the cart and purchase them

#### Test Steps:
1. Log in as a verified customer.
2. Select a product from the home page category.
3. Verify the product details on the product page.
4. Add the product to the cart.
5. Navigate to the cart page and verify the product details in the cart.
6. Proceed to checkout.
7. Enter shipping details.
8. Navigate to the payment details page.
9. Enter payment details and place the order.

#### Expected Results:
- Product details should be consistent across the home page, product page, and cart page.
- Shipping and payment details should be entered successfully.
- Order should be placed successfully.

---

## 4. Customer Login and Verify Details

### Test case 4: Log in as a verified customer and verify customer information

#### Test Steps:
1. Log in as a verified customer.
2. Open the customer profile page.
3. Verify the customer's name, phone number, address, date joined, and email.

#### Expected Results:
- Customer details should be correctly displayed on the profile page.
