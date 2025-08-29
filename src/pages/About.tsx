import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { GraduationCap, Award, Target, Code, Database, TestTube } from 'lucide-react';

export default function About() {
  const technicalSkills = [
    { name: 'Manual Testing', level: 95 },
    { name: 'Automation Testing', level: 85 },
    { name: 'API Testing', level: 90 },
    { name: 'Performance Testing', level: 80 },
    { name: 'Selenium WebDriver', level: 85 },
    { name: 'Java', level: 75 },
    { name: 'SQL', level: 80 },
    { name: 'JMeter', level: 85 }
  ];

  const tools = [
    'Selenium', 'JMeter', 'Postman', 'Trello', 'Slack', 'IntelliJ IDEA',
    'MS SQL Server', 'MySQL', 'GitHub', 'GitLab', 'JIRA'
  ];

  const education = [
    {
      degree: 'B.Sc. in Software Engineering',
      institution: 'Daffodil International University',
      year: '2022',
      grade: 'CGPA: 3.82/4.00'
    },
    {
      degree: 'Higher Secondary School Certificate',
      institution: 'Govt. Ashek Mahmud College',
      year: '2016',
      grade: 'GPA: 5.00/5.00'
    },
    {
      degree: 'Secondary School Certificate',
      institution: 'Hashil Girls High School',
      year: '2014',
      grade: 'GPA: 5.00/5.00'
    }
  ];

  const certifications = [
    'SQA and Cyber Security Professional Training - IT Training BD',
    'Introduction to Software Testing - University of Minnesota (Coursera)',
    'Software Architecture and Design - University of Alberta (Coursera)'
  ];

  return (
    <div className="min-h-screen py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center animate-in slide-in-from-top duration-700">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">About Me</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Passionate SQA Engineer with expertise in ensuring software quality through comprehensive testing strategies
          </p>
        </div>

        {/* Bio Section */}
        <Card className="animate-in slide-in-from-left duration-700 delay-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Target className="h-6 w-6 text-blue-600" />
              Career Objective
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              To utilize my expertise in software quality assurance, gained through diverse experience in testing various applications 
              and collaborating within Agile teams. I want to contribute effectively to the success of projects I am involved in.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Seeking a challenging role where I can leverage my skills in manual and automation testing to ensure the delivery 
              of high-quality software solutions while continuously improving processes and methodologies.
            </p>
          </CardContent>
        </Card>

        {/* Skills Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Technical Skills */}
          <Card className="animate-in slide-in-from-left duration-700 delay-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Code className="h-6 w-6 text-blue-600" />
                Technical Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {technicalSkills.map((skill, index) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                    <span className="text-sm text-gray-500">{skill.level}%</span>
                  </div>
                  <Progress 
                    value={skill.level} 
                    className="h-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Tools & Technologies */}
          <Card className="animate-in slide-in-from-right duration-700 delay-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <TestTube className="h-6 w-6 text-blue-600" />
                Tools & Technologies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, index) => (
                  <Badge 
                    key={tool} 
                    variant="outline" 
                    className="px-3 py-1 animate-in fade-in duration-500"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Education */}
        <Card className="animate-in slide-in-from-bottom duration-700 delay-400">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <GraduationCap className="h-6 w-6 text-blue-600" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="border-l-4 border-blue-600 pl-6 pb-6 last:pb-0">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="text-gray-500">Year: {edu.year}</span>
                      <span className="text-blue-600 font-medium">{edu.grade}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card className="animate-in slide-in-from-bottom duration-700 delay-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Award className="h-6 w-6 text-blue-600" />
              Training & Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{cert}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}