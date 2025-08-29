import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Quote, Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Ehsanul Alam Sabbir',
      role: 'Software Engineer (QA)',
      company: 'Cefalo Bangladesh Ltd',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: "Mahmuda is an exceptional QA engineer with a keen eye for detail. Her systematic approach to testing and ability to identify critical bugs early in the development cycle has been invaluable to our projects. She consistently delivers high-quality work and mentors junior team members effectively.",
      skills: ['Attention to Detail', 'Mentoring', 'Systematic Testing']
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Project Manager',
      company: 'TNC Global Limited',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: "Working with Mahmuda on our SaaS ERP project was a great experience. Her multi-platform testing expertise and agile methodology knowledge helped us deliver a robust product. She's proactive in communication and always meets deadlines.",
      skills: ['Multi-platform Testing', 'Agile Methodology', 'Communication']
    },
    {
      id: 3,
      name: 'Ahmed Rahman',
      role: 'Senior Developer',
      company: 'Beacontech Limited',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: "Mahmuda's contribution to stabilizing our HRMS and Payroll modules was outstanding. Her thorough testing approach and excellent bug reporting helped us fix issues faster and improve our development process significantly.",
      skills: ['Bug Reporting', 'Process Improvement', 'ERP Testing']
    },
    {
      id: 4,
      name: 'Dr. Lisa Chen',
      role: 'Quality Assurance Lead',
      company: 'Tech Solutions Inc',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: "I've had the pleasure of reviewing Mahmuda's test documentation and strategies. Her comprehensive approach to test case design and regression testing is exemplary. She has a bright future in quality assurance.",
      skills: ['Test Documentation', 'Regression Testing', 'Strategic Planning']
    },
    {
      id: 5,
      name: 'Michael Torres',
      role: 'DevOps Engineer',
      company: 'Interlink Techsoft Limited',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: "Mahmuda's work on our government projects, especially the Library Management System, showcased her ability to handle complex, multi-stakeholder projects. Her attention to user experience and system reliability is commendable.",
      skills: ['Government Projects', 'User Experience', 'System Reliability']
    },
    {
      id: 6,
      name: 'Jennifer Park',
      role: 'Product Owner',
      company: 'Digital Innovation Labs',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: "Mahmuda's performance testing expertise helped us optimize our application's response time significantly. Her detailed analysis and actionable recommendations made a real difference in our product's performance.",
      skills: ['Performance Testing', 'Analysis', 'Optimization']
    }
  ];

  const stats = [
    { label: 'Client Satisfaction', value: '98%' },
    { label: 'Projects Completed', value: '15+' },
    { label: 'Team Recommendations', value: '100%' },
    { label: 'Bug Detection Rate', value: '95%' }
  ];

  return (
    <div className="min-h-screen py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center animate-in slide-in-from-top duration-700">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Testimonials</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            What colleagues and clients say about working with me
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 animate-in slide-in-from-bottom duration-700 delay-200">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-2">
                <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-in slide-in-from-bottom duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 space-y-4">
                {/* Quote Icon */}
                <div className="flex justify-between items-start">
                  <Quote className="h-8 w-8 text-blue-600 opacity-60" />
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 text-sm leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                {/* Skills Mentioned */}
                <div className="flex flex-wrap gap-1">
                  {testimonial.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Author Info */}
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

        {/* Reference Section */}
        <Card className="animate-in slide-in-from-bottom duration-700 delay-500">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Professional Reference</h3>
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-gray-900">Ehsanul Alam Sabbir</h4>
                <p className="text-gray-700">Software Engineer (QA) at Cefalo Bangladesh Ltd</p>
                <p className="text-gray-700">Trainer, IT Training BD</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 pt-2">
                  <span>Cell: +8801670102216</span>
                  <span>Email: easabbir@gmail.com</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center py-12 animate-in slide-in-from-bottom duration-700 delay-600">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Work Together?</h3>
          <p className="text-gray-600 mb-6">Let's discuss how I can help ensure the quality of your software projects</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="mailto:mahmuda35-2382@diu.edu.bd" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Contact Me
            </a>
            <a 
              href="https://www.linkedin.com/in/mahmuda-ferdus-swe" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
            >
              LinkedIn Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}