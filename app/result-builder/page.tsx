"use client"
import React, { useState } from 'react';
import { ChevronRight, GraduationCap, BookOpen, Users, Calendar, FileText, Award, Settings, School, Building, Home, Globe } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  category: string;
  schoolType: string;
  preview: string;
  description: string;
  color: string;
  examType?: string;
}

const templates: Template[] = [
  {
    id: 'waec-result',
    name: 'WAEC Result Sheet',
    category: 'Examination Results',
    schoolType: 'All Schools',
    preview: 'waec-result-preview',
    description: 'West African Senior School Certificate Examination result template with A1-F9 grading',
    color: 'from-green-600 to-emerald-700',
    examType: 'WAEC'
  },
  {
    id: 'neco-result',
    name: 'NECO Result Template',
    category: 'Examination Results',
    schoolType: 'All Schools',
    preview: 'neco-result-preview',
    description: 'National Examinations Council result format with comprehensive subject breakdown',
    color: 'from-blue-600 to-indigo-700',
    examType: 'NECO'
  },
  {
    id: 'private-report',
    name: 'Private School Report Card',
    category: 'Term Reports',
    schoolType: 'Private Schools',
    preview: 'private-report-preview',
    description: 'Comprehensive academic report for elite private schools with detailed analytics',
    color: 'from-purple-600 to-pink-600'
  },
  {
    id: 'public-report',
    name: 'Public School Report',
    category: 'Term Reports',
    schoolType: 'Public Schools',
    preview: 'public-report-preview',
    description: 'Standard government school report card format with curriculum alignment',
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'boarding-report',
    name: 'Boarding School Assessment',
    category: 'Term Reports',
    schoolType: 'Boarding Schools',
    preview: 'boarding-report-preview',
    description: 'Comprehensive boarding school report including academics and character development',
    color: 'from-teal-600 to-cyan-700'
  },
  {
    id: 'international-transcript',
    name: 'International School Transcript',
    category: 'Academic Records',
    schoolType: 'International Schools',
    preview: 'international-transcript-preview',
    description: 'Global standard transcript for international curricula (IGCSE, IB, American)',
    color: 'from-indigo-600 to-blue-700'
  },
  {
    id: 'graduation-certificate',
    name: 'School Leaving Certificate',
    category: 'Certificates',
    schoolType: 'All Schools',
    preview: 'graduation-certificate-preview',
    description: 'Official school leaving certificate with academic summary and recommendations',
    color: 'from-amber-600 to-yellow-600'
  },
  {
    id: 'progress-tracking',
    name: 'Student Progress Tracker',
    category: 'Analytics',
    schoolType: 'All Schools',
    preview: 'progress-tracking-preview',
    description: 'Detailed progress analytics with subject-wise performance trends and predictions',
    color: 'from-rose-500 to-pink-600'
  }
];

const getIcon = (category: string) => {
  switch (category) {
    case 'Examination Results': return Award;
    case 'Term Reports': return BookOpen;
    case 'Academic Records': return FileText;
    case 'Certificates': return GraduationCap;
    case 'Analytics': return Users;
    default: return School;
  }
};

const getSchoolTypeIcon = (schoolType: string) => {
  switch (schoolType) {
    case 'Private Schools': return Building;
    case 'Public Schools': return School;
    case 'Boarding Schools': return Home;
    case 'International Schools': return Globe;
    default: return School;
  }
};

