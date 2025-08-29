import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Search, User, ArrowRight } from 'lucide-react';
import { BlogPost, getBlogPosts } from '@/lib/api';

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Sample blog posts for fallback
  const sampleBlogPosts = [
    {
      id: 1,
      title: 'Essential API Testing Strategies for Modern Applications',
      excerpt: 'Learn comprehensive approaches to API testing including validation techniques, security testing, and performance optimization for robust backend services.',
      content: 'API testing is crucial for ensuring the reliability and security of modern applications...',
      author: 'Mahmuda Ferdus',
      date: '2024-08-15',
      readTime: '8 min read',
      category: 'API Testing',
      tags: ['API', 'Testing', 'Automation', 'Best Practices'],
      image: '/api/placeholder/400/200'
    },
    {
      id: 2,
      title: 'Mastering Selenium WebDriver: Advanced Techniques',
      excerpt: 'Deep dive into advanced Selenium WebDriver techniques including page object model, data-driven testing, and cross-browser automation.',
      content: 'Selenium WebDriver is a powerful tool for web automation...',
      author: 'Mahmuda Ferdus',
      date: '2024-08-10',
      readTime: '12 min read',
      category: 'Automation',
      tags: ['Selenium', 'WebDriver', 'Automation', 'Java'],
      image: '/api/placeholder/400/200'
    },
    {
      id: 3,
      title: 'Performance Testing with JMeter: A Complete Guide',
      excerpt: 'Comprehensive guide to performance testing using Apache JMeter, covering load testing, stress testing, and result analysis.',
      content: 'Performance testing is essential for ensuring applications can handle expected load...',
      author: 'Mahmuda Ferdus',
      date: '2024-08-05',
      readTime: '15 min read',
      category: 'Performance Testing',
      tags: ['JMeter', 'Performance', 'Load Testing', 'Optimization'],
      image: '/api/placeholder/400/200'
    },
    {
      id: 4,
      title: 'Agile Testing: Best Practices for QA in Scrum Teams',
      excerpt: 'How to effectively integrate quality assurance practices in Agile development environments while maintaining speed and quality.',
      content: 'Agile methodology has transformed how we approach software development...',
      author: 'Mahmuda Ferdus',
      date: '2024-07-30',
      readTime: '10 min read',
      category: 'Agile Testing',
      tags: ['Agile', 'Scrum', 'QA Process', 'Team Collaboration'],
      image: '/api/placeholder/400/200'
    },
    {
      id: 5,
      title: 'Building Effective Test Documentation',
      excerpt: 'Learn how to create comprehensive test documentation that improves team collaboration and ensures consistent testing practices.',
      content: 'Good test documentation is the foundation of successful QA processes...',
      author: 'Mahmuda Ferdus',
      date: '2024-07-25',
      readTime: '6 min read',
      category: 'Test Management',
      tags: ['Documentation', 'Test Cases', 'Process', 'Standards'],
      image: '/api/placeholder/400/200'
    },
    {
      id: 6,
      title: 'Mobile App Testing: iOS and Android Best Practices',
      excerpt: 'Comprehensive approach to mobile application testing covering device compatibility, performance, and user experience validation.',
      content: 'Mobile app testing presents unique challenges and opportunities...',
      author: 'Mahmuda Ferdus',
      date: '2024-07-20',
      readTime: '11 min read',
      category: 'Mobile Testing',
      tags: ['Mobile', 'iOS', 'Android', 'UX Testing'],
      image: '/api/placeholder/400/200'
    }
  ];

  const categories = ['All', 'API Testing', 'Automation', 'Performance Testing', 'Agile Testing', 'Test Management', 'Mobile Testing'];

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const posts = await getBlogPosts({ status: 'published' });
        if (posts.length > 0) {
          setBlogPosts(posts);
        } else {
          // Use sample data if no posts in database
          setBlogPosts(sampleBlogPosts);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        // Use sample data as fallback
        setBlogPosts(sampleBlogPosts);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center animate-in slide-in-from-top duration-700">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">QA Knowledge Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Sharing insights, best practices, and lessons learned in software quality assurance
          </p>
        </div>

        {/* Search and Filter */}
        <div className="space-y-6 animate-in slide-in-from-top duration-700 delay-200">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-blue-50'}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <Card className="animate-in slide-in-from-left duration-700 delay-300">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-blue-200 rounded-lg mx-auto flex items-center justify-center">
                    <span className="text-xl font-bold text-blue-600">📝</span>
                  </div>
                  <p className="text-sm text-gray-600">Featured Article</p>
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                <Badge className="bg-blue-100 text-blue-800">{filteredPosts[0].category}</Badge>
                <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                  {filteredPosts[0].title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {filteredPosts[0].excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {filteredPosts[0].author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(filteredPosts[0].date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {filteredPosts[0].readTime}
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                  <Link to={`/blog/${filteredPosts[0].slug || filteredPosts[0]._id}`}>
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </div>
          </Card>
        )}

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.slice(1).map((post, index) => (
            <Card 
              key={post.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-in slide-in-from-bottom duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-gray-300 rounded-lg mx-auto flex items-center justify-center">
                    <span className="text-lg">📄</span>
                  </div>
                  <p className="text-xs text-gray-600">Article Image</p>
                </div>
              </div>
              
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {post.category}
                  </Badge>
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="text-xs text-gray-500">
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700" asChild>
                    <Link to={`/blog/${post.slug || post._id}`}>
                      Read More
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filter criteria.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center py-12 animate-in slide-in-from-bottom duration-700 delay-500">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Want to stay updated?</h3>
          <p className="text-gray-600 mb-6">Get notified when I publish new articles about QA and testing</p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Subscribe to Newsletter
          </Button>
        </div>
      </div>
    </div>
  );
}