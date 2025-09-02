// API client for frontend to communicate with backend
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://mahmuda.vercel.app/api' 
  : '/api';

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

export interface NewsletterSubscriber {
  _id?: string;
  email: string;
  createdAt: Date;
  status: 'active' | 'unsubscribed';
}

// Blog API functions
export async function getBlogPosts(filter: { status?: string; category?: string } = {}): Promise<BlogPost[]> {
  try {
    const params = new URLSearchParams();
    if (filter.status) params.append('status', filter.status);
    if (filter.category) params.append('category', filter.category);
    
    const response = await fetch(`${API_BASE_URL}/blog?${params}`);
    if (!response.ok) throw new Error('Failed to fetch blog posts');
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/blog?slug=${slug}`);
    if (!response.ok) throw new Error('Failed to fetch blog post');
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function createBlogPost(post: Omit<BlogPost, '_id' | 'createdAt' | 'updatedAt' | 'views' | 'slug'>): Promise<BlogPost | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    
    if (!response.ok) throw new Error('Failed to create blog post');
    
    return await response.json();
  } catch (error) {
    console.error('Error creating blog post:', error);
    return null;
  }
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/blog?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    
    if (!response.ok) throw new Error('Failed to update blog post');
    
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error updating blog post:', error);
    return false;
  }
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/blog?id=${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) throw new Error('Failed to delete blog post');
    
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }
}

export async function incrementBlogPostViews(slug: string): Promise<void> {
  // Views are incremented automatically when fetching by slug
}

// Contact API functions
export async function saveContactSubmission(submission: Omit<ContactSubmission, '_id' | 'createdAt' | 'status'>): Promise<ContactSubmission | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submission),
    });
    
    if (!response.ok) throw new Error('Failed to save contact submission');
    
    return await response.json();
  } catch (error) {
    console.error('Error saving contact submission:', error);
    return null;
  }
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`);
    if (!response.ok) throw new Error('Failed to fetch contact submissions');
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return [];
  }
}

// Newsletter API functions
export async function subscribeToNewsletter(email: string): Promise<NewsletterSubscriber | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/newsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to subscribe to newsletter');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
}

export async function getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/newsletter`);
    if (!response.ok) throw new Error('Failed to fetch newsletter subscribers');
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error);
    return [];
  }
}