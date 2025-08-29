// Mock database implementation for frontend-only operation
// This simulates MongoDB operations using localStorage

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

// Generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Sample blog posts
const sampleBlogPosts: BlogPost[] = [
  {
    _id: '1',
    title: 'Essential API Testing Strategies for Modern Applications',
    excerpt: 'Learn comprehensive approaches to API testing including validation techniques, security testing, and performance optimization for robust backend services.',
    content: `API testing is crucial for ensuring the reliability and security of modern applications. In this comprehensive guide, we'll explore various strategies and techniques that every QA engineer should master.

## Understanding API Testing Fundamentals

API testing involves validating Application Programming Interfaces to ensure they meet expectations for functionality, reliability, performance, and security. Unlike UI testing, API testing focuses on the business logic layer of the software architecture.

## Key Testing Strategies

### 1. Functional Testing
- Validate that the API functions correctly according to specifications
- Test various HTTP methods (GET, POST, PUT, DELETE)
- Verify request and response formats
- Check error handling and status codes

### 2. Security Testing
- Authentication and authorization testing
- Input validation and injection attacks
- Data encryption verification
- Rate limiting and throttling

### 3. Performance Testing
- Load testing with multiple concurrent requests
- Stress testing to find breaking points
- Latency and response time measurement
- Resource utilization monitoring

## Best Practices

1. **Test Early and Often**: Integrate API testing into your CI/CD pipeline
2. **Use Proper Test Data**: Create realistic test scenarios with edge cases
3. **Document Everything**: Maintain clear documentation of test cases and results
4. **Automate When Possible**: Use tools like Postman, REST Assured, or custom scripts

## Conclusion

Effective API testing is essential for delivering reliable software. By implementing these strategies, you can ensure your APIs are robust, secure, and performant.`,
    author: 'Mahmuda Ferdus',
    category: 'API Testing',
    tags: ['API', 'Testing', 'Automation', 'Best Practices'],
    status: 'published',
    createdAt: new Date('2024-08-15'),
    updatedAt: new Date('2024-08-15'),
    views: 245,
    slug: 'essential-api-testing-strategies-for-modern-applications'
  },
  {
    _id: '2',
    title: 'Mastering Selenium WebDriver: Advanced Techniques',
    excerpt: 'Deep dive into advanced Selenium WebDriver techniques including page object model, data-driven testing, and cross-browser automation.',
    content: `Selenium WebDriver is one of the most powerful tools for web application testing automation. This guide covers advanced techniques that will elevate your automation skills.

## Advanced Selenium Techniques

### Page Object Model (POM)
The Page Object Model is a design pattern that creates an object repository for web UI elements. This approach makes tests more maintainable and reduces code duplication.

### Data-Driven Testing
Learn how to separate test data from test scripts, enabling you to run the same test with multiple data sets efficiently.

### Cross-Browser Testing
Implement robust cross-browser testing strategies to ensure your application works consistently across different browsers and versions.

## Best Practices for Selenium

1. **Use Explicit Waits**: Avoid Thread.sleep() and use WebDriverWait for better synchronization
2. **Implement Page Factory**: Utilize @FindBy annotations for cleaner code
3. **Handle Dynamic Elements**: Use dynamic XPath and CSS selectors effectively
4. **Parallel Execution**: Run tests in parallel to reduce execution time

## Conclusion

Mastering these advanced Selenium techniques will significantly improve your test automation framework's reliability and maintainability.`,
    author: 'Mahmuda Ferdus',
    category: 'Automation',
    tags: ['Selenium', 'WebDriver', 'Automation', 'Page Object Model'],
    status: 'published',
    createdAt: new Date('2024-08-10'),
    updatedAt: new Date('2024-08-10'),
    views: 189,
    slug: 'mastering-selenium-webdriver-advanced-techniques'
  },
  {
    _id: '3',
    title: 'Performance Testing with JMeter: A Complete Guide',
    excerpt: 'Comprehensive guide to performance testing using Apache JMeter, covering load testing, stress testing, and performance optimization strategies.',
    content: `Apache JMeter is a powerful tool for performance testing. This comprehensive guide will help you master performance testing techniques.

## Getting Started with JMeter

JMeter is an open-source tool designed for load testing and measuring performance. It can test various protocols and applications.

## Types of Performance Testing

### Load Testing
- Simulate expected user load
- Verify system behavior under normal conditions
- Identify performance bottlenecks

### Stress Testing
- Push system beyond normal capacity
- Find breaking points
- Test recovery mechanisms

### Volume Testing
- Test with large amounts of data
- Verify database performance
- Check memory usage

## Best Practices

1. **Plan Your Tests**: Define clear performance requirements
2. **Use Realistic Data**: Test with production-like data volumes
3. **Monitor Resources**: Track CPU, memory, and network usage
4. **Analyze Results**: Use JMeter's reporting features effectively

## Conclusion

Performance testing is crucial for delivering scalable applications. JMeter provides the tools needed to ensure your application performs well under various conditions.`,
    author: 'Mahmuda Ferdus',
    category: 'Performance Testing',
    tags: ['JMeter', 'Performance Testing', 'Load Testing', 'Optimization'],
    status: 'published',
    createdAt: new Date('2024-08-05'),
    updatedAt: new Date('2024-08-05'),
    views: 156,
    slug: 'performance-testing-with-jmeter-complete-guide'
  }
];

