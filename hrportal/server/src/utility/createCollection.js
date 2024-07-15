const url = require('../connection/constants')
const { MongoClient } = require('mongodb');

const uri = 'mongodb:' + url.localhost;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function checkAndCreateCollection(collectionName) {
    try {
        await client.connect();
        const database = client.db(url.databaseName);

        const collections = await database.listCollections().toArray();
        const existingCollection = collections.find(collection => collection.name === collectionName);

        if (!existingCollection) {
            console.log(`Created collection: ${collectionName}`);
        } else {
            console.log(`Collection already exists: ${collectionName}`);
        }
    } catch (error) {
        console.error(`Error checking or creating collection: ${error}`);
    }
}

async function collectionChecker() {
    try {
      await checkAndCreateCollection('candidates');
      await checkAndCreateCollection('users');
      await checkAndCreateCollection('resumes');
      await checkAndCreateCollection('skillsets');
      await checkAndCreateCollection('subskillsets');
      await checkAndCreateCollection('status');
    } catch (error) {
      console.error('Error creating collections or models:', error);
    }
  }
collectionChecker();

module.exports = { checkAndCreateCollection };