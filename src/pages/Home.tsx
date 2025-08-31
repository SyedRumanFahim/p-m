import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Newsletter from '@/components/Newsletter';
import { 
  Download, Mail, Phone, MapPin, Linkedin, Github, Play, 
  Calendar, Building, GraduationCap, Quote, Star, 
  ExternalLink, FileText, TestTube, BarChart3,
  ArrowRight, User, Clock, PlayCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Home() {
  const [showVideo, setShowVideo] = useState(false);
  
  // Add your YouTube video ID here (the part after v= in the YouTube URL)
  const youtubeVideoId = "5XChTz6egwQ?si=V-ULqHzJ2ho5801n"; 

  const skills = [
    'Manual Testing', 'Automation Testing', 'API Testing', 'Performance Testing',
    'Selenium', 'JMeter', 'Postman', 'Java', 'SQL', 'Agile', 'SDLC'
  ];

  const technicalSkills = [
    { name: 'Manual Testing', level: 95 },
    { name: 'Automation Testing', level: 85 },
    { name: 'API Testing', level: 90 },
    { name: 'Performance Testing', level: 80 },
    { name: 'Selenium WebDriver', level: 85 },
    { name: 'Java', level: 75 }
  ];

  const experiences = [
    {
      title: 'SQA Engineer',
      company: 'Interlink Techsoft Limited',
      period: 'July 2024 - Present',
      type: 'Full-time'
    },
    {
      title: 'SQA Engineer',
      company: 'TNC Global Limited (SaaS ERP)',
      period: 'April 2024 - June 2024',
      type: 'Full-time'
    },
    {
      title: 'Jr. SQA Engineer',
      company: 'Beacontech Limited',
      period: 'March 2023 - March 2024',
      type: 'Full-time'
    }
  ];

  const featuredProjects = [
    {
      id: 1,
      title: 'Library Management System Testing',
      description: 'Comprehensive testing of Bangla Academy Library Management System covering all district public libraries.',
      category: 'Web Application Testing',
      tools: ['Manual Testing', 'API Testing', 'Regression Testing', 'UAT'],
      icon: <FileText className="h-6 w-6" />,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'SaaS ERP Testing Suite',
      description: 'Complete testing framework for multi-platform SaaS ERP solution including API, UI/UX, Android, iOS, and Web applications.',
      category: 'Multi-Platform Testing',
      tools: ['Selenium', 'API Testing', 'Mobile Testing', 'Postman', 'Agile'],
      icon: <TestTube className="h-6 w-6" />,
      color: 'bg-green-500'
    },
    {
      id: 3,
      title: 'Performance Testing Framework',
      description: 'Developed comprehensive performance testing strategies using JMeter for load testing and scalability analysis.',
      category: 'Performance Testing',
      tools: ['JMeter', 'Performance Testing', 'Load Testing', 'Stress Testing'],
      icon: <BarChart3 className="h-6 w-6" />,
      color: 'bg-orange-500'
    }
  ];

  const testimonials = [
    {
      name: 'Ehsanul Alam Sabbir',
      role: 'Software Engineer (QA)',
      company: 'Cefalo Bangladesh Ltd',
      text: "Mahmuda is an exceptional QA engineer with a keen eye for detail. Her systematic approach to testing has been invaluable to our projects.",
      rating: 5
    },
    {
      name: 'Sarah Johnson',
      role: 'Project Manager',
      company: 'TNC Global Limited',
      text: "Working with Mahmuda on our SaaS ERP project was a great experience. Her multi-platform testing expertise helped us deliver a robust product.",
      rating: 5
    }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'Essential API Testing Strategies for Modern Applications',
      excerpt: 'Learn comprehensive approaches to API testing including validation techniques, security testing, and performance optimization.',
      author: 'Mahmuda Ferdus',
      date: '2024-08-15',
      readTime: '8 min read',
      category: 'API Testing'
    },
    {
      id: 2,
      title: 'Mastering Selenium WebDriver: Advanced Techniques',
      excerpt: 'Deep dive into advanced Selenium WebDriver techniques including page object model and cross-browser automation.',
      author: 'Mahmuda Ferdus',
      date: '2024-08-10',
      readTime: '12 min read',
      category: 'Automation'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 px-4 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-indigo-100 rounded-full opacity-20 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Content - Personal Info */}
            <div className="space-y-6 animate-in slide-in-from-left duration-700 order-2 lg:order-1">
              <div className="space-y-4">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                  🚀 Available for Opportunities
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Mahmuda Ferdus
                </h1>
                <h2 className="text-xl lg:text-2xl text-gray-700 font-medium">
                  SQA Engineer | Quality Assurance Specialist
                </h2>
                <p className="text-base text-gray-600 leading-relaxed">
                  Ensuring software excellence through comprehensive testing strategies, 
                  automation frameworks, and quality assurance methodologies with 2+ years of experience.
                </p>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 shadow-md hover:shadow-lg transition-all" asChild>
                  <Link to="/contact">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Me
                  </Link>
                </Button>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col gap-3 pt-2">
                <div className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">+8801823653263</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">mahmuda35-2382@diu.edu.bd</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">Dhaka, Bangladesh</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-2 pt-2">
                <Button variant="ghost" size="sm" className="hover:bg-blue-100 transition-all" asChild>
                  <a href="https://www.linkedin.com/in/mahmuda-ferdus-swe" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5 text-blue-600" />
                  </a>
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-gray-100 transition-all" asChild>
                  <a href="https://github.com/MahmudaFerdusMim" target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5 text-gray-700" />
                  </a>
                </Button>
              </div>
              {/* Quick Highlights */}
              <div className="grid grid-cols-2 gap-3">
                <Card className="bg-blue-50 border-blue-200 hover:shadow-lg transition-all">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">2+</div>
                    <div className="text-xs text-gray-600">Years Experience</div>
                  </CardContent>
                </Card>
                <Card className="bg-indigo-50 border-indigo-200 hover:shadow-lg transition-all">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-indigo-600">10+</div>
                    <div className="text-xs text-gray-600">Projects Tested</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Content - Photo and Video */}
            <div className="space-y-6 animate-in slide-in-from-right duration-700 delay-200 order-1 lg:order-2">
              {/* Professional Photo */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <Card className="relative overflow-hidden shadow-2xl border-0 bg-white/90 backdrop-blur">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src="/formal.jpeg" 
                        alt="Mahmuda Ferdus - SQA Engineer"
                        className="w-full h-auto rounded-t-lg"
                        style={{ maxHeight: '450px' }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <p className="text-white font-semibold text-lg">Mahmuda Ferdus</p>
                        <p className="text-white/90 text-sm">SQA Engineer</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Video Resume */}
              <Card className="relative overflow-hidden shadow-xl border-0 bg-gradient-to-br from-blue-600 to-indigo-600 text-white group hover:shadow-2xl transition-all">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold flex items-center gap-2">
                          <PlayCircle className="h-5 w-5" />
                          Video Resume
                        </h3>
                        <p className="text-sm text-white/80 mt-1">
                          2-minute introduction
                        </p>
                      </div>
                      <div className="bg-white/20 rounded-full p-3 group-hover:bg-white/30 transition-colors">
                        <Play className="h-6 w-6" />
                      </div>
                    </div>
                    
                    {!showVideo ? (
                      <Button 
                        onClick={() => setShowVideo(true)}
                        className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Watch Video Resume
                      </Button>
                    ) : (
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`}
                          title="Video Resume - Mahmuda Ferdus"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        ></iframe>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center animate-in slide-in-from-bottom duration-700">
              <div className="text-3xl font-bold text-blue-600 mb-2">2+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="text-center animate-in slide-in-from-bottom duration-700 delay-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
              <div className="text-gray-600">Projects Tested</div>
            </div>
            <div className="text-center animate-in slide-in-from-bottom duration-700 delay-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Test Cases</div>
            </div>
            <div className="text-center animate-in slide-in-from-bottom duration-700 delay-300">
              <div className="text-3xl font-bold text-blue-600 mb-2">3.82</div>
              <div className="text-gray-600">CGPA</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">About Me</h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Passionate SQA Engineer with expertise in ensuring software quality through comprehensive testing strategies
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Skills Preview */}
            <Card className="animate-in slide-in-from-left duration-700">
              <CardHeader>
                <CardTitle className="text-xl">Technical Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {technicalSkills.map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                      <span className="text-sm text-gray-500">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Career Objective */}
            <Card className="animate-in slide-in-from-right duration-700">
              <CardHeader>
                <CardTitle className="text-xl">Career Objective</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  To utilize my expertise in software quality assurance, gained through diverse experience in testing various applications 
                  and collaborating within Agile teams. I want to contribute effectively to the success of projects I am involved in.
                </p>
                <Button variant="outline" asChild>
                  <Link to="/about">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Featured Projects</h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Showcase of quality assurance projects and testing strategies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-in slide-in-from-bottom duration-700" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg ${project.color} text-white`}>
                      {project.icon}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.tools.slice(0, 3).map((tool) => (
                      <Badge key={tool} variant="outline" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" asChild>
              <Link to="/portfolio">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Experience Timeline Preview */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Professional Experience</h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Career journey in software quality assurance
            </p>
          </div>

          <Card className="animate-in slide-in-from-bottom duration-700">
            <CardContent className="p-8">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200"></div>
                
                <div className="space-y-8">
                  {experiences.map((exp, index) => (
                    <div key={index} className="relative pl-12">
                      <div className="absolute left-2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                      
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-lg font-bold text-gray-900">{exp.title}</h4>
                          <Badge variant="secondary">{exp.type}</Badge>
                        </div>
                        <div className="text-blue-600 font-medium">{exp.company}</div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          {exp.period}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button variant="outline" asChild>
              <Link to="/resume">
                View Complete Resume
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">What Colleagues Say</h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Professional testimonials from team members and clients
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="animate-in slide-in-from-bottom duration-700" style={{ animationDelay: `${index * 200}ms` }}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <Quote className="h-8 w-8 text-blue-600 opacity-60" />
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-sm leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="border-t pt-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{testimonial.name}</div>
                      <div className="text-xs text-gray-600">{testimonial.role}</div>
                      <div className="text-xs text-blue-600">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" asChild>
              <Link to="/testimonials">
                View All Testimonials
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Latest Blog Posts</h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Sharing insights and knowledge about software quality assurance
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-in slide-in-from-bottom duration-700" style={{ animationDelay: `${index * 200}ms` }}>
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
                  
                  <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                    {post.title}
                  </h4>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <User className="h-3 w-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" asChild>
              <Link to="/blog">
                Read All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Let's Work Together</h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Ready to ensure the quality of your software projects? Let's discuss how I can help.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link to="/contact">
                <Mail className="mr-2 h-4 w-4" />
                Get In Touch
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 pt-8">
            <div className="text-center space-y-2">
              <Mail className="h-8 w-8 text-blue-600 mx-auto" />
              <div className="font-medium">Email</div>
              <div className="text-sm text-gray-600">mahmuda35-2382@diu.edu.bd</div>
            </div>
            <div className="text-center space-y-2">
              <Phone className="h-8 w-8 text-blue-600 mx-auto" />
              <div className="font-medium">Phone</div>
              <div className="text-sm text-gray-600">+8801823653263</div>
            </div>
            <div className="text-center space-y-2">
              <MapPin className="h-8 w-8 text-blue-600 mx-auto" />
              <div className="font-medium">Location</div>
              <div className="text-sm text-gray-600">Dhaka, Bangladesh</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h3>
            <p className="text-lg text-gray-600">
              Subscribe to get the latest insights on software testing and quality assurance
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <Newsletter />
          </div>
        </div>
      </section>
    </div>
  );
}