import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  Clock, 
  User, 
  Eye, 
  ArrowLeft, 
  ArrowRight,
  Share2,
  Bookmark
} from 'lucide-react';
import { BlogPost as BlogPostType, getBlogPostBySlug, incrementBlogPostViews } from '@/lib/api';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setError('Post not found');
        setLoading(false);
        return;
      }

      try {
        const fetchedPost = await getBlogPostBySlug(slug);
        if (fetchedPost) {
          setPost(fetchedPost);
          // Increment view count
          await incrementBlogPostViews(slug);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        setError('Failed to load post');
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">{error || 'The requested blog post could not be found.'}</p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="animate-in slide-in-from-left duration-500">
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        {/* Article Header */}
        <Card className="animate-in slide-in-from-top duration-700">
          <CardContent className="p-8 space-y-6">
            {/* Category and Status */}
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800">
                {post.category}
              </Badge>
              {post.status === 'draft' && (
                <Badge variant="secondary">Draft</Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{estimateReadTime(post.content)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{post.views} views</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4 border-t">
              <Button size="sm" variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button size="sm" variant="outline">
                <Bookmark className="mr-2 h-4 w-4" />
                Bookmark
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Featured Image Placeholder */}
        <Card className="animate-in slide-in-from-top duration-700 delay-200">
          <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-blue-200 rounded-lg mx-auto flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
              <p className="text-sm text-gray-600">Featured Image</p>
            </div>
          </div>
        </Card>

        {/* Article Content */}
        <Card className="animate-in slide-in-from-bottom duration-700 delay-300">
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed space-y-6">
                {post.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-base leading-7">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Article Footer */}
        <Card className="animate-in slide-in-from-bottom duration-700 delay-400">
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-600">MF</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{post.author}</h3>
                  <p className="text-gray-600">SQA Engineer & Quality Assurance Expert</p>
                  <p className="text-sm text-gray-500">
                    Passionate about ensuring software excellence through comprehensive testing strategies.
                  </p>
                </div>
              </div>

              <Separator />

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <Button variant="outline" asChild>
                  <Link to="/blog">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    All Posts
                  </Link>
                </Button>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Article
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Posts Section */}
        <Card className="animate-in slide-in-from-bottom duration-700 delay-500">
          <CardContent className="p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Related Articles</h3>
            <div className="text-center py-8 text-gray-500">
              <p>More related articles coming soon...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}