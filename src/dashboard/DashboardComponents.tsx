// DashboardComponents.tsx - COMPLETE ENHANCED UI
import React, { useEffect, useState } from 'react';
import {
  BookOpen, Clock, Play, CheckCircle, Calendar, BarChart3, Code, FileText, ArrowRight, ChevronLeft, Timer,
  Building2, MapPin, Users, Award, Target, Star, TrendingUp, Calendar as CalendarIcon, Briefcase, Globe, Phone, 
  Mail, Home, TestTube, CheckCircle as Check, Coffee, Sparkles, Zap, Shield, Trophy, Rocket, Brain
} from 'lucide-react';
import type { Test, TestProgress, StudentStats } from './types';

// ========== 🎨 DASHBOARD TAB ==========
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
    <div className="w-full space-y-6 animate-fadeIn">
      {/* Ultra Modern Hero */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl text-white p-8 overflow-hidden shadow-xl group">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex-1 space-y-3">
            <span className="inline-flex items-center space-x-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 text-sm font-medium">
              <Sparkles className="h-3 w-3 text-yellow-300" />
              <span>Campus 2025</span>
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
              Welcome to Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
                Career Journey
              </span>
            </h2>
            <p className="text-sm text-white/80">Land your dream job with {companyInfo.name}</p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-2xl blur-lg opacity-40"></div>
            <div className="relative bg-white/25 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-2xl">
              <div className="text-center space-y-2">
                <Rocket className="h-5 w-5 text-yellow-200 animate-bounce mx-auto" />
                <p className="text-5xl font-black text-white">{availableTests.length}</p>
                <p className="text-xs font-semibold text-white/70">Tests Ready</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Available', value: availableTests.length, icon: BookOpen, bg: 'from-blue-500 to-indigo-600' },
          { label: 'Total Tests', value: stats.totalTests, icon: BarChart3, bg: 'from-purple-500 to-pink-600' },
          { label: 'Time Left', value: '4 Days', icon: Clock, bg: 'from-orange-500 to-red-600' },
          { label: 'Success', value: '85%', icon: TrendingUp, bg: 'from-green-500 to-emerald-600' }
        ].map((stat, i) => (
          <div key={i} className="group relative bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div className={`bg-gradient-to-r ${stat.bg} p-3 rounded-lg shadow-lg group-hover:scale-110 transition-transform mb-3 w-fit`}>
              <stat.icon className="h-5 w-5 text-white" />
            </div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{stat.label}</p>
            <p className="text-2xl font-black text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Company Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 px-8 py-6">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-lg shadow-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Company</h3>
              <p className="text-xs text-gray-300">Meet your future employer</p>
            </div>
          </div>
        </div>
        <div className="p-8 space-y-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h4 className="text-2xl font-bold text-gray-900">{companyInfo.name}</h4>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Verified</span>
            </div>
            <p className="text-sm text-gray-600">{companyInfo.description}</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { icon: MapPin, label: 'HQ', value: companyInfo.address.city },
              { icon: Users, label: 'Team', value: `${companyInfo.employees}+` },
              { icon: Globe, label: 'Industry', value: companyInfo.industry },
              { icon: Trophy, label: 'Growth', value: 'Scaling' }
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all">
                <item.icon className="h-4 w-4 text-gray-400 mb-2" />
                <p className="text-xs font-bold text-gray-500 uppercase mb-1">{item.label}</p>
                <p className="text-sm font-bold text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Positions & Benefits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center space-x-3 mb-5">
            <Briefcase className="h-5 w-5 text-blue-600" />
            <h5 className="font-bold text-gray-900">Open Positions <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full ml-2">{availablePositions.length}</span></h5>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {availablePositions.map((pos) => (
              <div key={pos.id} className="bg-white rounded-lg p-4 border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-bold text-sm text-gray-900">{pos.title}</p>
                    <p className="text-xs text-gray-500">{pos.department}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">{pos.openings} open</span>
                </div>
                <p className="text-xs font-bold text-blue-600">₹{(pos.salaryRange.min/100000).toFixed(1)}-{(pos.salaryRange.max/100000).toFixed(1)} LPA</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
          <div className="flex items-center space-x-3 mb-5">
            <Award className="h-5 w-5 text-green-600" />
            <h5 className="font-bold text-gray-900">Benefits</h5>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {benefits.slice(0, 5).map((b) => (
              <div key={b.id} className="flex items-center space-x-3 bg-white rounded-lg p-4 border border-green-100 hover:border-green-300 hover:shadow-md transition-all">
                <span className="text-2xl">{b.icon}</span>
                <div>
                  <p className="text-sm font-bold text-gray-900">{b.title}</p>
                  <p className="text-xs text-gray-500">{b.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-200">
        <h5 className="font-bold text-gray-900 mb-5 flex items-center space-x-2">
          <CalendarIcon className="h-5 w-5 text-orange-600" />
          <span>Timeline</span>
        </h5>
        <div className="space-y-3">
          {timeline.map((item, i) => (
            <div key={i} className={`flex items-start space-x-4 bg-white rounded-lg p-5 border-2 ${item.status === 'current' ? 'border-green-400 shadow-md' : 'border-orange-100'}`}>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold shadow-md flex-shrink-0 ${item.status === 'current' ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                {item.step}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h6 className="font-bold text-gray-900 text-sm">{item.title}</h6>
                  {item.status === 'current' && <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">Active</span>}
                </div>
                <p className="text-xs text-gray-600 mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes blob { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-15px,15px) scale(0.95); } }
        .animate-blob { animation: blob 6s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

// ========== 🎨 TESTS TAB ==========
export const TestsTab: React.FC<{ tests: Test[]; onStartTest: (test: Test) => void }> = ({ tests, onStartTest }) => {
  const availableTests = tests.filter(t => t.status === 'available');
  const completedTests = tests.filter(t => t.status === 'completed');
  const inProgressTests = tests.filter(t => t.status === 'in-progress');

  return (
    <div className="space-y-6">
      {availableTests.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2 mb-4">
            <div className="bg-blue-600 p-2 rounded-lg"><Play className="h-4 w-4 text-white" /></div>
            <span>Available Tests</span>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">{availableTests.length}</span>
          </h3>
          {availableTests.map(test => (
            <div key={test.id} className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all mb-4 group">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="text-lg font-bold text-gray-900">{test.title}</h4>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">New</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{test.description}</p>
                  <div className="flex flex-wrap gap-3 mb-3">
                    <div className="flex items-center space-x-1 text-xs bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                      <Clock className="h-3 w-3 text-blue-600" />
                      <span className="text-gray-700">{test.duration} mins</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs bg-purple-50 px-3 py-1 rounded-lg border border-purple-200">
                      <FileText className="h-3 w-3 text-purple-600" />
                      <span className="text-gray-700">{test.totalQuestions} Qs</span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {test.sections.map(s => (
                      <span key={s.id} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-200 font-medium">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => onStartTest(test)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all font-bold text-sm flex items-center space-x-2 group-hover:scale-105 whitespace-nowrap"
                >
                  <Play className="h-4 w-4" />
                  <span>Start Test</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {inProgressTests.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2 mb-4">
            <div className="bg-orange-600 p-2 rounded-lg"><Timer className="h-4 w-4 text-white" /></div>
            <span>In Progress</span>
          </h3>
          {inProgressTests.map(test => (
            <div key={test.id} className="bg-orange-50 rounded-xl border border-orange-300 p-5 mb-4 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-gray-900">{test.title}</h4>
                <p className="text-sm text-gray-600">Resume your test</p>
              </div>
              <button onClick={() => onStartTest(test)} className="bg-orange-600 text-white px-5 py-2 rounded-lg font-bold text-sm flex items-center space-x-2">
                <Play className="h-4 w-4" />
                <span>Resume</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {completedTests.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2 mb-4">
            <div className="bg-green-600 p-2 rounded-lg"><CheckCircle className="h-4 w-4 text-white" /></div>
            <span>Completed</span>
          </h3>
          {completedTests.map(test => (
            <div key={test.id} className="bg-green-50 rounded-xl border border-green-300 p-5 mb-4 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-gray-900">{test.title}</h4>
                <p className="text-sm text-gray-600">Score: {test.score}%</p>
              </div>
              <div className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-lg">{test.score}%</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ========== 🎨 COUNTDOWN VIEW (FIXED) ==========
export const CountdownView: React.FC<{ countdown: number; target: string; testTitle?: string }> = ({ countdown, target, testTitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="text-center space-y-6 animate-fadeIn">
        {/* Countdown Box - Digit in Square */}
        <div className="flex justify-center">
          <div className="w-40 h-40 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl shadow-2xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 blur-2xl animate-pulse"></div>
            <span className="relative text-7xl font-black text-white drop-shadow-lg">{countdown}</span>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900">
          {target === 'mcq' ? 'Starting MCQ Round...' : target === 'coding' ? 'Starting Coding Round...' : 'Going Back...'}
        </h2>
        {testTitle && <p className="text-gray-600 text-sm">{testTitle}</p>}
      </div>
    </div>
  );
};

// ========== 🎨 THANK YOU VIEW ==========
export const ThankYouView: React.FC<{ testTitle?: string }> = ({ testTitle }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
    <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8 text-white text-center">
        <CheckCircle className="h-16 w-16 text-white mx-auto mb-4" />
        <h2 className="text-2xl font-black">Congratulations!</h2>
        <p className="text-sm text-green-100 mt-1">Assessment Completed</p>
      </div>
      <div className="p-8 space-y-5">
        <p className="text-sm text-gray-700 font-medium text-center">{testTitle}</p>
        <div className="bg-blue-50 rounded-lg p-4 space-y-2 border border-blue-200">
          <p className="text-xs font-bold text-gray-700 uppercase">What's Next?</p>
          <ul className="space-y-2 text-xs text-gray-600">
            <li className="flex items-start space-x-2">
              <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Results within 3-5 business days</span>
            </li>
            <li className="flex items-start space-x-2">
              <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Check your email for updates</span>
            </li>
          </ul>
        </div>
        <div className="text-center">
          <Coffee className="h-6 w-6 text-blue-600 mx-auto mb-2" />
          <p className="text-xs text-gray-600">Take a well-deserved break!</p>
        </div>
      </div>
    </div>
  </div>
);

// ========== 🎨 TEST SELECTION VIEW (ENHANCED) ==========
export const TestSelectionView: React.FC<{
  test: Test;
  progress: TestProgress;
  onSelectSection: (type: 'mcq' | 'coding') => void;
  onBack: () => void;
}> = ({ test, progress, onSelectSection, onBack }) => {
  const mcq = test.sections.find(s => s.type === 'mcq');
  const coding = test.sections.find(s => s.type === 'coding');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 text-sm font-medium hover:bg-gray-100 px-3 py-2 rounded-lg transition-all">
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </button>
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">{test.title}</h1>
            <p className="text-blue-100 text-base">{test.description}</p>
            <div className="flex gap-6 mt-4 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Total: {test.duration} mins</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Questions: {test.totalQuestions}</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Select Section to Begin</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* MCQ Section */}
              {mcq && (
                <div className={`rounded-2xl border-2 p-8 transition-all ${progress.mcqSubmitted ? 'border-green-400 bg-green-50' : 'border-blue-400 bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-xl hover:-translate-y-2'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-blue-600 p-4 rounded-xl">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    {progress.mcqSubmitted && <CheckCircle className="h-7 w-7 text-green-600" />}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{mcq.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{mcq.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 font-medium">Duration:</span>
                      <span className="font-bold text-gray-900 bg-white px-3 py-1 rounded-lg">{mcq.duration} minutes</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 font-medium">Total Questions:</span>
                      <span className="font-bold text-gray-900 bg-white px-3 py-1 rounded-lg">{mcq.questions}</span>
                    </div>
                    {mcq.subsections && (
                      <div className="border-t border-gray-200 pt-3">
                        <p className="text-xs font-bold text-gray-600 uppercase mb-2">Subsections:</p>
                        <div className="flex flex-wrap gap-2">
                          {mcq.subsections.map(sub => (
                            <span key={sub.id} className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                              {sub.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => onSelectSection('mcq')}
                    disabled={progress.mcqSubmitted}
                    className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all ${
                      progress.mcqSubmitted 
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:-translate-y-1'
                    }`}
                  >
                    {progress.mcqSubmitted ? (
                      <>
                        <CheckCircle className="h-5 w-5" />
                        <span>Already Completed</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5" />
                        <span>Start MCQ Round</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Coding Section */}
              {coding && (
                <div className={`rounded-2xl border-2 p-8 transition-all ${progress.codingSubmitted ? 'border-green-400 bg-green-50' : 'border-purple-400 bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-xl hover:-translate-y-2'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-purple-600 p-4 rounded-xl">
                      <Code className="h-6 w-6 text-white" />
                    </div>
                    {progress.codingSubmitted && <CheckCircle className="h-7 w-7 text-green-600" />}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{coding.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{coding.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 font-medium">Duration:</span>
                      <span className="font-bold text-gray-900 bg-white px-3 py-1 rounded-lg">{coding.duration} minutes</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 font-medium">Problems:</span>
                      <span className="font-bold text-gray-900 bg-white px-3 py-1 rounded-lg">{coding.questions}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectSection('coding')}
                    disabled={progress.codingSubmitted}
                    className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all ${
                      progress.codingSubmitted 
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:-translate-y-1'
                    }`}
                  >
                    {progress.codingSubmitted ? (
                      <>
                        <CheckCircle className="h-5 w-5" />
                        <span>Already Completed</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5" />
                        <span>Start Coding Round</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {progress.mcqSubmitted && progress.codingSubmitted && (
              <div className="mt-8 bg-green-50 border-2 border-green-400 rounded-2xl p-6 text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-gray-900">All Sections Completed!</h3>
                <p className="text-gray-600 text-sm mt-1">You have successfully completed all sections. Proceed to submit.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ========== 🎨 MCQ TEST VIEW ==========
export const MCQTestView: React.FC<{
  test: Test;
  progress: { aptitude: boolean; logical: boolean; verbal: boolean };
  onProgressUpdate: (p: any) => void;
  onSubmit: () => void;
  onBack: () => void;
}> = ({ test, progress, onProgressUpdate, onSubmit, onBack }) => {
  const mcq = test.sections.find(s => s.type === 'mcq');
  const [time, setTime] = useState((mcq?.duration || 60) * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) { clearInterval(timer); onSubmit(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onSubmit]);

  const fmt = (s: number) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;
  const allDone = progress.aptitude && progress.logical && progress.verbal;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">MCQ Round</h1>
              <p className="text-blue-100 text-sm">{test.title}</p>
            </div>
            <div className="bg-white/30 backdrop-blur-md px-6 py-3 rounded-xl border border-white/40">
              <div className="text-center">
                <Timer className="h-4 w-4 inline mr-2" />
                <span className="text-3xl font-black">{fmt(time)}</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <button onClick={onBack} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 text-sm font-medium hover:bg-gray-100 px-3 py-2 rounded-lg transition-all">
              <ChevronLeft className="h-4 w-4" />
              <span>Back to Sections</span>
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-8">Complete All Subsections</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { id: 'aptitude', name: 'Aptitude', icon: Brain, qs: 10, color: 'blue' },
                { id: 'logical', name: 'Logical Reasoning', icon: BarChart3, qs: 10, color: 'purple' },
                { id: 'verbal', name: 'Verbal Ability', icon: BookOpen, qs: 10, color: 'green' }
              ].map(sub => (
                <div key={sub.id} className={`border-2 rounded-xl p-5 transition-all ${
                  progress[sub.id as keyof typeof progress] 
                    ? 'border-green-400 bg-green-50' 
                    : `border-${sub.color}-300 bg-${sub.color}-50`
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <sub.icon className={`h-5 w-5 text-${sub.color}-600`} />
                      <h3 className="font-bold text-gray-900 text-sm">{sub.name}</h3>
                    </div>
                    {progress[sub.id as keyof typeof progress] && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-4 font-medium">{sub.qs} questions</p>
                  <button
                    onClick={() => setTimeout(() => onProgressUpdate({ ...progress, [sub.id]: true }), 2000)}
                    disabled={progress[sub.id as keyof typeof progress]}
                    className={`w-full py-2.5 rounded-lg font-bold text-xs transition-all ${
                      progress[sub.id as keyof typeof progress]
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : `bg-${sub.color}-600 text-white hover:bg-${sub.color}-700 hover:shadow-md`
                    }`}
                  >
                    {progress[sub.id as keyof typeof progress] ? 'Completed ✓' : 'Start Section'}
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <button
                onClick={onSubmit}
                disabled={!allDone}
                className={`px-10 py-4 rounded-xl font-bold text-base flex items-center space-x-3 transition-all ${
                  allDone
                    ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:shadow-2xl hover:-translate-y-1'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
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

// ========== 🎨 CODING TEST VIEW ==========
export const CodingTestView: React.FC<{
  test: Test;
  onSubmit: () => void;
  onBack: () => void;
}> = ({ test, onSubmit, onBack }) => {
  const coding = test.sections.find(s => s.type === 'coding');
  const [time, setTime] = useState((coding?.duration || 60) * 60);
  const [code, setCode] = useState('// Write your solution here\n');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) { clearInterval(timer); onSubmit(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onSubmit]);

  const fmt = (s: number) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-4 animate-fadeIn">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Coding Round</h1>
              <p className="text-purple-100 text-sm">{test.title}</p>
            </div>
            <div className="bg-white/30 backdrop-blur-md px-6 py-3 rounded-xl border border-white/40">
              <div className="text-center">
                <Timer className="h-4 w-4 inline mr-2" />
                <span className="text-3xl font-black">{fmt(time)}</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <button onClick={onBack} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 text-sm font-medium hover:bg-gray-100 px-3 py-2 rounded-lg transition-all">
              <ChevronLeft className="h-4 w-4" />
              <span>Back to Sections</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">Problem: Two Sum</h2>
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-gray-200 space-y-4">
                  <div>
                    <p className="font-bold text-gray-900 text-sm mb-2">Description:</p>
                    <p className="text-gray-700 text-sm">Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume each input has exactly one solution.</p>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="font-bold text-gray-900 text-sm mb-3">Example:</p>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-xs space-y-1">
                      <p>Input: nums = [2,7,11,15], target = 9</p>
                      <p>Output: [0,1]</p>
                      <p className="text-gray-400">Explanation: nums[0] + nums[1] = 2 + 7 = 9</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="font-bold text-gray-900">Write Your Solution:</p>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-64 p-4 font-mono text-sm border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none bg-gray-50 hover:bg-white transition-colors resize-none"
                  placeholder="// Write your solution here"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={onSubmit}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-4 rounded-xl font-bold text-base flex items-center space-x-3 hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                <CheckCircle className="h-5 w-5" />
                <span>Submit Coding Round</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default { DashboardTab, TestsTab, CountdownView, ThankYouView, TestSelectionView, MCQTestView, CodingTestView };
