const { MongoClient } = require("mongodb");

// Connection URL
const url =
  "mongodb+srv://NamasteNode:Bbx9NoOTJtcMUbbl@namastenode.v5xnedh.mongodb.net/?appName=NamasteNode";
const client = new MongoClient(url);

// Database Name
const dbName = "Testing";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("User");

  const data = {
    fName: "John",
    LName: "Cena",
  };

  // There are many api to perform operation on the database.
  // Check mongodb documentation for more details.

  const insertResult = await collection.insertOne(data);
  console.log("Inserted document =>", insertResult);

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

// Steps

// Go to mongodb website
// Create a free cluster (mongodb atlas)
// Create a user
// Get the connection string
// Install Mongo DB compass - GUI for mongodb

// mongobd module is used to connect to the database and perform operations on it.
// We will use moongoose module to connect to the database and perform operations on it.
