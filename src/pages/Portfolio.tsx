import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ExternalLink, Github, FileText, Bug, TestTube, BarChart3 } from 'lucide-react';

export default function Portfolio() {
  const projects = [
    {
      id: 1,
      title: 'Library Management System Testing',
      description: 'Comprehensive testing of Bangla Academy Library Management System covering all district public libraries. Performed end-to-end testing including user management, book cataloging, and circulation modules.',
      category: 'Web Application Testing',
      tools: ['Manual Testing', 'API Testing', 'Regression Testing', 'UAT'],
      achievements: [
        'Identified 50+ critical bugs before production',
        'Reduced system downtime by 30%',
        'Improved user experience through comprehensive UI testing'
      ],
      icon: <FileText className="h-6 w-6" />,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'TNC Global SaaS ERP Testing Suite',
      description: 'Complete testing framework for multi-platform SaaS ERP solution including API, UI/UX, Android, iOS, and Web applications. The platform is all in one place for Buyer, Merchandiser, Consumer, Vendor etc.',
      category: 'Multi-Platform Testing',
      tools: ['Selenium', 'API Testing', 'Mobile Testing', 'Postman', 'Agile'],
      achievements: [
        'Automated 80% of regression test cases',
        'Reduced testing cycle time by 40%',
        'Mentored junior QA engineers'
      ],
      icon: <TestTube className="h-6 w-6" />,
      color: 'bg-green-500'
    },
    {
      id: 3,
      title: 'Beacon ERP',
      description: 'End-to-end testing of enterprise resource planning modules including HRMS, Payroll, Merchandising, Procurement, Store, Production, Planning, and Shipment. Collaborated with development team for continuous improvement.',
      category: 'Enterprise Software Testing',
      tools: ['Manual Testing', 'GUI Testing', 'UAT', 'Defect Tracking', 'Trello'],
      achievements: [
        'Stabilized HRMS and Payroll modules',
        'Implemented efficient bug tracking system',
        'Conducted user training sessions'
      ],
      icon: <BarChart3 className="h-6 w-6" />,
      color: 'bg-purple-500'
    }
    // {
    //   id: 4,
    //   title: 'Performance Testing Framework',
    //   description: 'Developed comprehensive performance testing strategies using JMeter for load testing, stress testing, and scalability analysis of web applications under various load conditions.',
    //   category: 'Performance Testing',
    //   tools: ['JMeter', 'Performance Testing', 'Load Testing', 'Stress Testing'],
    //   achievements: [
    //     'Identified performance bottlenecks',
    //     'Optimized system response time by 35%',
    //     'Created reusable performance test scripts'
    //   ],
    //   icon: <BarChart3 className="h-6 w-6" />,
    //   color: 'bg-orange-500'
    // },
    // {
    //   id: 5,
    //   title: 'API Testing Automation',
    //   description: 'Comprehensive API testing suite using Postman and custom automation scripts. Validated REST APIs, data integrity, error handling, and security aspects across multiple microservices.',
    //   category: 'API Testing',
    //   tools: ['Postman', 'API Testing', 'Automation', 'JSON', 'REST'],
    //   achievements: [
    //     'Automated 90% of API test cases',
    //     'Improved API reliability by 45%',
    //     'Created comprehensive API documentation'
    //   ],
    //   icon: <TestTube className="h-6 w-6" />,
    //   color: 'bg-indigo-500'
    // },
    // {
    //   id: 6,
    //   title: 'Test Strategy Documentation',
    //   description: 'Developed comprehensive test strategies, test plans, and documentation frameworks for various projects. Created standardized testing procedures and quality gates.',
    //   category: 'Test Documentation',
    //   tools: ['Test Planning', 'Documentation', 'Quality Gates', 'Process Improvement'],
    //   achievements: [
    //     'Standardized testing processes across teams',
    //     'Reduced onboarding time for new QA engineers',
    //     'Improved test coverage by 60%'
    //   ],
    //   icon: <FileText className="h-6 w-6" />,
    //   color: 'bg-teal-500'
    // }
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Web Application Testing', 'Multi-Platform Testing', 'Enterprise Software Testing', 'Performance Testing', 'API Testing', 'Test Documentation'];

  const filteredProjects = projects.filter(project => 
    selectedCategory === 'All' || project.category === selectedCategory
  );

  return (
    <div className="min-h-screen py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center animate-in slide-in-from-top duration-700">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Portfolio</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Showcase of quality assurance projects, testing strategies, and automation frameworks
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 animate-in slide-in-from-top duration-700 delay-200">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`${selectedCategory === category ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-blue-50'} transition-all duration-200`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card 
              key={project.id} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-in slide-in-from-bottom duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg ${project.color} text-white`}>
                    {project.icon}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {project.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                  {project.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tools Used */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900">Tools & Technologies:</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.tools.map((tool) => (
                      <Badge key={tool} variant="outline" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Key Achievements */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900">Key Achievements:</h4>
                  <ul className="space-y-1">
                    {project.achievements.map((achievement, i) => (
                      <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" className="flex-1">
                        <FileText className="h-3 w-3 mr-2" />
                        Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <div className={`p-2 rounded-lg ${project.color} text-white`}>
                            {project.icon}
                          </div>
                          {project.title}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div>
                          <Badge variant="secondary" className="mb-3">
                            {project.category}
                          </Badge>
                          <p className="text-gray-700 leading-relaxed">
                            {project.description}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Tools & Technologies:</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.tools.map((tool) => (
                              <Badge key={tool} variant="outline">
                                {tool}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Key Achievements:</h4>
                          <ul className="space-y-2">
                            {project.achievements.map((achievement, i) => (
                              <li key={i} className="text-gray-700 flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex gap-2 pt-4 border-t">
                          <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Demo
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Github className="h-4 w-4 mr-2" />
                            Source Code
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button size="sm" variant="outline" className="flex-1">
                    <ExternalLink className="h-3 w-3 mr-2" />
                    Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center py-12 animate-in slide-in-from-bottom duration-700 delay-500">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Interested in My Work?</h3>
          <p className="text-gray-600 mb-6">Let's discuss how I can help ensure the quality of your software projects</p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Get In Touch
          </Button>
        </div>
      </div>
    </div>
  );
}