const path = require("path");
const dotenv = require("dotenv");

// 1. Check NODE_ENV. If it's not set, default to 'development'
const environment = process.env.NODE_ENV || "development";

// 2. Point to the specific file (.env.development or .env.production)
// process.cwd() always points to the root directory where you ran npm run dev, no matter where the script file is located.
const envPath = path.resolve(process.cwd(), `.env.${environment}`);

// 3. Tell dotenv to load that specific file
dotenv.config({ path: envPath });

// console.log(`Running in ${environment} mode`);
// console.log(`Port: ${process.env.PORT_NUMBER}`);
