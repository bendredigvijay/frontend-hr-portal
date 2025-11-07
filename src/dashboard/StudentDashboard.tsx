// dashboard/dashboard.tsx (or StudentDashboard.tsx)
import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { BookOpen, User, LogOut, Home, TestTube } from 'lucide-react';
import companyConfig from './companyConfig.json';
import type{ Test, TestProgress, StudentStats } from './types';
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
        totalTests: 2,
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

  // Loading state for data fetching (not auth)
  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Different views for test flows
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

  // Main Dashboard View
  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Header */}
      <header className="w-full bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Campus Drive Portal</h1>
                  <p className="text-xs text-gray-600">{companyConfig.companyInfo.name}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
                <User className="h-4 w-4 text-blue-600" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-600">{user?.email}</p>
                </div>
              </div>
              <button onClick={logout} className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="w-full mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 inline-flex space-x-1">
            <button 
              onClick={() => setActiveTab('dashboard')} 
              className={`px-6 py-2.5 rounded-md font-medium transition-all duration-200 flex items-center space-x-2 ${
                activeTab === 'dashboard' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </button>
            <button 
              onClick={() => setActiveTab('tests')} 
              className={`px-6 py-2.5 rounded-md font-medium transition-all duration-200 flex items-center space-x-2 ${
                activeTab === 'tests' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <TestTube className="h-4 w-4" />
              <span>Available Tests</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="w-full">
          {activeTab === 'dashboard' && (
            <DashboardTab
              tests={tests}
              stats={stats}
              companyInfo={companyConfig.companyInfo}
              availablePositions={companyConfig.availablePositions}
              benefits={companyConfig.benefitsAndPerks}
              timeline={companyConfig.campusDriveTimeline}
            />
          )}
          {activeTab === 'tests' && <TestsTab tests={tests} onStartTest={startTest} />}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
