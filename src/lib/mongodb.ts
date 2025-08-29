import { MongoClient, Db, Collection } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://syedrumanfahim:tintin@testphp.hstmwxr.mongodb.net/?retryWrites=true&w=majority&appName=testphp';
const DB_NAME = 'portfolio_db';

let client: MongoClient;
let db: Db;

export interface BlogPost {
  _id?: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  featuredImage?: string;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  slug: string;
}

export interface ContactSubmission {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
  status: 'new' | 'read' | 'replied';
}

export async function connectToDatabase(): Promise<{ db: Db; client: MongoClient }> {
  if (db && client) {
    return { db, client };
  }

  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(DB_NAME);
    
    console.log('Connected to MongoDB');
    return { db, client };
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export async function getBlogPosts(filter: { status?: string; category?: string } = {}): Promise<BlogPost[]> {
  try {
    const { db } = await connectToDatabase();
    const collection: Collection<BlogPost> = db.collection('blog_posts');
    
    const query: Record<string, string> = {};
    if (filter.status) query.status = filter.status;
    if (filter.category && filter.category !== 'All') query.category = filter.category;
    
    const posts = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();
    
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { db } = await connectToDatabase();
    const collection: Collection<BlogPost> = db.collection('blog_posts');
    
    const post = await collection.findOne({ slug });
    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function createBlogPost(post: Omit<BlogPost, '_id' | 'createdAt' | 'updatedAt' | 'views' | 'slug'>): Promise<BlogPost | null> {
  try {
    const { db } = await connectToDatabase();
    const collection: Collection<BlogPost> = db.collection('blog_posts');
    
    const slug = post.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    const newPost: BlogPost = {
      ...post,
      slug,
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0
    };
    
    const result = await collection.insertOne(newPost);
    return { ...newPost, _id: result.insertedId.toString() };
  } catch (error) {
    console.error('Error creating blog post:', error);
    return null;
  }
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<boolean> {
  try {
    const { db } = await connectToDatabase();
    const collection: Collection<BlogPost> = db.collection('blog_posts');
    
    const result = await collection.updateOne(
      { _id: id },
      { 
        $set: { 
          ...updates, 
          updatedAt: new Date() 
        } 
      }
    );
    
    return result.modifiedCount > 0;
  } catch (error) {
    console.error('Error updating blog post:', error);
    return false;
  }
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  try {
    const { db } = await connectToDatabase();
    const collection: Collection<BlogPost> = db.collection('blog_posts');
    
    const result = await collection.deleteOne({ _id: id });
    return result.deletedCount > 0;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }
}

export async function incrementBlogPostViews(slug: string): Promise<void> {
  try {
    const { db } = await connectToDatabase();
    const collection: Collection<BlogPost> = db.collection('blog_posts');
    
    await collection.updateOne(
      { slug },
      { $inc: { views: 1 } }
    );
  } catch (error) {
    console.error('Error incrementing views:', error);
  }
}

export async function saveContactSubmission(submission: Omit<ContactSubmission, '_id' | 'createdAt' | 'status'>): Promise<ContactSubmission | null> {
  try {
    const { db } = await connectToDatabase();
    const collection: Collection<ContactSubmission> = db.collection('contact_submissions');
    
    const newSubmission: ContactSubmission = {
      ...submission,
      createdAt: new Date(),
      status: 'new'
    };
    
    const result = await collection.insertOne(newSubmission);
    return { ...newSubmission, _id: result.insertedId.toString() };
  } catch (error) {
    console.error('Error saving contact submission:', error);
    return null;
  }
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  try {
    const { db } = await connectToDatabase();
    const collection: Collection<ContactSubmission> = db.collection('contact_submissions');
    
    const submissions = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    return submissions;
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return [];
  }
}