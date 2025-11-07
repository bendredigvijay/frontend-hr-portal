// dashboard/dashboard.tsx - FIXED TABS UI
import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { BookOpen, User, LogOut, Home, TestTube, Bell, Sparkles, Menu, X } from 'lucide-react';
import companyConfig from './companyConfig.json';
import type { Test, TestProgress, StudentStats } from './types';
import {
  DashboardTab,
  TestsTab,
  CountdownView,
  ThankYouView,
  TestSelectionView,
  MCQTestView,
  CodingTestView
} from './DashboardComponents';

const StudentDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [tests, setTests] = useState<Test[]>([]);
  const [stats, setStats] = useState<StudentStats>({
    testsCompleted: 0,
    averageScore: 0,
    totalTests: 0,
    rank: 0
  });
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tests'>('dashboard');
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'test-selection' | 'mcq-test' | 'coding-test' | 'countdown' | 'thank-you'>('dashboard');
  const [mcqProgress, setMcqProgress] = useState({
    aptitude: false,
    logical: false,
    verbal: false
  });
  const [testProgress, setTestProgress] = useState<TestProgress>({
    mcqCompleted: false,
    codingCompleted: false,
    mcqSubmitted: false,
    codingSubmitted: false,
    currentSection: null,
    bothCompleted: false
  });
  const [countdown, setCountdown] = useState(0);
  const [countdownTarget, setCountdownTarget] = useState<'mcq' | 'coding' | 'dashboard'>('mcq');
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    loadStudentData();
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && currentView === 'countdown') {
      handleCountdownComplete();
    }
  }, [countdown, currentView, countdownTarget]);

  const loadStudentData = async () => {
    setLoading(true);
    setTimeout(() => {
      setTests([
        {
          id: '1',
          title: 'Software Engineer Assessment 2025',
          description: 'Complete assessment with MCQ and Coding sections for Software Engineer position',
          duration: 120,
          totalQuestions: 32,
          status: 'available',
          deadline: new Date('2025-11-10T23:59:59'),
          sections: [
            {
              id: 'mcq-section',
              name: 'MCQ Round',
              type: 'mcq',
              duration: 60,
              questions: 30,
              description: 'Aptitude, Logical Reasoning, Verbal Ability',
              completed: false,
              subsections: [
                { id: 'aptitude', name: 'Aptitude', questions: 10, completed: false },
                { id: 'logical', name: 'Logical Reasoning', questions: 10, completed: false },
                { id: 'verbal', name: 'Verbal Ability', questions: 10, completed: false }
              ]
            },
            {
              id: 'coding-section',
              name: 'Coding Round',
              type: 'coding',
              duration: 60,
              questions: 2,
              description: 'Programming problem solving',
              completed: false
            }
          ]
        }
      ]);
      setStats({
        testsCompleted: 0,
        averageScore: 0,
        totalTests: 1,
        rank: 0
      });
      setLoading(false);
    }, 800);
  };

  const handleCountdownComplete = () => {
    if (countdownTarget === 'mcq') {
      setCurrentView('mcq-test');
    } else if (countdownTarget === 'coding') {
      setCurrentView('coding-test');
    } else if (countdownTarget === 'dashboard') {
      setCurrentView('dashboard');
      setActiveTab('dashboard');
    }
  };

  const resetTestProgress = () => {
    setTestProgress({
      mcqCompleted: false,
      codingCompleted: false,
      mcqSubmitted: false,
      codingSubmitted: false,
      currentSection: null,
      bothCompleted: false
    });
    setMcqProgress({
      aptitude: false,
      logical: false,
      verbal: false
    });
  };

  const startTest = (test: Test) => {
    setSelectedTest(test);
    resetTestProgress();
    setTestProgress(prev => ({
      ...prev,
      startTime: new Date()
    }));
    setCurrentView('test-selection');
    setActiveTab('tests');
  };

  const selectSection = (sectionType: 'mcq' | 'coding') => {
    setTestProgress(prev => ({
      ...prev,
      currentSection: sectionType,
      ...(sectionType === 'mcq' ? { mcqStartTime: new Date() } : { codingStartTime: new Date() })
    }));
    setCountdown(3);
    setCountdownTarget(sectionType);
    setCurrentView('countdown');
  };

  const handleMCQSubmit = async () => {
    setTestProgress(prev => ({
      ...prev,
      mcqCompleted: true,
      mcqSubmitted: true,
      mcqEndTime: new Date()
    }));
    if (testProgress.codingCompleted && testProgress.codingSubmitted) {
      setTestProgress(prev => ({ ...prev, bothCompleted: true }));
      setCurrentView('thank-you');
    } else {
      setCurrentView('test-selection');
    }
  };

  const handleCodingSubmit = async () => {
    setTestProgress(prev => ({
      ...prev,
      codingCompleted: true,
      codingSubmitted: true,
      codingEndTime: new Date()
    }));
    if (testProgress.mcqCompleted && testProgress.mcqSubmitted) {
      setTestProgress(prev => ({ ...prev, bothCompleted: true }));
      setCurrentView('thank-you');
    } else {
      setCurrentView('test-selection');
    }
  };

  const backToDashboard = () => {
    setCountdown(3);
    setCountdownTarget('dashboard');
    setCurrentView('countdown');
    setSelectedTest(null);
    resetTestProgress();
  };

  // 🎨 LOADING STATE
  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="text-center space-y-6 animate-fadeIn">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            </div>
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-200 border-t-blue-600 mx-auto"></div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xl font-bold text-gray-900 flex items-center justify-center space-x-2">
              <Sparkles className="h-5 w-5 text-yellow-500 animate-pulse" />
              <span>Loading Dashboard</span>
            </p>
            <p className="text-sm text-gray-600 font-medium">Preparing your experience...</p>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-pink-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Different views
  if (currentView === 'countdown') {
    return <CountdownView countdown={countdown} target={countdownTarget} testTitle={selectedTest?.title} />;
  }

  if (currentView === 'thank-you') {
    return <ThankYouView testTitle={selectedTest?.title} />;
  }

  if (currentView === 'test-selection' && selectedTest) {
    return <TestSelectionView test={selectedTest} progress={testProgress} onSelectSection={selectSection} onBack={backToDashboard} />;
  }

  if (currentView === 'mcq-test' && selectedTest) {
    return <MCQTestView test={selectedTest} progress={mcqProgress} onProgressUpdate={setMcqProgress} onSubmit={handleMCQSubmit} onBack={() => setCurrentView('test-selection')} />;
  }

  if (currentView === 'coding-test' && selectedTest) {
    return <CodingTestView test={selectedTest} onSubmit={handleCodingSubmit} onBack={() => setCurrentView('test-selection')} />;
  }

  // 🎨 MAIN DASHBOARD
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* 🎨 HEADER */}
      <header className="w-full bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-lg lg:text-xl font-bold text-gray-900">Campus Drive</h1>
                <p className="text-xs text-gray-600">{companyConfig.companyInfo.name}</p>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <button className="relative p-2 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 transition-all">
                <Bell className="h-5 w-5 text-blue-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200">
                <User className="h-4 w-4 text-blue-600" />
                <div className="text-left">
                  <p className="text-xs font-bold text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-600">{user?.email}</p>
                </div>
              </div>

              <button 
                onClick={logout} 
                className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl border border-red-200 transition-all text-sm flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>

            {/* Mobile Menu */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 bg-blue-50 rounded-xl border border-blue-200"
            >
              {mobileMenuOpen ? <X className="h-5 w-5 text-blue-600" /> : <Menu className="h-5 w-5 text-blue-600" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden py-3 border-t border-gray-200 animate-slideDown space-y-2">
              <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-xl border border-blue-200">
                <User className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-xs font-bold text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-600">{user?.email}</p>
                </div>
              </div>
              <button 
                onClick={logout}
                className="w-full px-4 py-2 bg-red-50 text-red-600 font-bold rounded-xl border border-red-200 text-sm flex items-center justify-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* 🎨 PROFESSIONAL TABS - FIXED */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex gap-2 bg-white rounded-xl shadow-md border border-gray-200 p-1.5">
            {/* Dashboard Tab */}
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </button>

            {/* Tests Tab */}
            <button
              onClick={() => setActiveTab('tests')}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2 relative ${
                activeTab === 'tests'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <TestTube className="h-4 w-4" />
              <span>Available Tests</span>
              {tests.filter(t => t.status === 'available').length > 0 && (
                <span className={`absolute -top-2 -right-2 h-5 w-5 rounded-full text-xs font-black flex items-center justify-center ${
                  activeTab === 'tests'
                    ? 'bg-white text-purple-600'
                    : 'bg-blue-600 text-white'
                }`}>
                  {tests.filter(t => t.status === 'available').length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* TAB CONTENT - SMOOTH TRANSITION */}
        <div className="w-full">
          {activeTab === 'dashboard' && (
            <div className="animate-fadeIn">
              <DashboardTab
                tests={tests}
                stats={stats}
                companyInfo={companyConfig.companyInfo}
                availablePositions={companyConfig.availablePositions}
                benefits={companyConfig.benefitsAndPerks}
                timeline={companyConfig.campusDriveTimeline}
              />
            </div>
          )}
          {activeTab === 'tests' && (
            <div className="animate-fadeIn">
              <TestsTab tests={tests} onStartTest={startTest} />
            </div>
          )}
        </div>
      </div>

      {/* 🎨 ANIMATIONS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default StudentDashboard;
