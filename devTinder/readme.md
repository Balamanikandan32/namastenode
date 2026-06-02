# .env file

- To handle .env.development and .env.production files dynamically in a Node.js application.

- Step 1: Install the required packages
  -- You will need dotenv to load the files, and cross-env to ensure your environment variables can be set properly across different operating systems (Windows, Mac, and Linux).
  -- npm install dotenv
  --npm install cross-env --save-dev
- Step 2: Create your files
  -- In the root directory of your project (next to your package.json), create your two separate environment files.
  -- .env.development, .env.production
- Step 3: Write the dynamic loading logic
  --At the absolute top of your main entry file (e.g., server.js or app.js), write this logic. Instead of just calling .config(), you pass it an object specifying the path.
  -- Code Example
  -- const path = require('path');
  -- const dotenv = require('dotenv');
  --// 1. Check NODE_ENV. If it's not set, default to 'development'
  --const environment = process.env.NODE_ENV || 'development';
  --// 2. Point to the specific file (.env.development or .env.production)
  --const envPath = path.resolve(\_\_dirname, `.env.${environment}`);
  --// 3. Tell dotenv to load that specific file
  --dotenv.config({ path: envPath });

- Step 4: Update your package.json scripts
  -- Now, you need a way to tell Node.js which mode you want to run. Update the scripts section of your package.json file using cross-env:
  --"scripts": {
  "dev": "cross-env NODE_ENV=development node server.js",
  "start": "cross-env NODE_ENV=production node server.js"
  }

# cron jobs

- we are using a node-cron package for cron jobs
- Implement a sample use case
  -- sending email(for now console loggnig) to evry user who got connection request for previous day

# Payment Gateway Integration

- Create a razorpay account
- Create a premium/product page in frontend
- Develop a sample code like subscription, buying e-commerce product.
- Install a razorpay module in backend application (npm i razorpay)
- Generate a API KEY from the razorpay dashboard.
- Develop a express router for payment APIs.
- INTEGRATION-STEPS
  - Instantiate the Razorpay instance
  - Create a order api
    -- In order api handler, create an order
    -- save the order on the database and return the order detail to frontend
  - Make an api call in frontend to backend for creating order api.
  - Once ORDER is created, we can open the razorpay checkout page(payment dialog box, integrate it on frontend).
  - Razorpay process the payment and call the handler function in checkout option
  - Call the backend api to update the UI
  - Set up the web hook on Razorpay Dashboard
  - In backend write the webhook api to verify the payment and update the database.
