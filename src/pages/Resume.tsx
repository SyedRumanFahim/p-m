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
        'Worked on multiple projects including Library Management System, Document Management System, E-Book & E-Clipping Management System, Visitor Management System, Kiosk Software, Internal office chat application, Task Management System, etc',
        'Conducted manual and API testing to ensure functionality, usability, and performance.',
        'Collaborated with cross-functional teams to identify and resolve defects in a timely manner.',
        'Participated in Agile ceremonies and contributed to sprint planning and quality deliverables.'
      ],
      skills: ['Library Management System', 'Document Management System', 'E-Book & E-Clipping', 'Visitor Management System', 'Kiosk Software', 'Internal office chat application', 'Task Management System']
    },
    {
      title: 'SQA Engineer',
      company: 'TNC Global Limited (SaaS ERP)',
      period: 'April 2024 - June 2024',
      location: 'Dhaka, Bangladesh',
      type: 'Full-time',
      responsibilities: [
        'Performed manual and API testing for SaaS ERP across Web and Android platforms.',
        'Conducted UI/UX validation to ensure smooth user experience across applications.',
        'Actively participated in Agile methodology including sprint reviews and retrospectives',
        'Guided junior team members to improve testing efficiency and task completion'
      ],
      skills: ['TNC Saas ERP']
    },
    {
      title: 'Jr. SQA Engineer',
      company: 'Beacontech Limited',
      period: 'March 2023 - March 2024',
      location: 'Dhaka, Bangladesh',
      type: 'Full-time',
      responsibilities: [
        'Beacon ERP: Tested Beacon ERP modules: Merchandising, Procurement, Store, Production, Planning, and Shipment',
        'Collaborated with developers to verify new features, enhancements, and bug fixes.',
        'Tracked and maintained the defect lifecycle using QA tools.',
        'Conducted UAT and GUI testing to validate system functionality',
        'Delivered training sessions and user manual walkthroughs to clients',
        'Provided continuous customer support and participated in client software implementations.'
      ],
      skills: ['Beacon ERP', 'Salesforce ERP', 'EPS Payment Gateway']
    },
    {
      title: 'Trainee SQA Engineer',
      company: 'Beacontech Limited',
      period: 'December 2022 - February 2023',
      location: 'Dhaka, Bangladesh',
      type: 'Internship',
      responsibilities: [
        'Performed manual testing on HRMS and Payroll modules of Beacon ERP.',
        'Participated in requirement analysis sessions to align test scenarios with business needs.',
        'Designed and executed detailed test cases, ensuring coverage of functional requirements.',
        'Conducted regression testing to validate fixes and maintain system stability.',
        'Reported and tracked defects using Trello, collaborating with the development team for timely resolution.',
        'Assisted in improving the defect management process by identifying issues early in the SDLC, which helped the team deliver a more stable release'
      ],
      skills: ['HRMS', 'Payroll'],
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