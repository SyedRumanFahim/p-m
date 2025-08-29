import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Calendar, MapPin, Building, GraduationCap } from 'lucide-react';

export default function Resume() {
  const experiences = [
    {
      title: 'SQA Engineer',
      company: 'Interlink Techsoft Limited',
      period: 'July 2024 - Present',
      location: 'Dhaka, Bangladesh',
      type: 'Full-time',
      responsibilities: [
        'Working with various projects including Library Management System of Bangla Academy and all District Public Libraries',
        'Testing Document Management System, User Management System, E-Book and E-Clipping management System',
        'Quality assurance for Id Card Management System, Bag Management System, Visitor management System',
        'Implementing comprehensive test strategies for government and institutional projects'
      ],
      skills: ['Manual Testing', 'System Testing', 'Government Projects', 'Documentation']
    },
    {
      title: 'SQA Engineer',
      company: 'TNC Global Limited (SaaS ERP)',
      period: 'April 2024 - June 2024',
      location: 'Dhaka, Bangladesh',
      type: 'Full-time',
      responsibilities: [
        'Testing API, UI/UX, Android and iOS, Web App simultaneously for upcoming SaaS platform',
        'Actively participating in Agile methodology with development team',
        'Guiding junior team members to complete assigned tasks effectively',
        'Cross-platform testing and quality assurance for multi-device compatibility'
      ],
      skills: ['API Testing', 'Mobile Testing', 'Agile', 'Mentoring', 'Cross-platform Testing']
    },
    {
      title: 'Jr. SQA Engineer',
      company: 'Beacontech Limited',
      period: 'March 2023 - March 2024',
      location: 'Dhaka, Bangladesh',
      type: 'Full-time',
      responsibilities: [
        'Working on Merchandising, Procurement, Store, Production, planning, Shipment modules of Beacon ERP',
        'Collaborating with software developers for new features, improvements and bug fixing',
        'Following up and maintaining defect lifecycle with the team',
        'Performing UAT and GUI Testing, conducting user manual sessions',
        'Providing continuous customer support and participating in software implementation for new clients'
      ],
      skills: ['ERP Testing', 'UAT', 'GUI Testing', 'Customer Support', 'Implementation']
    },
    {
      title: 'Trainee SQA Engineer',
      company: 'Beacontech Limited',
      period: 'December 2022 - February 2023',
      location: 'Dhaka, Bangladesh',
      type: 'Internship',
      responsibilities: [
        'Worked on HRMS and Payroll module testing and validation',
        'Participated in requirement analysis and test planning',
        'Prepared comprehensive Test Case documents and performed manual testing',
        'Bug Reporting and Tracking using Trello for efficient defect management',
        'Conducted Regression Testing to ensure system stability'
      ],
      skills: ['HRMS Testing', 'Test Case Design', 'Bug Tracking', 'Regression Testing'],
      achievement: 'Made HRMS and Payroll module stable by helping dev team fix bugs faster by raising them early in SDLC'
    }
  ];

  const handleDownloadResume = () => {
    // This will be implemented with actual PDF generation
    window.open('/resume.pdf', '_blank');
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center animate-in slide-in-from-top duration-700">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Resume</h1>
          <p className="text-xl text-gray-600 mb-8">Professional experience and career timeline</p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={handleDownloadResume}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF Resume
          </Button>
        </div>

        {/* Experience Timeline */}
        <Card className="animate-in slide-in-from-left duration-700 delay-200">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Building className="h-6 w-6 text-blue-600" />
              Professional Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200"></div>
              
              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative pl-12">
                    {/* Timeline Dot */}
                    <div className="absolute left-2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                    
                    <div className="space-y-4">
                      {/* Job Header */}
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                          <Badge variant="secondary">{exp.type}</Badge>
                        </div>
                        <div className="text-lg text-blue-600 font-medium">{exp.company}</div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {exp.period}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {exp.location}
                          </div>
                        </div>
                      </div>

                      {/* Responsibilities */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900">Key Responsibilities:</h4>
                        <ul className="space-y-1">
                          {exp.responsibilities.map((resp, i) => (
                            <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      {/* Achievement */}
                      {exp.achievement && (
                        <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded-r">
                          <p className="text-sm text-green-800 font-medium">
                            <strong>Key Achievement:</strong> {exp.achievement}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Education Section */}
        <Card className="animate-in slide-in-from-right duration-700 delay-300">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-blue-600" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-lg font-semibold text-gray-900">B.Sc. in Software Engineering</h3>
                <p className="text-gray-600">Daffodil International University</p>
                <div className="flex flex-wrap gap-4 text-sm mt-2">
                  <span className="text-gray-500">Graduation: 2022</span>
                  <span className="text-blue-600 font-medium">CGPA: 3.82/4.00</span>
                </div>
              </div>
              
              <div className="border-l-4 border-gray-300 pl-6">
                <h3 className="text-lg font-semibold text-gray-900">Higher Secondary School Certificate</h3>
                <p className="text-gray-600">Govt. Ashek Mahmud College</p>
                <div className="flex flex-wrap gap-4 text-sm mt-2">
                  <span className="text-gray-500">Year: 2016</span>
                  <span className="text-green-600 font-medium">GPA: 5.00/5.00</span>
                </div>
              </div>

              <div className="border-l-4 border-gray-300 pl-6">
                <h3 className="text-lg font-semibold text-gray-900">Secondary School Certificate</h3>
                <p className="text-gray-600">Hashil Girls High School</p>
                <div className="flex flex-wrap gap-4 text-sm mt-2">
                  <span className="text-gray-500">Year: 2014</span>
                  <span className="text-green-600 font-medium">GPA: 5.00/5.00</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Download CTA */}
        <div className="text-center py-8 animate-in slide-in-from-bottom duration-700 delay-400">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={handleDownloadResume}>
            <Download className="mr-2 h-4 w-4" />
            Download Complete Resume
          </Button>
        </div>
      </div>
    </div>
  );
}