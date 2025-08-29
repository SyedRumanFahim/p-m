// Vercel serverless function for newsletter subscriptions
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
        // Get all newsletter subscribers
        const subscribers = await db.collection('newsletter_subscribers')
          .find({})
          .sort({ createdAt: -1 })
          .toArray();
        res.status(200).json(subscribers);
        break;

      case 'POST':
        // Subscribe to newsletter
        const { email } = body;

        // Check if email already exists
        const existingSubscriber = await db.collection('newsletter_subscribers')
          .findOne({ email });

        if (existingSubscriber) {
          return res.status(400).json({ error: 'Email already subscribed' });
        }

        const newSubscriber = {
          email,
          createdAt: new Date(),
          status: 'active'
        };

        const result = await db.collection('newsletter_subscribers').insertOne(newSubscriber);
        res.status(201).json({ ...newSubscriber, _id: result.insertedId });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Newsletter API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}