const PreviewComponents = {
  'waec-result-preview': () => (
    <div className="h-full bg-white p-6">
      <div className="text-center mb-6 border-b pb-4">
        <h2 className=" font-bold text-gray-900">WEST AFRICAN EXAMINATIONS COUNCIL</h2>
        <p className=" text-gray-600 mt-1">West African Senior School Certificate Examination (WASSCE)</p>
        <p className=" text-gray-500">May/June 2024 Examination</p>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className=" font-semibold text-gray-900 mb-3">Candidate Information</h3>
          <div className="space-y-2 ">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">ADEBAYO SARAH OLUMIDE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Exam Number:</span>
              <span className="font-medium">7234567890</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Centre:</span>
              <span className="font-medium">LAGOS MODEL COLLEGE</span>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50  p-4">
          <h3 className=" font-semibold text-green-800 mb-2">Summary Statistics</h3>
          <div className="space-y-1 ">
            <div className="flex justify-between text-green-700">
              <span>Credits (C6 & above):</span>
              <span className="font-bold">7</span>
            </div>
            <div className="flex justify-between text-green-700">
              <span>Distinctions (A1-B3):</span>
              <span className="font-bold">5</span>
            </div>
            <div className="flex justify-between text-green-700">
              <span>Total Subjects:</span>
              <span className="font-bold">9</span>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className=" font-semibold text-gray-900 mb-3">Subject Results</h3>
        <div className="overflow-hidden border border-gray-200 ">
          <table className="w-full ">
            <thead className="bg-green-50">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-green-800">Subject</th>
                <th className="px-3 py-2 text-center font-medium text-green-800">Grade</th>
                <th className="px-3 py-2 text-center font-medium text-green-800">Remark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                ['Mathematics', 'A1', 'Excellent'],
                ['English Language', 'B2', 'Very Good'],
                ['Chemistry', 'A1', 'Excellent'],
                ['Physics', 'B2', 'Very Good'],
                ['Biology', 'A1', 'Excellent'],
                ['Further Mathematics', 'B3', 'Good'],
                ['Economics', 'C4', 'Credit'],
                ['Geography', 'B2', 'Very Good'],
                ['Literature in English', 'B3', 'Good']
              ].map(([subject, grade, remark], i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-3 py-2 text-gray-900">{subject}</td>
                  <td className="px-3 py-2 text-center">
                    <span className={`font-semibold ${
                      grade.startsWith('A') ? 'text-green-600' :
                      grade.startsWith('B') ? 'text-blue-600' :
                      'text-orange-600'
                    }`}>
                      {grade}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center text-gray-600">{remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <div className="bg-green-100 border border-green-200  p-3">
          <p className=" text-green-800 font-medium">
            🏆 QUALIFICATION ACHIEVED: University Admission Requirements Met
          </p>
          <p className=" text-green-700 mt-1">
            5 Credits including Mathematics and English Language
          </p>
        </div>
      </div>
    </div>
  ),

  'neco-result-preview': () => (
    <div className="h-full bg-white p-6">
      <div className="text-center mb-6 border-b pb-4">
        <h2 className=" font-bold text-blue-900">NATIONAL EXAMINATIONS COUNCIL</h2>
        <p className=" text-gray-600 mt-1">Senior School Certificate Examination (SSCE)</p>
        <p className=" text-gray-500">June/July 2024 External</p>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className=" font-semibold text-gray-900 mb-3">Student Details</h3>
          <div className="space-y-2 ">
            <div className="flex justify-between">
              <span className="text-gray-600">Full Name:</span>
              <span className="font-medium">IBRAHIM KHALID MUSA</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Reg. Number:</span>
              <span className="font-medium">NE23456789</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Centre Name:</span>
              <span className="font-medium">GOVERNMENT COLLEGE KANO</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">State:</span>
              <span className="font-medium">KANO STATE</span>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50  p-4">
          <h3 className=" font-semibold text-blue-800 mb-2">Performance Overview</h3>
          <div className="space-y-1 ">
            <div className="flex justify-between text-blue-700">
              <span>Credits Obtained:</span>
              <span className="font-bold">8 out of 9</span>
            </div>
            <div className="flex justify-between text-blue-700">
              <span>Overall Grade:</span>
              <span className="font-bold">Distinction</span>
            </div>
            <div className="flex justify-between text-blue-700">
              <span>JAMB Eligible:</span>
              <span className="font-bold text-green-600">YES</span>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className=" font-semibold text-gray-900 mb-3">Detailed Results</h3>
        <div className="space-y-3">
          {[
            {subject: 'Mathematics', code: 'MTH', grade: 'A1', score: 85, status: 'Pass'},
            {subject: 'English Language', code: 'ENG', grade: 'B2', score: 78, status: 'Pass'},
            {subject: 'Physics', code: 'PHY', grade: 'A1', score: 88, status: 'Pass'},
            {subject: 'Chemistry', code: 'CHE', grade: 'B2', score: 76, status: 'Pass'},
            {subject: 'Biology', code: 'BIO', grade: 'B3', score: 70, status: 'Pass'},
            {subject: 'Geography', code: 'GEO', grade: 'C4', score: 65, status: 'Pass'},
            {subject: 'Economics', code: 'ECO', grade: 'C5', score: 60, status: 'Pass'},
            {subject: 'Government', code: 'GOV', grade: 'C6', score: 55, status: 'Pass'},
            {subject: 'Arabic Studies', code: 'ARA', grade: 'D7', score: 45, status: 'Fail'}
          ].map((result, i) => (
            <div key={i} className="bg-gray-50  p-3">
              <div className="grid grid-cols-5 gap-4 items-center ">
                <div className="font-medium text-gray-900">{result.subject}</div>
                <div className="text-center text-gray-600">{result.code}</div>
                <div className="text-center">
                  <span className={`font-bold ${
                    result.grade.startsWith('A') ? 'text-green-600' :
                    result.grade.startsWith('B') ? 'text-blue-600' :
                    result.grade.startsWith('C') ? 'text-orange-600' :
                    'text-red-600'
                  }`}>
                    {result.grade}
                  </span>
                </div>
                <div className="text-center text-gray-600">{result.score}%</div>
                <div className="text-center">
                  <span className={` px-2 py-1 rounded-full ${
                    result.status === 'Pass' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {result.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  'private-report-preview': () => (
    <div className="h-full bg-white p-6">
      <div className="text-center mb-6 border-b pb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mx-auto mb-3 flex items-center justify-center">
          <Building className="w-8 h-8 text-white" />
        </div>
        <h2 className=" font-bold text-gray-900">CORONA SCHOOLS TRUST COUNCIL</h2>
        <p className=" text-gray-600">Excellence in Academic & Character Development</p>
        <p className=" text-gray-500">Third Term Report - 2023/2024 Session</p>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className=" font-semibold text-gray-900 mb-3">Student Information</h3>
          <div className="space-y-2 ">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">ADEYEMI TOLUWASE DAVID</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Class:</span>
              <span className="font-medium">SS3 Science</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Term Position:</span>
              <span className="font-medium text-green-600">2nd out of 45</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Overall Average:</span>
              <span className="font-medium text-blue-600">87.5%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-pink-50  p-4">
          <h3 className=" font-semibold text-purple-800 mb-2">Academic Excellence</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-full bg-purple-200 rounded-full h-2">
                <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{width: '87%'}} />
              </div>
              <span className=" text-purple-700 font-medium">87%</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center ">
              <div>
                <div className="font-bold text-purple-600">A</div>
                <div className="text-purple-700">Grade</div>
              </div>
              <div>
                <div className="font-bold text-purple-600">15</div>
                <div className="text-purple-700">Subjects</div>
              </div>
              <div>
                <div className="font-bold text-purple-600">2nd</div>
                <div className="text-purple-700">Position</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className=" font-semibold text-gray-900 mb-3">Subject Performance</h3>
        <div className="grid grid-cols-3 gap-3 ">
          {[
            {subject: 'Mathematics', score: 95, grade: 'A+'},
            {subject: 'Physics', score: 88, grade: 'A'},
            {subject: 'Chemistry', score: 90, grade: 'A+'},
            {subject: 'Biology', score: 85, grade: 'A'},
            {subject: 'English Lang.', score: 82, grade: 'A-'},
            {subject: 'Further Maths', score: 92, grade: 'A+'}
          ].map((subject, i) => (
            <div key={i} className="bg-gray-50  p-3 text-center">
              <div className="font-medium text-gray-900">{subject.subject}</div>
              <div className=" font-bold text-purple-600 my-1">{subject.score}%</div>
              <div className=" text-gray-600">{subject.grade}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-green-50  p-4">
          <h4 className=" font-semibold text-green-800 mb-2">Character Assessment</h4>
          <div className="space-y-1  text-green-700">
            <div>Leadership: Excellent</div>
            <div>Punctuality: Very Good</div>
            <div>Attitude to Work: Excellent</div>
            <div>Relationship with Others: Good</div>
          </div>
        </div>
        
        <div className="bg-blue-50  p-4">
          <h4 className=" font-semibold text-blue-800 mb-2">Teacher's Remarks</h4>
          <p className=" text-blue-700">
            "Toluwase has shown exceptional academic performance and demonstrates strong leadership qualities. 
            Continue with the excellent work ethic."
          </p>
          <div className="mt-2  text-blue-600 font-medium">
            - Mrs. Adebayo O. (Class Teacher)
          </div>
        </div>
      </div>
    </div>
  ),

  'public-report-preview': () => (
    <div className="h-full bg-white p-6">
      <div className="text-center mb-6 border-b pb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full mx-auto mb-3 flex items-center justify-center">
          <School className="w-8 h-8 text-white" />
        </div>
        <h2 className=" font-bold text-gray-900">GOVERNMENT SECONDARY SCHOOL</h2>
        <p className=" text-gray-600">IKEJA, LAGOS STATE</p>
        <p className=" text-gray-500">Second Term Assessment Report 2023/2024</p>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className=" font-semibold text-gray-900 mb-3">Student Data</h3>
          <div className="space-y-2 ">
            <div className="flex justify-between">
              <span className="text-gray-600">Full Name:</span>
              <span className="font-medium">OKONKWO CHIOMA FAITH</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Admission No:</span>
              <span className="font-medium">GSS/2021/0456</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Class:</span>
              <span className="font-medium">SS2 Arts</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">No. in Class:</span>
              <span className="font-medium">38</span>
            </div>
          </div>
        </div>
        
        <div className="bg-orange-50  p-4">
          <h3 className=" font-semibold text-orange-800 mb-2">Term Summary</h3>
          <div className="space-y-1 ">
            <div className="flex justify-between text-orange-700">
              <span>Total Score:</span>
              <span className="font-bold">628/900</span>
            </div>
            <div className="flex justify-between text-orange-700">
              <span>Average:</span>
              <span className="font-bold">69.8%</span>
            </div>
            <div className="flex justify-between text-orange-700">
              <span>Position:</span>
              <span className="font-bold">8th</span>
            </div>
            <div className="flex justify-between text-orange-700">
              <span>Grade:</span>
              <span className="font-bold">B</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className=" font-semibold text-gray-900 mb-3">Subject Breakdown</h3>
        <div className="overflow-hidden border border-gray-200 ">
          <table className="w-full ">
            <thead className="bg-orange-50">
              <tr>
                <th className="px-2 py-2 text-left font-medium text-orange-800">Subject</th>
                <th className="px-2 py-2 text-center font-medium text-orange-800">CA (40)</th>
                <th className="px-2 py-2 text-center font-medium text-orange-800">Exam (60)</th>
                <th className="px-2 py-2 text-center font-medium text-orange-800">Total</th>
                <th className="px-2 py-2 text-center font-medium text-orange-800">Grade</th>
                <th className="px-2 py-2 text-center font-medium text-orange-800">Pos.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                ['Mathematics', 28, 45, 73, 'B', '12/38'],
                ['English Language', 32, 48, 80, 'A', '5/38'],
                ['Literature', 35, 52, 87, 'A', '2/38'],
                ['Government', 30, 38, 68, 'B', '15/38'],
                ['History', 33, 42, 75, 'B', '8/38'],
                ['Economics', 25, 35, 60, 'C', '20/38'],
                ['Geography', 29, 41, 70, 'B', '10/38'],
                ['C.R.S', 36, 49, 85, 'A', '3/38'],
                ['Yoruba', 31, 44, 75, 'B', '7/38']
              ].map(([subject, ca, exam, total, grade, pos], i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-2 py-2 text-gray-900">{subject}</td>
                  <td className="px-2 py-2 text-center text-gray-600">{ca}</td>
                  <td className="px-2 py-2 text-center text-gray-600">{exam}</td>
                  <td className="px-2 py-2 text-center font-medium">{total}</td>
                  <td className="px-2 py-2 text-center">
                    <span className={`font-semibold ${
                      grade === 'A' ? 'text-green-600' :
                      grade === 'B' ? 'text-blue-600' :
                      'text-orange-600'
                    }`}>
                      {grade}
                    </span>
                  </td>
                  <td className="px-2 py-2 text-center text-gray-600">{pos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-gray-50  p-4">
        <h4 className=" font-semibold text-gray-900 mb-2">Class Teacher's Comment</h4>
        <p className=" text-gray-700 mb-2">
          "Chioma has shown good improvement this term especially in Literature and C.R.S. 
          She needs to put more effort in Mathematics and Economics. Keep up the good work!"
        </p>
        <div className=" text-gray-600">
          <strong>Mr. Adegoke T.O</strong> - Class Teacher
        </div>
      </div>
    </div>
  ),

  'boarding-report-preview': () => (
    <div className="h-full bg-white p-6">
      <div className="text-center mb-6 border-b pb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-cyan-700 rounded-full mx-auto mb-3 flex items-center justify-center">
          <Home className="w-8 h-8 text-white" />
        </div>
        <h2 className=" font-bold text-gray-900">FEDERAL GOVERNMENT COLLEGE</h2>
        <p className=" text-gray-600">WARRI, DELTA STATE</p>
        <p className=" text-gray-500">Comprehensive Student Assessment Report - Term 2, 2023/2024</p>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <h3 className=" font-semibold text-gray-900 mb-3">Student Profile</h3>
          <div className="space-y-2 ">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">UGWU EMEKA PETER</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Class:</span>
              <span className="font-medium">JSS3A</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">House:</span>
              <span className="font-medium">MANDELA HOUSE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Dormitory:</span>
              <span className="font-medium">Block C, Room 15</span>
            </div>
          </div>
        </div>
        
        <div className="bg-teal-50  p-4">
          <h3 className=" font-semibold text-teal-800 mb-2">Academic Performance</h3>
          <div className="space-y-1 ">
            <div className="flex justify-between text-teal-700">
              <span>Overall Average:</span>
              <span className="font-bold">84.2%</span>
            </div>
            <div className="flex justify-between text-teal-700">
              <span>Class Position:</span>
              <span className="font-bold">3rd/42</span>
            </div>
            <div className="flex justify-between text-teal-700">
              <span>Term Grade:</span>
              <span className="font-bold">const remainingCode = `A</span>
            </div>
          </div>
        </div>
        
        <div className="bg-cyan-50  p-4">
          <h3 className=" font-semibold text-cyan-800 mb-2">Boarding Life</h3>
          <div className="space-y-1 ">
            <div className="flex justify-between text-cyan-700">
              <span>Dormitory Rating:</span>
              <span className="font-bold">Excellent</span>
            </div>
            <div className="flex justify-between text-cyan-700">
              <span>House Points:</span>
              <span className="font-bold">285</span>
            </div>
            <div className="flex justify-between text-cyan-700">
              <span>Prefect Duties:</span>
              <span className="font-bold">Library Prefect</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className=" font-semibold text-gray-900 mb-3">Subject Results</h3>
          <div className="space-y-2">
            {[
              {subject: 'Mathematics', score: 88, grade: 'A'},
              {subject: 'English Language', score: 85, grade: 'A'},
              {subject: 'Basic Science', score: 90, grade: 'A'},
              {subject: 'Social Studies', score: 82, grade: 'A'},
              {subject: 'French', score: 78, grade: 'B'},
              {subject: 'Computer Studies', score: 92, grade: 'A'}
            ].map((subject, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-50 rounded p-2">
                <span className=" font-medium text-gray-900">{subject.subject}</span>
                <div className="flex items-center gap-2">
                  <span className=" text-gray-600">{subject.score}%</span>
                  <span className={` font-bold px-2 py-1 rounded ${
                    subject.grade === 'A' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {subject.grade}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className=" font-semibold text-gray-900 mb-3">Character Development</h3>
          <div className="space-y-3">
            <div className="bg-green-50  p-3">
              <h4 className=" font-semibold text-green-800">Strengths</h4>
              <ul className=" text-green-700 mt-1 space-y-1">
                <li>• Excellent leadership skills</li>
                <li>• Good study habits</li>
                <li>• Respectful to staff and peers</li>
              </ul>
            </div>
            
            <div className="bg-orange-50  p-3">
              <h4 className=" font-semibold text-orange-800">Areas for Improvement</h4>
              <ul className=" text-orange-700 mt-1 space-y-1">
                <li>• Participation in sports activities</li>
                <li>• Time management during prep</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-teal-50  p-4">
          <h4 className=" font-semibold text-teal-800 mb-2">Housemaster's Report</h4>
          <p className=" text-teal-700">
            "Emeka has been exemplary in his conduct and academic performance. He shows great potential 
            as a leader and has been appointed as Library Prefect for his dedication."
          </p>
          <div className="mt-2  text-teal-600 font-medium">
            - Mr. Okolie J.C (Mandela House)
          </div>
        </div>
        
        <div className="bg-gray-50  p-4">
          <h4 className=" font-semibold text-gray-900 mb-2">Principal's Remarks</h4>
          <p className=" text-gray-700">
            "An outstanding student who embodies the values of discipline, excellence and leadership. 
            Continue to be a good ambassador of the school."
          </p>
          <div className="mt-2  text-gray-600 font-medium">
            - Mrs. Okafor M.N (Principal)
          </div>
        </div>
      </div>
    </div>
  ),

  'international-transcript-preview': () => (
    <div className="h-full bg-white p-6">
      <div className="text-center mb-6 border-b pb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-full mx-auto mb-3 flex items-center justify-center">
          <Globe className="w-8 h-8 text-white" />
        </div>
        <h2 className=" font-bold text-gray-900">BRITISH INTERNATIONAL SCHOOL</h2>
        <p className=" text-gray-600">LAGOS, NIGERIA</p>
        <p className=" text-gray-500">Official Academic Transcript - Cambridge IGCSE Program</p>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className=" font-semibold text-gray-900 mb-3">Student Information</h3>
          <div className="space-y-2 ">
            <div className="flex justify-between">
              <span className="text-gray-600">Full Name:</span>
              <span className="font-medium">JOHNSON ALEXANDRA MARIE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Student ID:</span>
              <span className="font-medium">BIS/2019/0234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cambridge ID:</span>
              <span className="font-medium">NG123456789</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Year of Study:</span>
              <span className="font-medium">Year 11 (Grade 10)</span>
            </div>
          </div>
        </div>
        
        <div className="bg-indigo-50  p-4">
          <h3 className=" font-semibold text-indigo-800 mb-2">Academic Summary</h3>
          <div className="space-y-1 ">
            <div className="flex justify-between text-indigo-700">
              <span>IGCSE Subjects:</span>
              <span className="font-bold">10</span>
            </div>
            <div className="flex justify-between text-indigo-700">
              <span>A*-C Grades:</span>
              <span className="font-bold">10/10</span>
            </div>
            <div className="flex justify-between text-indigo-700">
              <span>GPA (4.0 Scale):</span>
              <span className="font-bold">3.8</span>
            </div>
            <div className="flex justify-between text-indigo-700">
              <span>Class Rank:</span>
              <span className="font-bold">5/85</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className=" font-semibold text-gray-900 mb-3">Cambridge IGCSE Results</h3>
        <div className="overflow-hidden border border-gray-200 ">
          <table className="w-full ">
            <thead className="bg-indigo-50">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-indigo-800">Subject</th>
                <th className="px-3 py-2 text-center font-medium text-indigo-800">Code</th>
                <th className="px-3 py-2 text-center font-medium text-indigo-800">IGCSE Grade</th>
                <th className="px-3 py-2 text-center font-medium text-indigo-800">US Grade</th>
                <th className="px-3 py-2 text-center font-medium text-indigo-800">Credits</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                ['Mathematics', '0580', 'A*', 'A+', '1.0'],
                ['English Language', '0500', 'A', 'A', '1.0'],
                ['English Literature', '0486', 'A', 'A', '1.0'],
                ['Physics', '0625', 'A*', 'A+', '1.0'],
                ['Chemistry', '0620', 'A', 'A', '1.0'],
                ['Biology', '0610', 'A', 'A', '1.0'],
                ['Economics', '0455', 'B', 'B+', '1.0'],
                ['History', '0470', 'A', 'A', '1.0'],
                ['French', '0520', 'B', 'B+', '1.0'],
                ['Art & Design', '0400', 'A', 'A', '1.0']
              ].map(([subject, code, igcse, us, credits], i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-3 py-2 text-gray-900">{subject}</td>
                  <td className="px-3 py-2 text-center text-gray-600">{code}</td>
                  <td className="px-3 py-2 text-center">
                    <span className={`font-semibold ${
                      igcse.includes('A*') ? 'text-green-600' :
                      igcse.includes('A') ? 'text-blue-600' :
                      'text-purple-600'
                    }`}>
                      {igcse}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center text-gray-600">{us}</td>
                  <td className="px-3 py-2 text-center text-gray-600">{credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50  p-4">
          <h4 className=" font-semibold text-green-800 mb-2">Achievements</h4>
          <ul className=" text-green-700 space-y-1">
            <li>• Subject Prize - Mathematics</li>
            <li>• Honor Roll - 4 Terms</li>
            <li>• Student Council Member</li>
          </ul>
        </div>
        
        <div className="bg-blue-50  p-4">
          <h4 className=" font-semibold text-blue-800 mb-2">Extracurricular</h4>
          <ul className=" text-blue-700 space-y-1">
            <li>• Model United Nations</li>
            <li>• School Tennis Team</li>
            <li>• Drama Club President</li>
          </ul>
        </div>
        
        <div className="bg-purple-50  p-4">
          <h4 className=" font-semibold text-purple-800 mb-2">University Readiness</h4>
          <div className=" text-purple-700">
            <div className="mb-2">Ready for:</div>
            <ul className="space-y-1">
              <li>• A-Level Program</li>
              <li>• IB Diploma</li>
              <li>• US High School</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),

  'graduation-certificate-preview': () => (
    <div className="h-full bg-white p-6">
      <div className="text-center mb-6 border-b pb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-yellow-600 rounded-full mx-auto mb-3 flex items-center justify-center">
          <GraduationCap className="w-8 h-8 text-white" />
        </div>
        <h2 className=" font-bold text-gray-900">CERTIFICATE OF COMPLETION</h2>
        <p className=" text-gray-600">GREENFIELD SECONDARY SCHOOL</p>
        <p className=" text-gray-500">ABUJA, FCT - NIGERIA</p>
      </div>
      
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50  p-6 border-2 border-amber-200">
          <p className=" text-gray-700 mb-4">This is to certify that</p>
          <h3 className="text-2xl font-bold text-amber-800 mb-4">ADEBISI KEMI OLUWASEUN</h3>
          <p className=" text-gray-700 mb-2">has successfully completed the Senior Secondary School program</p>
          <p className=" text-gray-700 mb-4">and is hereby awarded this</p>
          <h4 className=" font-bold text-amber-700">SCHOOL LEAVING CERTIFICATE</h4>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className=" font-semibold text-gray-900 mb-3">Academic Record</h3>
          <div className="space-y-2 ">
            <div className="flex justify-between">
              <span className="text-gray-600">Admission Year:</span>
              <span className="font-medium">2021</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Graduation Year:</span>
              <span className="font-medium">2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Program:</span>
              <span className="font-medium">Science Track</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Final CGPA:</span>
              <span className="font-medium text-green-600">3.8/4.0</span>
            </div>
          </div>
        </div>
        
        <div className="bg-amber-50  p-4">
          <h3 className=" font-semibold text-amber-800 mb-2">Honors & Recognition</h3>
          <div className="space-y-1  text-amber-700">
            <div>• Academic Excellence Award 2024</div>
            <div>• Perfect Attendance (3 Years)</div>
            <div>• Science Fair Winner 2023</div>
            <div>• School Head Girl 2023-2024</div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className=" font-semibold text-gray-900 mb-3">Final Year Performance</h3>
        <div className="grid grid-cols-4 gap-3">
          {[
            {subject: 'Mathematics', grade: 'A', score: '92%'},
            {subject: 'Physics', grade: 'A', score: '89%'},
            {subject: 'Chemistry', grade: 'A', score: '91%'},
            {subject: 'Biology', grade: 'A', score: '87%'},
            {subject: 'English', grade: 'B+', score: '84%'},
            {subject: 'Economics', grade: 'A', score: '88%'},
            {subject: 'Government', grade: 'B+', score: '82%'},
            {subject: 'Literature', grade: 'A', score: '90%'}
          ].map((subject, i) => (
            <div key={i} className="bg-gray-50  p-3 text-center">
              <div className=" font-medium text-gray-900 mb-1">{subject.subject}</div>
              <div className=" font-bold text-amber-600">{subject.grade}</div>
              <div className=" text-gray-600">{subject.score}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mt-8">
        <div className="text-center">
          <div className="border-t border-gray-300 pt-2">
            <p className=" font-medium text-gray-900">MRS. ADEYEMI FOLAKE</p>
            <p className=" text-gray-600">Principal</p>
            <p className=" text-gray-500">Date: July 15, 2024</p>
          </div>
        </div>
        
        <div className="text-center">
          <div className="border-t border-gray-300 pt-2">
            <p className=" font-medium text-gray-900">SCHOOL SEAL</p>
            <div className="w-12 h-12 bg-amber-200 rounded-full mx-auto mt-2 flex items-center justify-center">
              <Award className="w-6 h-6 text-amber-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  'progress-tracking-preview': () => (
    <div className="h-full bg-white p-6">
      <div className="text-center mb-6 border-b pb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full mx-auto mb-3 flex items-center justify-center">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h2 className=" font-bold text-gray-900">STUDENT PROGRESS ANALYTICS</h2>
        <p className=" text-gray-600">Comprehensive Performance Tracking Dashboard</p>
        <p className=" text-gray-500">Academic Year 2023/2024 - Term Analysis</p>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-rose-50  p-4">
          <h3 className=" font-semibold text-rose-800 mb-2">Current Performance</h3>
          <div className="text-center">
            <div className="text-2xl font-bold text-rose-600">85.6%</div>
            <div className=" text-rose-700">Overall Average</div>
            <div className="flex justify-center mt-2">
              <div className="w-16 h-2 bg-rose-200 rounded-full">
                <div className="h-2 bg-rose-500 rounded-full" style={{width: '86%'}} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50  p-4">
          <h3 className=" font-semibold text-blue-800 mb-2">Improvement Trend</h3>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">+5.2%</div>
            <div className=" text-blue-700">Since Last Term</div>
            <div className=" text-green-600 mt-1">📈 Upward Trend</div>
          </div>
        </div>
        
        <div className="bg-purple-50  p-4">
          <h3 className=" font-semibold text-purple-800 mb-2">Predicted Grade</h3>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">A-</div>
            <div className=" text-purple-700">Final Projection</div>
            <div className=" text-purple-600 mt-1">95% Confidence</div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className=" font-semibold text-gray-900 mb-3">Subject Performance Matrix</h3>
          <div className="space-y-2">
            {[
              {subject: 'Mathematics', current: 92, trend: '+3', status: 'excellent'},
              {subject: 'Physics', current: 88, trend: '+7', status: 'improving'},
              {subject: 'Chemistry', current: 85, trend: '-2', status: 'stable'},
              {subject: 'Biology', current: 90, trend: '+4', status: 'excellent'},
              {subject: 'English', current: 80, trend: '+6', status: 'improving'},
              {subject: 'Economics', current: 78, trend: '+8', status: 'improving'}
            ].map((subject, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-50  p-3">
                <span className=" font-medium text-gray-900">{subject.subject}</span>
                <div className="flex items-center gap-3">
                  <span className=" font-bold">{subject.current}%</span>
                  <span className={` font-medium ${
                    subject.trend.startsWith('+') ? 'text-green-600' : 
                    subject.trend.startsWith('-') ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {subject.trend}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${
                    subject.status === 'excellent' ? 'bg-green-500' :
                    subject.status === 'improving' ? 'bg-blue-500' : 'bg-yellow-500'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className=" font-semibold text-gray-900 mb-3">Learning Analytics</h3>
          <div className="space-y-3">
            <div className="bg-green-50  p-3">
              <h4 className=" font-semibold text-green-800">Strengths Identified</h4>
              <ul className=" text-green-700 mt-2 space-y-1">
                <li>• Strong analytical skills in STEM subjects</li>
                <li>• Consistent homework submission</li>
                <li>• Active class participation</li>
                <li>• Effective study group collaboration</li>
              </ul>
            </div>
            
            <div className="bg-orange-50  p-3">
              <h4 className=" font-semibold text-orange-800">Improvement Areas</h4>
              <ul className=" text-orange-700 mt-2 space-y-1">
                <li>• Time management during exams</li>
                <li>• Essay writing techniques</li>
                <li>• Practical lab skills development</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-pink-50 to-rose-50  p-4 border border-pink-200">
        <h4 className=" font-semibold text-pink-800 mb-2">AI-Generated Recommendations</h4>
        <div className="grid grid-cols-2 gap-4 ">
          <div>
            <h5 className="font-medium text-pink-700 mb-1">Study Focus Areas:</h5>
            <ul className="text-pink-600 space-y-1">
              <li>• Increase Chemistry practice problems by 30%</li>
              <li>• Schedule weekly English writing sessions</li>
              <li>• Join advanced Mathematics study group</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-pink-700 mb-1">Success Predictions:</h5>
            <ul className="text-pink-600 space-y-1">
              <li>• 92% chance of maintaining A-grade average</li>
              <li>• University admission readiness: Excellent</li>
              <li>• Scholarship eligibility: High probability</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
};

const SchoolTemplates = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSchoolType, setSelectedSchoolType] = useState('All Schools');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const categories = ['All', 'Examination Results', 'Term Reports', 'Academic Records', 'Certificates', 'Analytics'];
  const schoolTypes = ['All Schools', 'Private Schools', 'Public Schools', 'Boarding Schools', 'International Schools'];

  const filteredTemplates = templates.filter(template => 
    (selectedCategory === 'All' || template.category === selectedCategory) &&
    (selectedSchoolType === 'All Schools' || template.schoolType === selectedSchoolType)
  );

  const PreviewComponent = selectedTemplate ? PreviewComponents[selectedTemplate.preview as keyof typeof PreviewComponents] : null;

  return (
    <div className="flex h-full w-full px-6 text-[10px] border-t border-zinc-400/20">
      <div className="">
        {/* Header */}
      
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Templates List */}
          <div className="lg:col-span-1 border-r border-zinc-400/20 py-6 pr-6">
            <div className="bg-white ">
          
              <div className="space-y-3 max-h-[90vh] overflow-hidden">
                {filteredTemplates.map(template => {
                  const Icon = getIcon(template.category);
                  const SchoolIcon = getSchoolTypeIcon(template.schoolType);
                  
                  return (
                    <div
                      key={template.id}
                      onClick={() => setSelectedTemplate(template)}
                      className={`p-4 border cursor-pointer transition-all hover: ${
                        selectedTemplate?.id === template.id
                          ? 'border-blue-500 bg-blue-50 '
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10  bg-gradient-to-br ${template.color} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900  mb-1">{template.name}</h3>
                          <p className=" text-gray-600 mb-2 line-clamp-2">{template.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <SchoolIcon className="w-3 h-3 text-gray-500" />
                              <span className=" text-gray-500">{template.schoolType}</span>
                            </div>
                            {template.examType && (
                              <span className=" bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                {template.examType}
                              </span>
                            )}
                          </div>
                        </div>
                        <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${
                          selectedTemplate?.id === template.id ? 'rotate-90' : ''
                        }`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-2 h-full py-6">
            <div className="bg-white h-full">
              {selectedTemplate ? (
                <div className="h-full">
                  <div className="hidden bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedTemplate.name}</h2>
                        <p className="text-gray-600  mb-3">{selectedTemplate.description}</p>
                        <div className="flex items-center gap-4">
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full  font-medium">
                            {selectedTemplate.category}
                          </span>
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full  font-medium">
                            {selectedTemplate.schoolType}
                          </span>
                          {selectedTemplate.examType && (
                            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full  font-medium">
                              {selectedTemplate.examType}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3  font-medium hover: transition-all flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Use Template
                        </button>
                        <button className="bg-gray-100 text-gray-700 px-6 py-3  font-medium hover:bg-gray-200 transition-all flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          Customize
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="max-h-[90vh] overflow-hidden border-8 border-zinc-600/20">
                    {PreviewComponent && <PreviewComponent />}
                  </div>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                   
                    <h3 className=" font-semibold text-gray-900 mb-3">Select a Template</h3>
                    <p className="text-gray-600 max-w-md">
                      Choose from our collection of authentic Nigerian school document templates. 
                      Each template is designed to meet local educational standards and requirements.
                    </p>
                    <div className="mt-6 grid grid-cols-2 gap-4 max-w-md">
                      <div className="bg-blue-50 p-4 ">
                        <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <div className=" font-medium text-blue-900">Examination Results</div>
                        <div className=" text-blue-600">WAEC, NECO & More</div>
                      </div>
                      <div className="bg-green-50 p-4">
                        <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <div className=" font-medium text-green-900">Report Cards</div>
                        <div className=" text-green-600">All School Types</div>
                      </div>
                      <div className="bg-purple-50 p-4">
                        <GraduationCap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <div className=" font-medium text-purple-900">Certificates</div>
                        <div className=" text-purple-600">Graduation & Awards</div>
                      </div>
                      <div className="bg-orange-50 p-4">
                        <Users className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                        <div className=" font-medium text-orange-900">Analytics</div>
                        <div className=" text-orange-600">Progress Tracking</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SchoolTemplates;