// Initialize localStorage with sample data if empty
const initializeData = () => {
  if (!localStorage.getItem('blogPosts')) {
    localStorage.setItem('blogPosts', JSON.stringify(sampleBlogPosts));
  }
  if (!localStorage.getItem('contactSubmissions')) {
    localStorage.setItem('contactSubmissions', JSON.stringify([]));
  }
};

// Blog post operations
export async function getBlogPosts(filter: { status?: string; category?: string } = {}): Promise<BlogPost[]> {
  initializeData();
  
  const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
  
  return posts.filter((post: BlogPost) => {
    const matchesStatus = !filter.status || post.status === filter.status;
    const matchesCategory = !filter.category || filter.category === 'All' || post.category === filter.category;
    return matchesStatus && matchesCategory;
  });
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  initializeData();
  
  const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
  const post = posts.find((p: BlogPost) => p.slug === slug || p._id === slug);
  
  if (post) {
    // Increment view count
    post.views = (post.views || 0) + 1;
    localStorage.setItem('blogPosts', JSON.stringify(posts));
  }
  
  return post || null;
}

export async function createBlogPost(post: Omit<BlogPost, '_id' | 'createdAt' | 'updatedAt' | 'views' | 'slug'>): Promise<BlogPost | null> {
  initializeData();
  
  const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
  
  const slug = post.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  
  const newPost: BlogPost = {
    ...post,
    _id: generateId(),
    slug,
    createdAt: new Date(),
    updatedAt: new Date(),
    views: 0
  };
  
  posts.unshift(newPost);
  localStorage.setItem('blogPosts', JSON.stringify(posts));
  
  return newPost;
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<boolean> {
  initializeData();
  
  const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
  const index = posts.findIndex((p: BlogPost) => p._id === id);
  
  if (index !== -1) {
    posts[index] = { ...posts[index], ...updates, updatedAt: new Date() };
    localStorage.setItem('blogPosts', JSON.stringify(posts));
    return true;
  }
  
  return false;
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  initializeData();
  
  const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
  const filteredPosts = posts.filter((p: BlogPost) => p._id !== id);
  
  if (filteredPosts.length < posts.length) {
    localStorage.setItem('blogPosts', JSON.stringify(filteredPosts));
    return true;
  }
  
  return false;
}

export async function incrementBlogPostViews(slug: string): Promise<void> {
  // This is handled in getBlogPostBySlug
}

// Contact submission operations
export async function saveContactSubmission(submission: Omit<ContactSubmission, '_id' | 'createdAt' | 'status'>): Promise<ContactSubmission | null> {
  initializeData();
  
  const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
  
  const newSubmission: ContactSubmission = {
    ...submission,
    _id: generateId(),
    createdAt: new Date(),
    status: 'new'
  };
  
  submissions.unshift(newSubmission);
  localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
  
  return newSubmission;
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  initializeData();
  
  return JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
}