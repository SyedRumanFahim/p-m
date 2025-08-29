// Vercel serverless function for blog operations
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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { db } = await connectToDatabase();
    const { method, query, body } = req;

    switch (method) {
      case 'GET':
        if (query.slug) {
          // Get single blog post by slug
          const post = await db.collection('blog_posts').findOne({ 
            $or: [{ slug: query.slug }, { _id: query.slug }] 
          });
          if (post) {
            // Increment view count
            await db.collection('blog_posts').updateOne(
              { _id: post._id },
              { $inc: { views: 1 } }
            );
            post.views = (post.views || 0) + 1;
          }
          res.status(200).json(post);
        } else {
          // Get all blog posts with optional filters
          const filter = {};
          if (query.status && query.status !== 'all') filter.status = query.status;
          if (query.category && query.category !== 'All') filter.category = query.category;
          
          const posts = await db.collection('blog_posts')
            .find(filter)
            .sort({ createdAt: -1 })
            .toArray();
          res.status(200).json(posts);
        }
        break;

      case 'POST':
        // Create new blog post
        const slug = body.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        const newPost = {
          ...body,
          slug,
          createdAt: new Date(),
          updatedAt: new Date(),
          views: 0
        };

        const result = await db.collection('blog_posts').insertOne(newPost);
        res.status(201).json({ ...newPost, _id: result.insertedId });
        break;

      case 'PUT':
        // Update blog post
        const updateResult = await db.collection('blog_posts').updateOne(
          { _id: query.id },
          { $set: { ...body, updatedAt: new Date() } }
        );
        res.status(200).json({ success: updateResult.modifiedCount > 0 });
        break;

      case 'DELETE':
        // Delete blog post
        const deleteResult = await db.collection('blog_posts').deleteOne({ _id: query.id });
        res.status(200).json({ success: deleteResult.deletedCount > 0 });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}