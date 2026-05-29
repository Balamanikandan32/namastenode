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
