import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  Eye, 
  Calendar, 
  User,
  BarChart3,
  FileText,
  MessageSquare,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { 
  BlogPost, 
  getBlogPosts, 
  createBlogPost, 
  updateBlogPost, 
  deleteBlogPost,
  getContactSubmissions,
  ContactSubmission,
  getNewsletterSubscribers,
  NewsletterSubscriber
} from '@/lib/api';

export default function Admin() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [newsletterSubscriber, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    status: 'draft' as 'draft' | 'published'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [posts, submissions, subscribers] = await Promise.all([
          getBlogPosts(),
          getContactSubmissions(),
          getNewsletterSubscribers()
        ]);
        setBlogPosts(posts);
        setContactSubmissions(submissions);
        setSubscribers(subscribers);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        setSubmitStatus({ type: 'error', message: 'Failed to load data' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    { 
      label: 'Total Posts', 
      value: blogPosts.length.toString(), 
      icon: <FileText className="h-5 w-5" /> 
    },
    { 
      label: 'Published', 
      value: blogPosts.filter(post => post.status === 'published').length.toString(), 
      icon: <Eye className="h-5 w-5" /> 
    },
    { 
      label: 'Total Views', 
      value: blogPosts.reduce((sum, post) => sum + (post.views || 0), 0).toString(), 
      icon: <BarChart3 className="h-5 w-5" /> 
    },
    { 
      label: 'Contact Messages', 
      value: contactSubmissions.length.toString(), 
      icon: <MessageSquare className="h-5 w-5" /> 
    }
  ];

  const handleCreatePost = async () => {
    try {
      const postData = {
        title: newPost.title,
        excerpt: newPost.excerpt,
        content: newPost.content,
        author: 'Mahmuda Ferdus',
        category: newPost.category,
        tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        status: newPost.status
      };

      const createdPost = await createBlogPost(postData);
      
      if (createdPost) {
        setBlogPosts(prev => [createdPost, ...prev]);
        setNewPost({
          title: '',
          excerpt: '',
          content: '',
          category: '',
          tags: '',
          status: 'draft'
        });
        setSubmitStatus({ type: 'success', message: 'Blog post created successfully!' });
      } else {
        setSubmitStatus({ type: 'error', message: 'Failed to create blog post' });
      }
    } catch (error) {
      console.error('Error creating post:', error);
      setSubmitStatus({ type: 'error', message: 'Failed to create blog post' });
    }

    setTimeout(() => setSubmitStatus({ type: null, message: '' }), 3000);
  };

  const handleEditPost = (post: BlogPost) => {
    setSelectedPost(post);
    setIsEditing(true);
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const success = await deleteBlogPost(postId);
      if (success) {
        setBlogPosts(prev => prev.filter(post => post._id !== postId));
        setSubmitStatus({ type: 'success', message: 'Post deleted successfully!' });
      } else {
        setSubmitStatus({ type: 'error', message: 'Failed to delete post' });
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      setSubmitStatus({ type: 'error', message: 'Failed to delete post' });
    }

    setTimeout(() => setSubmitStatus({ type: null, message: '' }), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-24"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="animate-in slide-in-from-top duration-700">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your blog posts and content</p>
        </div>

        {/* Status Messages */}
        {submitStatus.type && (
          <div className={`flex items-center gap-2 p-3 rounded-md ${
            submitStatus.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-700' 
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {submitStatus.type === 'success' ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <span className="text-sm">{submitStatus.message}</span>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 animate-in slide-in-from-top duration-700 delay-200">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="posts" className="animate-in slide-in-from-bottom duration-700 delay-300">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts">Manage Posts</TabsTrigger>
            <TabsTrigger value="create">Create New Post</TabsTrigger>
            <TabsTrigger value="contacts">Contact Messages</TabsTrigger>
            <TabsTrigger value="subscribers">Newsletter Subscribers</TabsTrigger>
          </TabsList>

          {/* Manage Posts Tab */}
          <TabsContent value="posts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Blog Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blogPosts.map((post) => (
                    <div key={post._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900">{post.title}</h3>
                            <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                              {post.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{post.excerpt}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {post.views || 0} views
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {post.author}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditPost(post)}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeletePost(post._id!)}>
                            <Trash2 className="h-3 w-3 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {blogPosts.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p>No blog posts found. Create your first post!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Create New Post Tab */}
          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Blog Post</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => { e.preventDefault(); handleCreatePost(); }} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Post Title</Label>
                    <Input
                      id="title"
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      placeholder="Enter post title..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={newPost.excerpt}
                      onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                      placeholder="Brief description of the post..."
                      className="min-h-[80px]"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={newPost.category} onValueChange={(value) => setNewPost({ ...newPost, category: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="API Testing">API Testing</SelectItem>
                          <SelectItem value="Automation">Automation</SelectItem>
                          <SelectItem value="Performance Testing">Performance Testing</SelectItem>
                          <SelectItem value="Agile Testing">Agile Testing</SelectItem>
                          <SelectItem value="Test Management">Test Management</SelectItem>
                          <SelectItem value="Mobile Testing">Mobile Testing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select value={newPost.status} onValueChange={(value: 'draft' | 'published') => setNewPost({ ...newPost, status: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      value={newPost.tags}
                      onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                      placeholder="Enter tags separated by commas..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                      placeholder="Write your blog post content here..."
                      className="min-h-[300px]"
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      <Save className="mr-2 h-4 w-4" />
                      Save Post
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setNewPost({
                      title: '',
                      excerpt: '',
                      content: '',
                      category: '',
                      tags: '',
                      status: 'draft'
                    })}>
                      Clear Form
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Messages Tab */}
          <TabsContent value="contacts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contactSubmissions.map((submission) => (
                    <div key={submission._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h3 className="font-semibold text-gray-900">{submission.subject}</h3>
                            <p className="text-sm text-gray-600">From: {submission.name} ({submission.email})</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={submission.status === 'new' ? 'default' : 'secondary'}>
                              {submission.status}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {new Date(submission.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                          {submission.message}
                        </p>
                      </div>
                    </div>
                  ))}
                  {contactSubmissions.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p>No contact messages found.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* News Letter Subscribers Tab */}
          <TabsContent value="subscribers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Newsletter Subscribers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {newsletterSubscriber.map((subscribers) => (
                    <div key={subscribers._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h3 className="font-semibold text-gray-900">{subscribers.status}</h3>
                            <p className="text-sm text-gray-600">Email: {subscribers.email}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {/* <Badge variant={submission.status === 'new' ? 'default' : 'secondary'}>
                              {submission.status}
                            </Badge> */}
                            <span className="text-xs text-gray-500">
                              {new Date(subscribers.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        {/* <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                          {submission.message}
                        </p> */}
                      </div>
                    </div>
                  ))}
                  {contactSubmissions.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p>No Newsletter Subscribers found.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}