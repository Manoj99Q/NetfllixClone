
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// MongoDB connection URI
const uri = 'URI';

// Path to the JSON file
const filePath = path.join(__dirname, 'movies.json');

async function insertMovies() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    
    // Specify the database and collection
    const database = client.db('NetflixClone');
    const collection = database.collection('Movie');

    // Read the JSON file
    const data = fs.readFileSync(filePath, 'utf8');
    const movies = JSON.parse(data);

    // Insert the data into the collection
    const result = await collection.insertMany(movies);
    console.log(`${result.insertedCount} documents were inserted`);
  } catch (err) {
    console.error('Error occurred while inserting documents:', err);
  } finally {
    // Close the connection
    await client.close();
  }
}

insertMovies().catch(console.dir);
