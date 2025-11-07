// DashboardComponents.tsx
import React, { useEffect, useState } from 'react';
import {
  BookOpen, Clock, Play, CheckCircle, Calendar, BarChart3, Code, FileText, ArrowRight, ChevronLeft, Timer,
  Building2, MapPin, Users, Award, Target, Star, TrendingUp, Calendar as CalendarIcon, Briefcase, Globe, Phone, Mail, Home, TestTube, CheckCircle as Check, Coffee
} from 'lucide-react';
import type { Test, TestProgress, StudentStats } from './types';

// ========== DASHBOARD TAB ==========
export const DashboardTab: React.FC<{
  tests: Test[];
  stats: StudentStats;
  companyInfo: any;
  availablePositions: any[];
  benefits: any[];
  timeline: any[];
}> = ({ tests, stats, companyInfo, availablePositions, benefits, timeline }) => {
  const availableTests = tests.filter(t => t.status === 'available');
  
  return (
    <div className="w-full space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
          <div className="mb-4 lg:mb-0">
            <h2 className="text-2xl font-bold mb-2">Welcome to Campus Drive! 🎯</h2>
            <p className="text-blue-100 mb-1">Ready to showcase your skills and land your dream job</p>
            <p className="text-blue-200 text-sm">Complete your assessments with {companyInfo.name}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <Target className="h-4 w-4 text-blue-200" />
                <p className="text-blue-100 text-sm font-medium">Tests Available</p>
              </div>
              <p className="text-2xl font-bold">{availableTests.length}</p>
              <p className="text-blue-200 text-xs">Ready to attempt</p>
            </div>
          </div>
        </div>
      </div>

      {/* Company Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Company Information</h3>
                <p className="text-sm text-gray-600">Learn about your potential employer</p>
              </div>
            </div>
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
              Since {companyInfo.foundedYear}
            </div>
          </div>
        </div>
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-gray-900 mb-2 flex items-center space-x-2">
              <span>{companyInfo.name}</span>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">Verified</span>
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">{companyInfo.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <div className="flex items-center space-x-2 mb-1">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <h5 className="font-medium text-gray-800 text-sm">Location</h5>
                </div>
                <p className="text-gray-700 text-sm">{companyInfo.address.city}, {companyInfo.address.state}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                <div className="flex items-center space-x-2 mb-1">
                  <Users className="h-4 w-4 text-purple-600" />
                  <h5 className="font-medium text-gray-800 text-sm">Company Size</h5>
                </div>
                <p className="text-gray-700 text-sm">{companyInfo.employees} employees</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                <div className="flex items-center space-x-2 mb-1">
                  <Globe className="h-4 w-4 text-green-600" />
                  <h5 className="font-medium text-gray-800 text-sm">Industry</h5>
                </div>
                <p className="text-gray-700 text-sm">{companyInfo.industry}</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                <div className="flex items-center space-x-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                  <h5 className="font-medium text-gray-800 text-sm">Growth</h5>
                </div>
                <p className="text-gray-700 text-sm">Expanding Globally</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h5 className="font-medium text-gray-800 text-sm mb-3 flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>Contact Information</span>
            </h5>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-3 w-3 text-gray-400" />
                <span className="text-gray-700">{companyInfo.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-3 w-3 text-gray-400" />
                <span className="text-gray-700">{companyInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-3 w-3 text-gray-400" />
                <a href={companyInfo.website} className="text-blue-600 hover:underline">{companyInfo.website}</a>
              </div>
              <div className="flex items-start space-x-2 mt-3">
                <Home className="h-3 w-3 text-gray-400 mt-0.5" />
                <span className="text-gray-700 text-xs">
                  {companyInfo.address.street}, {companyInfo.address.city}, {companyInfo.address.state} - {companyInfo.address.zipCode}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Positions & Benefits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <div className="flex items-center space-x-2 mb-3">
            <Briefcase className="h-4 w-4 text-blue-600" />
            <h5 className="text-sm font-semibold text-gray-800">Available Positions ({availablePositions.length})</h5>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {availablePositions.map((position) => (
              <div key={position.id} className="bg-white rounded p-3 border border-blue-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start space-x-2">
                    <Code className="h-3 w-3 text-blue-600 mt-0.5" />
                    <span className="font-medium text-gray-800 text-xs block">{position.title}</span>
                  </div>
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
                    {position.openings} openings
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">{position.department} · {position.experience}</span>
                  <span className="text-blue-600 font-medium">
                    {(position.salaryRange.min / 100000).toFixed(1)} - {(position.salaryRange.max / 100000).toFixed(1)} LPA
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4 border border-green-100">
          <div className="flex items-center space-x-2 mb-3">
            <Award className="h-4 w-4 text-green-600" />
            <h5 className="text-sm font-semibold text-gray-800">Benefits & Perks</h5>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {benefits.slice(0, 6).map((benefit) => (
              <div key={benefit.id} className="flex items-start space-x-2 bg-white rounded p-2 border border-green-200">
                <span className="text-sm">{benefit.icon}</span>
                <div>
                  <span className="text-gray-700 text-xs font-medium block">{benefit.title}</span>
                  <p className="text-gray-500 text-xs">{benefit.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
        <div className="flex items-center space-x-2 mb-3">
          <CalendarIcon className="h-4 w-4 text-orange-600" />
          <h5 className="text-sm font-semibold text-gray-800">Campus Drive Timeline</h5>
        </div>
        <div className="space-y-2">
          {timeline.map((item) => (
            <div key={item.step} className="flex items-center space-x-3 bg-white rounded p-3 border border-orange-200">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                item.status === 'current' ? 'bg-green-100 text-green-700 border-2 border-green-300' : 'bg-gray-100 text-gray-500'
              }`}>
                {item.step}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-xs">{item.title}</p>
                <p className="text-gray-600 text-xs">{item.description}</p>
                <p className="text-gray-500 text-xs">{item.duration}</p>
              </div>
              {item.status === 'current' && (
                <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">Active</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Available Tests', value: availableTests.length, color: 'blue', icon: BookOpen, desc: 'Ready to attempt' },
          { label: 'Total Tests', value: stats.totalTests, color: 'purple', icon: BarChart3, desc: 'In this drive' },
          { label: 'Deadline', value: '4', color: 'orange', icon: Clock, desc: 'Days remaining' },
          { label: 'Success Rate', value: '85%', color: 'green', icon: TrendingUp, desc: 'Industry average' }
        ].map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">{stat.label}</p>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-xs text-${stat.color}-600 font-medium`}>{stat.desc}</p>
              </div>
              <div className={`bg-${stat.color}-100 p-2 rounded-lg`}>
                <stat.icon className={`h-5 w-5 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ========== TESTS TAB (Available Tests Section) ==========
export const TestsTab: React.FC<{ tests: Test[]; onStartTest: (test: Test) => void }> = ({ tests, onStartTest }) => {
  const availableTests = tests.filter(t => t.status === 'available');
  const completedTests = tests.filter(t => t.status === 'completed');
  const inProgressTests = tests.filter(t => t.status === 'in-progress');

  return (
    <div className="space-y-6">
      {/* Available Tests */}
      {availableTests.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Play className="h-5 w-5 text-blue-600" />
            <span>Available Tests ({availableTests.length})</span>
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {availableTests.map(test => (
              <div key={test.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-lg font-bold text-gray-900">{test.title}</h4>
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">New</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{test.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{test.duration} mins</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <FileText className="h-4 w-4" />
                        <span>{test.totalQuestions} questions</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Deadline: {new Date(test.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {test.sections.map(section => (
                        <span key={section.id} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                          {section.name} ({section.questions} Qs)
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => onStartTest(test)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 font-semibold flex items-center space-x-2 shadow-md hover:shadow-lg transition-all"
                  >
                    <Play className="h-4 w-4" />
                    <span>Start Test</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* In Progress Tests */}
      {inProgressTests.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Timer className="h-5 w-5 text-orange-600" />
            <span>In Progress ({inProgressTests.length})</span>
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {inProgressTests.map(test => (
              <div key={test.id} className="bg-orange-50 rounded-lg border border-orange-200 p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">{test.title}</h4>
                    <p className="text-sm text-gray-600">Resume your test</p>
                  </div>
                  <button
                    onClick={() => onStartTest(test)}
                    className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 font-semibold flex items-center space-x-2"
                  >
                    <Play className="h-4 w-4" />
                    <span>Resume</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Tests */}
      {completedTests.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>Completed Tests ({completedTests.length})</span>
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {completedTests.map(test => (
              <div key={test.id} className="bg-green-50 rounded-lg border border-green-200 p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">{test.title}</h4>
                    <p className="text-sm text-gray-600">Score: {test.score}%</p>
                    <p className="text-xs text-gray-500">Completed on {test.completedAt?.toLocaleDateString()}</p>
                  </div>
                  <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold">
                    {test.score}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ========== OTHER VIEWS ==========
export const CountdownView: React.FC<{ countdown: number; target: 'mcq' | 'coding' | 'dashboard'; testTitle?: string }> = ({ countdown, target, testTitle }) => {
  const getTargetMessage = () => {
    switch (target) {
      case 'mcq': return 'Switching to MCQ Round...';
      case 'coding': return 'Switching to Coding Round...';
      case 'dashboard': return 'Returning to Dashboard...';
      default: return 'Loading...';
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center space-y-6 bg-white p-12 rounded-2xl shadow-2xl border border-gray-200">
        <div className="relative">
          <div className="animate-spin rounded-full h-32 w-32 border-8 border-gray-200 border-t-blue-600 mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl font-bold text-blue-600">{countdown}</span>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">{getTargetMessage()}</h2>
          {testTitle && <p className="text-gray-600">{testTitle}</p>}
          <p className="text-sm text-gray-500">Please wait...</p>
        </div>
      </div>
    </div>
  );
};

export const ThankYouView: React.FC<{ testTitle?: string }> = ({ testTitle }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8 text-white text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white rounded-full p-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-2">Congratulations! 🎉</h2>
          <h3 className="text-xl font-semibold">Assessment Completed Successfully</h3>
        </div>
        <div className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <p className="text-lg font-semibold text-gray-900">{testTitle}</p>
            <p className="text-gray-600">You have successfully completed all sections of the assessment</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <Star className="h-5 w-5 text-blue-600" />
              <span>What's Next?</span>
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start space-x-2">
                <Check className="h-4 w-4 text-green-600 mt-0.5" />
                <span>Your responses have been recorded and will be evaluated by our team</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="h-4 w-4 text-green-600 mt-0.5" />
                <span>You will receive an email with your results within 3-5 business days</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="h-4 w-4 text-green-600 mt-0.5" />
                <span>Shortlisted candidates will be contacted for the next round</span>
              </li>
            </ul>
          </div>
          <div className="bg-orange-50 rounded-lg p-6 border border-orange-100">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <Mail className="h-5 w-5 text-orange-600" />
              <span>Email Alerts</span>
            </h4>
            <p className="text-sm text-gray-700">
              Please check your registered email regularly for updates on your application status and further instructions.
            </p>
          </div>
          <div className="text-center pt-4">
            <p className="text-sm text-gray-600 mb-4">Thank you for your participation!</p>
            <div className="flex items-center justify-center space-x-2 text-blue-600">
              <Coffee className="h-5 w-5" />
              <span className="text-sm font-medium">Take a well-deserved break!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TestSelectionView: React.FC<{
  test: Test;
  progress: TestProgress;
  onSelectSection: (sectionType: 'mcq' | 'coding') => void;
  onBack: () => void;
}> = ({ test, progress, onSelectSection, onBack }) => {
  const mcqSection = test.sections.find(s => s.type === 'mcq');
  const codingSection = test.sections.find(s => s.type === 'coding');

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <button onClick={onBack} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ChevronLeft className="h-5 w-5" />
            <span className="font-medium">Back to Dashboard</span>
          </button>
        </div>
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">{test.title}</h1>
            <p className="text-blue-100">{test.description}</p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{test.duration} minutes total</span>
              </div>
              <div className="flex items-center space-x-1">
                <FileText className="h-4 w-4" />
                <span>{test.totalQuestions} questions</span>
              </div>
            </div>
          </div>
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select a Section to Begin</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mcqSection && (
                <div className={`relative border-2 rounded-xl p-6 transition-all ${
                  progress.mcqSubmitted ? 'border-green-300 bg-green-50' : 'border-blue-300 bg-blue-50 hover:border-blue-500 hover:shadow-lg'
                }`}>
                  {progress.mcqSubmitted && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                  )}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-blue-600 p-3 rounded-lg">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{mcqSection.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{mcqSection.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-semibold text-gray-900">{mcqSection.duration} minutes</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Questions:</span>
                      <span className="font-semibold text-gray-900">{mcqSection.questions}</span>
                    </div>
                  </div>
                  {mcqSection.subsections && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Subsections:</p>
                      <div className="flex flex-wrap gap-2">
                        {mcqSection.subsections.map(sub => (
                          <span key={sub.id} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                            {sub.name} ({sub.questions})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => onSelectSection('mcq')}
                    disabled={progress.mcqSubmitted}
                    className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all ${
                      progress.mcqSubmitted ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                    }`}
                  >
                    {progress.mcqSubmitted ? (
                      <>
                        <CheckCircle className="h-5 w-5" />
                        <span>Completed</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5" />
                        <span>Start MCQ Round</span>
                      </>
                    )}
                  </button>
                </div>
              )}
              {codingSection && (
                <div className={`relative border-2 rounded-xl p-6 transition-all ${
                  progress.codingSubmitted ? 'border-green-300 bg-green-50' : 'border-purple-300 bg-purple-50 hover:border-purple-500 hover:shadow-lg'
                }`}>
                  {progress.codingSubmitted && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                  )}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-purple-600 p-3 rounded-lg">
                      <Code className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{codingSection.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{codingSection.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-semibold text-gray-900">{codingSection.duration} minutes</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Problems:</span>
                      <span className="font-semibold text-gray-900">{codingSection.questions}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onSelectSection('coding')}
                    disabled={progress.codingSubmitted}
                    className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all ${
                      progress.codingSubmitted ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-lg'
                    }`}
                  >
                    {progress.codingSubmitted ? (
                      <>
                        <CheckCircle className="h-5 w-5" />
                        <span>Completed</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5" />
                        <span>Start Coding Round</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
            {progress.mcqSubmitted && progress.codingSubmitted && (
              <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">All Sections Completed!</h3>
                <p className="text-gray-600">You have successfully completed all sections of this assessment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const MCQTestView: React.FC<{
  test: Test;
  progress: { aptitude: boolean; logical: boolean; verbal: boolean };
  onProgressUpdate: (progress: { aptitude: boolean; logical: boolean; verbal: boolean }) => void;
  onSubmit: () => void;
  onBack: () => void;
}> = ({ test, progress, onProgressUpdate, onSubmit, onBack }) => {
  const mcqSection = test.sections.find(s => s.type === 'mcq');
  const [timeRemaining, setTimeRemaining] = useState(mcqSection?.duration ? mcqSection.duration * 60 : 3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const allSubsectionsCompleted = progress.aptitude && progress.logical && progress.verbal;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold mb-1">MCQ Round</h1>
                <p className="text-blue-100">{test.title}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/30">
                <div className="flex items-center space-x-2">
                  <Timer className="h-5 w-5" />
                  <span className="text-2xl font-bold">{formatTime(timeRemaining)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-8">
            <div className="mb-6">
              <button onClick={onBack} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ChevronLeft className="h-5 w-5" />
                <span className="font-medium">Back to Section Selection</span>
              </button>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete All Subsections</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { id: 'aptitude', name: 'Aptitude', questions: 10, icon: BarChart3 },
                { id: 'logical', name: 'Logical Reasoning', questions: 10, icon: Target },
                { id: 'verbal', name: 'Verbal Ability', questions: 10, icon: FileText }
              ].map(subsection => (
                <div
                  key={subsection.id}
                  className={`border-2 rounded-lg p-4 transition-all ${
                    progress[subsection.id as keyof typeof progress] ? 'border-green-300 bg-green-50' : 'border-blue-300 bg-blue-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <subsection.icon className="h-5 w-5 text-blue-600" />
                      <h3 className="font-semibold text-gray-900">{subsection.name}</h3>
                    </div>
                    {progress[subsection.id as keyof typeof progress] && (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{subsection.questions} questions</p>
                  <button
                    onClick={() => {
                      setTimeout(() => {
                        onProgressUpdate({ ...progress, [subsection.id]: true });
                      }, 2000);
                    }}
                    disabled={progress[subsection.id as keyof typeof progress]}
                    className={`w-full py-2 rounded font-medium transition-all ${
                      progress[subsection.id as keyof typeof progress] ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {progress[subsection.id as keyof typeof progress] ? 'Completed' : 'Start'}
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button
                onClick={onSubmit}
                disabled={!allSubsectionsCompleted}
                className={`px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center space-x-2 ${
                  allSubsectionsCompleted
                    ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 hover:shadow-xl transform hover:-translate-y-1'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <CheckCircle className="h-5 w-5" />
                <span>Submit MCQ Round</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CodingTestView: React.FC<{
  test: Test;
  onSubmit: () => void;
  onBack: () => void;
}> = ({ test, onSubmit, onBack }) => {
  const codingSection = test.sections.find(s => s.type === 'coding');
  const [timeRemaining, setTimeRemaining] = useState(codingSection?.duration ? codingSection.duration * 60 : 3600);
  const [code, setCode] = useState('// Write your solution here\n');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold mb-1">Coding Round</h1>
                <p className="text-purple-100">{test.title}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/30">
                <div className="flex items-center space-x-2">
                  <Timer className="h-5 w-5" />
                  <span className="text-2xl font-bold">{formatTime(timeRemaining)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-8">
            <div className="mb-6">
              <button onClick={onBack} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ChevronLeft className="h-5 w-5" />
                <span className="font-medium">Back to Section Selection</span>
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">Problem 1: Two Sum</h2>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Description:</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
                  </p>
                  <h3 className="font-semibold text-gray-900 mb-2">Example:</h3>
                  <div className="bg-white rounded p-3 font-mono text-sm">
                    <p>Input: nums = [2,7,11,15], target = 9</p>
                    <p>Output: [0,1]</p>
                    <p className="text-gray-600">Explanation: nums[0] + nums[1] = 2 + 7 = 9</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Your Solution:</h3>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-96 p-4 font-mono text-sm border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                  placeholder="Write your code here..."
                />
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <button
                onClick={onSubmit}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-purple-700 hover:to-blue-700 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2"
              >
                <CheckCircle className="h-5 w-5" />
                <span>Submit Solution</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
