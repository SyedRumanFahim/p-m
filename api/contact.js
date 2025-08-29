// Vercel serverless function for contact operations
import { MongoClient } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://syedrumanfahim:tintin@testphp.hstmwxr.mongodb.net/?retryWrites=true&w=majority&appName=testphp';
const DB_NAME = 'portfolio_db';

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(DB_NAME);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { db } = await connectToDatabase();
    const { method, body } = req;

    switch (method) {
      case 'GET':
        // Get all contact submissions
        const submissions = await db.collection('contact_submissions')
          .find({})
          .sort({ createdAt: -1 })
          .toArray();
        res.status(200).json(submissions);
        break;

      case 'POST':
        // Save new contact submission
        const newSubmission = {
          ...body,
          createdAt: new Date(),
          status: 'new'
        };

        const result = await db.collection('contact_submissions').insertOne(newSubmission);
        res.status(201).json({ ...newSubmission, _id: result.insertedId });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Contact API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}