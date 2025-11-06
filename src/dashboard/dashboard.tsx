// components/StudentDashboard.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {
  BookOpen, Clock, User, LogOut, Play,
  CheckCircle, Calendar, BarChart3,
  Code, FileText, ArrowRight, ChevronLeft, Timer,
  Building2, MapPin, Users, Award, Target, Star,
  TrendingUp, Calendar as CalendarIcon,
  Briefcase, Globe, Phone, Mail, Home, TestTube,
  AlertCircle, Coffee
} from 'lucide-react';

// Import your JSON config (you can also fetch this from API)
import companyConfig from './ompanyConfig.json';

interface MCQSubsection {
  id: string;
  name: string;
  questions: number;
  completed: boolean;
  timeSpent?: number;
  score?: number;
}

interface TestSection {
  id: string;
  name: string;
  type: 'mcq' | 'coding';
  duration: number;
  questions: number;
  description: string;
  subsections?: MCQSubsection[];
  completed: boolean;
  timeSpent?: number;
  score?: number;
}

interface Test {
  id: string;
  title: string;
  description: string;
  duration: number;
  totalQuestions: number;
  status: 'available' | 'completed' | 'in-progress';
  score?: number;
  completedAt?: Date;
  deadline: Date;
  sections: TestSection[];
  attemptId?: string;
}

interface TestProgress {
  mcqCompleted: boolean;
  codingCompleted: boolean;
  mcqSubmitted: boolean;
  codingSubmitted: boolean;
  currentSection: 'mcq' | 'coding' | null;
  bothCompleted: boolean;
  startTime?: Date;
  mcqStartTime?: Date;
  codingStartTime?: Date;
  mcqEndTime?: Date;
  codingEndTime?: Date;
}

interface StudentStats {
  testsCompleted: number;
  averageScore: number;
  totalTests: number;
  rank: number;
}

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
    try {
      setLoading(true);
      // In real app, fetch from API
      // const response = await fetch('/api/student/dashboard');
      // const data = await response.json();
      
      // Mock data for now
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
              description: 'Aptitude, Logical Reasoning & Verbal Ability',
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
        },
        {
          id: '2',
          title: 'Frontend Developer Assessment',
          description: 'Assessment for Frontend Developer position focusing on React and JavaScript',
          duration: 90,
          totalQuestions: 25,
          status: 'available',
          deadline: new Date('2025-11-12T23:59:59'),
          sections: [
            {
              id: 'technical-mcq',
              name: 'Technical MCQ',
              type: 'mcq',
              duration: 45,
              questions: 20,
              description: 'React, JavaScript, CSS fundamentals',
              completed: false,
              subsections: [
                { id: 'react', name: 'React Concepts', questions: 8, completed: false },
                { id: 'javascript', name: 'JavaScript', questions: 7, completed: false },
                { id: 'css', name: 'CSS & HTML', questions: 5, completed: false }
              ]
            },
            {
              id: 'frontend-coding',
              name: 'Frontend Challenge',
              type: 'coding',
              duration: 45,
              questions: 3,
              description: 'UI component development',
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
    } catch (error) {
      console.error('Error loading student data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCountdownComplete = () => {
    if (countdownTarget === 'mcq') {
      setCurrentView('mcq-test');
    } else if (countdownTarget === 'coding') {
      setCurrentView('coding-test');
    } else if (countdownTarget === 'dashboard') {
      setCurrentView('dashboard');
      resetTestProgress();
    }
  };

  const resetTestProgress = () => {
    setSelectedTest(null);
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
    setTestProgress(prev => ({ ...prev, startTime: new Date() }));
    setCurrentView('test-selection');
  };

  const selectSection = (sectionType: 'mcq' | 'coding') => {
    // Check restrictions based on company config rules
    const rules = companyConfig.testConfiguration.rules;
    
    if (!rules.canSwitchSections) {
      if (sectionType === 'mcq' && testProgress.codingCompleted && !testProgress.codingSubmitted) {
        alert('Please complete and submit the Coding round first!');
        return;
      }
      
      if (sectionType === 'coding' && testProgress.mcqCompleted && !testProgress.mcqSubmitted) {
        alert('Please complete and submit the MCQ round first!');
        return;
      }
    }

    setTestProgress(prev => ({ 
      ...prev, 
      currentSection: sectionType,
      [`${sectionType}StartTime`]: new Date()
    }));
    
    if (sectionType === 'mcq') {
      setCurrentView('mcq-test');
    } else {
      setCurrentView('coding-test');
    }
  };

  const handleMCQSubmit = async () => {
    try {
      // Save MCQ results to backend
      const mcqResults = {
        testId: selectedTest?.id,
        sectionId: 'mcq-section',
        userId: user?.id,
        answers: mcqProgress,
        timeSpent: testProgress.mcqStartTime ? 
          new Date().getTime() - testProgress.mcqStartTime.getTime() : 0,
        submittedAt: new Date()
      };

      // await saveMCQResults(mcqResults);

      setTestProgress(prev => ({ 
        ...prev, 
        mcqCompleted: true, 
        mcqSubmitted: true,
        mcqEndTime: new Date(),
        currentSection: null 
      }));
      
      // Start countdown to switch to coding round
      setCountdownTarget('coding');
      setCountdown(companyConfig.testConfiguration.rules.countdownBeforeSwitch);
      setCurrentView('countdown');
    } catch (error) {
      console.error('Error submitting MCQ:', error);
      alert('Error submitting test. Please try again.');
    }
  };

  const handleCodingSubmit = async () => {
    try {
      // Save coding results to backend
      const codingResults = {
        testId: selectedTest?.id,
        sectionId: 'coding-section',
        userId: user?.id,
        solutions: [], // Add actual coding solutions
        timeSpent: testProgress.codingStartTime ? 
          new Date().getTime() - testProgress.codingStartTime.getTime() : 0,
        submittedAt: new Date()
      };

      // await saveCodingResults(codingResults);

      setTestProgress(prev => ({ 
        ...prev, 
        codingCompleted: true, 
        codingSubmitted: true,
        codingEndTime: new Date(),
        currentSection: null 
      }));
      
      // Check if both sections are completed
      if (testProgress.mcqSubmitted) {
        // Both completed - show thank you
        setCurrentView('thank-you');
        setTimeout(() => {
          setCountdownTarget('dashboard');
          setCountdown(companyConfig.testConfiguration.rules.countdownBeforeSwitch);
          setCurrentView('countdown');
        }, 3000);
      } else {
        // Switch to MCQ round
        setCountdownTarget('mcq');
        setCountdown(companyConfig.testConfiguration.rules.countdownBeforeSwitch);
        setCurrentView('countdown');
      }
    } catch (error) {
      console.error('Error submitting coding test:', error);
      alert('Error submitting test. Please try again.');
    }
  };

  const backToDashboard = () => {
    setCurrentView('dashboard');
    resetTestProgress();
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center bg-white p-8 rounded-xl shadow-xl border border-gray-200">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Dashboard...</h2>
          <p className="text-gray-600">Please wait while we prepare your portal</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center bg-white p-8 rounded-xl shadow-xl border border-gray-200">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600">Please log in to access the dashboard</p>
        </div>
      </div>
    );
  }

  // Countdown View
  if (currentView === 'countdown') {
    return (
      <CountdownView 
        countdown={countdown} 
        target={countdownTarget}
        testTitle={selectedTest?.title || ''}
      />
    );
  }

  // Thank You View
  if (currentView === 'thank-you') {
    return <ThankYouView testTitle={selectedTest?.title || ''} />;
  }

  // Test Views
  if (currentView === 'test-selection' && selectedTest) {
    return (
      <TestSelectionView
        test={selectedTest}
        testProgress={testProgress}
        onSelectSection={selectSection}
        onBack={backToDashboard}
        config={companyConfig.testConfiguration}
      />
    );
  }

  if (currentView === 'mcq-test' && selectedTest) {
    return (
      <MCQTestView
        test={selectedTest}
        mcqProgress={mcqProgress}
        onCompleteMCQSubsection={(id) => setMcqProgress(prev => ({ ...prev, [id]: true }))}
        onSubmitMCQ={handleMCQSubmit}
        canSubmitMCQ={() => Object.values(mcqProgress).every(Boolean)}
        onBack={() => setCurrentView('test-selection')}
        config={companyConfig.testConfiguration.sections.mcq}
      />
    );
  }

  if (currentView === 'coding-test' && selectedTest) {
    return (
      <CodingTestView
        test={selectedTest}
        onBack={() => setCurrentView('test-selection')}
        onSubmit={handleCodingSubmit}
        config={companyConfig.testConfiguration.sections.coding}
      />
    );
  }

  // Main Dashboard
  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Professional Header */}
      <header className="w-full bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Campus Drive Portal</h1>
                <p className="text-xs text-gray-500">{companyConfig.companyInfo.shortName} Assessment</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3 bg-gray-50 px-3 py-2 rounded-lg">
                <User className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">Student</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:block text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Professional Tab Navigation */}
        <div className="w-full mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1 max-w-md mx-auto">
            <div className="flex relative">
              <div 
                className={`absolute top-1 bottom-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg transition-all duration-300 ease-in-out ${
                  activeTab === 'dashboard' ? 'left-1 right-1/2 mr-0.5' : 'right-1 left-1/2 ml-0.5'
                }`}
              />
              
              {[
                { 
                  id: 'dashboard', 
                  label: 'Dashboard', 
                  icon: Home, 
                  desc: 'Company Overview & Info'
                },
                { 
                  id: 'tests', 
                  label: 'Available Tests', 
                  icon: TestTube, 
                  desc: 'Assessment Center'
                }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`relative flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 flex-1 ${
                      isActive
                        ? 'text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <div className="text-center">
                      <div className="text-sm font-semibold">{tab.label}</div>
                      <div className={`text-xs ${
                        isActive ? 'text-blue-100' : 'text-gray-400'
                      }`}>
                        {tab.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content */}
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

// Dashboard Tab Component
const DashboardTab: React.FC<{ 
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
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Company Details */}
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                  <span>{companyInfo.name}</span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                    ✓ Verified
                  </span>
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">{companyInfo.description}</p>
              </div>
              
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

              {/* Contact Information */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h5 className="font-medium text-gray-800 text-sm mb-2 flex items-center space-x-2">
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
                    <span className="text-gray-700">{companyInfo.website}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Opportunities & Benefits */}
            <div className="space-y-4">
              {/* Available Positions from JSON */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="flex items-center space-x-2 mb-3">
                  <Briefcase className="h-4 w-4 text-blue-600" />
                  <h5 className="text-sm font-semibold text-gray-800">Available Positions ({availablePositions.length})</h5>
                </div>
                <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                  {availablePositions.map((position) => (
                    <div key={position.id} className="bg-white rounded p-3 border border-blue-200 text-xs">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-2">
                          <Code className="h-3 w-3 text-blue-600 mt-0.5" />
                          <div>
                            <span className="font-medium text-gray-800 block">{position.title}</span>
                            <p className="text-gray-600">{position.department} • {position.experience}</p>
                            <p className="text-blue-600 font-medium">
                              ₹{(position.salaryRange.min / 100000).toFixed(1)} - {(position.salaryRange.max / 100000).toFixed(1)} LPA
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits from JSON */}
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

              {/* Timeline from JSON */}
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
                <div className="flex items-center space-x-2 mb-3">
                  <CalendarIcon className="h-4 w-4 text-orange-600" />
                  <h5 className="text-sm font-semibold text-gray-800">Campus Drive Timeline</h5>
                </div>
                <div className="space-y-2">
                  {timeline.map((item) => (
                    <div key={item.step} className="flex items-center space-x-3 bg-white rounded p-3 border border-orange-200">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                        item.status === 'current' 
                          ? 'bg-green-100 text-green-700 border-2 border-green-300' 
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {item.status === 'current' ? '▶' : item.step}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 text-xs">{item.title}</p>
                        <p className="text-gray-600 text-xs">{item.description}</p>
                        <p className="text-gray-500 text-xs">{item.duration}</p>
                      </div>
                      {item.status === 'current' && (
                        <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                          Active
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
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

// Tests Tab Component
const TestsTab: React.FC<{ 
  tests: Test[]; 
  onStartTest: (test: Test) => void 
}> = ({ tests, onStartTest }) => {
  const availableTests = tests.filter(t => t.status === 'available');

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">📝 Available Assessments</h2>
            <p className="text-blue-100 mb-1">Complete all assessments to be considered for positions</p>
            <p className="text-blue-200 text-sm">Show your skills and join TechCorp Solutions</p>
          </div>
          <div className="mt-4 lg:mt-0 bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <Timer className="h-4 w-4 text-blue-200" />
                <p className="text-blue-100 text-sm font-medium">Tests Available</p>
              </div>
              <p className="text-2xl font-bold">{availableTests.length}</p>
              <p className="text-blue-200 text-xs">Ready to attempt</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tests */}
      {availableTests.length > 0 ? (
        <div className="space-y-6">
          {availableTests.map((test, index) => (
            <div key={test.id} className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="flex flex-col xl:flex-row justify-between items-start space-y-4 xl:space-y-0 xl:space-x-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{test.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded border border-green-200">
                            ✅ Available Now
                          </span>
                          <span className="text-xs text-gray-500">Priority: High</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">{test.description}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                      <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                        <div className="flex items-center space-x-2 mb-1">
                          <Clock className="h-4 w-4 text-blue-600" />
                          <span className="text-xs font-medium text-gray-600">Duration</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">{test.duration} min</p>
                      </div>
                      
                      <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                        <div className="flex items-center space-x-2 mb-1">
                          <BookOpen className="h-4 w-4 text-purple-600" />
                          <span className="text-xs font-medium text-gray-600">Questions</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">{test.totalQuestions}</p>
                      </div>
                      
                      <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                        <div className="flex items-center space-x-2 mb-1">
                          <Calendar className="h-4 w-4 text-red-600" />
                          <span className="text-xs font-medium text-gray-600">Deadline</span>
                        </div>
                        <p className="text-sm font-bold text-gray-900">{test.deadline.toLocaleDateString()}</p>
                      </div>
                    </div>

                    {/* Test Sections */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <h5 className="text-sm font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-600" />
                        <span>Assessment Sections</span>
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {test.sections.map((section) => (
                          <div key={section.id} className="bg-white rounded-lg p-3 border border-gray-200">
                            <div className="flex items-start space-x-3">
                              <div className={`p-2 rounded-lg ${
                                section.type === 'mcq' 
                                  ? 'bg-blue-100 text-blue-600' 
                                  : 'bg-purple-100 text-purple-600'
                              }`}>
                                {section.type === 'mcq' ? 
                                  <FileText className="h-4 w-4" /> : 
                                  <Code className="h-4 w-4" />
                                }
                              </div>
                              <div className="flex-1">
                                <h6 className="font-medium text-gray-800 text-sm">{section.name}</h6>
                                <p className="text-gray-600 mb-2 text-xs">{section.description}</p>
                                <div className="flex items-center space-x-3 text-xs text-gray-500">
                                  <span>{section.questions} questions</span>
                                  <span>{section.duration} min</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Section */}
                  <div className="xl:w-64 w-full">
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200 text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-800 text-sm">Ready to Start</span>
                      </div>
                      <p className="text-gray-600 text-xs mb-4">All requirements met. Begin now.</p>
                      
                      <button
                        onClick={() => onStartTest(test)}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium text-sm shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                      >
                        <Play className="h-4 w-4" />
                        <span>Start Assessment</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                      <p className="text-xs text-gray-500 mt-2">Auto-save enabled</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-gray-200 mt-3">
                      <h6 className="font-medium text-gray-800 text-sm mb-3">Assessment Tips</h6>
                      <div className="space-y-2 text-xs text-gray-600">
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                          <span>Read questions carefully</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                          <span>Manage your time wisely</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                          <span>Review before submitting</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-200">
          <div className="bg-gray-100 rounded-full p-6 w-20 h-20 mx-auto mb-4">
            <BookOpen className="h-8 w-8 text-gray-400 mx-auto" />
          </div>
          <h4 className="text-xl font-semibold text-gray-700 mb-2">No Tests Available</h4>
          <p className="text-gray-500">All assessments have been completed</p>
          <p className="text-gray-400 text-sm mt-2">Check back later for new opportunities</p>
        </div>
      )}
    </div>
  );
};

// Countdown Component
const CountdownView: React.FC<{
  countdown: number;
  target: 'mcq' | 'coding' | 'dashboard';
  testTitle: string;
}> = ({ countdown, target, testTitle }) => {
  const getTargetMessage = () => {
    switch (target) {
      case 'mcq':
        return 'Switching to MCQ Round...';
      case 'coding':
        return 'Switching to Coding Round...';
      case 'dashboard':
        return 'Returning to Dashboard...';
      default:
        return 'Loading...';
    }
  };

  const getTargetIcon = () => {
    switch (target) {
      case 'mcq':
        return <FileText className="h-8 w-8" />;
      case 'coding':
        return <Code className="h-8 w-8" />;
      case 'dashboard':
        return <Home className="h-8 w-8" />;
      default:
        return <Coffee className="h-8 w-8" />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border border-gray-200 max-w-md w-full mx-4">
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-32 h-32 rounded-full flex items-center justify-center text-5xl font-bold mx-auto mb-8 animate-pulse shadow-2xl">
            {countdown}
          </div>
          <div className="bg-gray-100 p-4 rounded-2xl mb-6">
            <div className="flex items-center justify-center mb-2">
              {getTargetIcon()}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{getTargetMessage()}</h2>
            <p className="text-gray-600 font-medium">{testTitle}</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-1000 shadow-sm"
            style={{ width: `${((3 - countdown) / 3) * 100}%` }}
          ></div>
        </div>
        <p className="text-gray-500 text-sm mt-4">Please wait while we prepare the next section...</p>
      </div>
    </div>
  );
};

// Thank You Component
const ThankYouView: React.FC<{
  testTitle: string;
}> = ({ testTitle }) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border border-gray-200 max-w-lg w-full mx-4">
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <CheckCircle className="h-16 w-16" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">🎉 Congratulations!</h2>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Assessment Completed Successfully</h3>
          <p className="text-gray-600 mb-6 font-medium">{testTitle}</p>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
            <h4 className="font-bold text-gray-800 mb-3">What's Next?</h4>
            <div className="text-sm text-gray-700 space-y-2">
              <p className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Your responses have been submitted successfully</span>
              </p>
              <p className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span>Results will be communicated within 2-3 business days</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-purple-600" />
                <span>Check your email for further updates</span>
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-sm text-gray-500 flex items-center justify-center space-x-2">
            <Coffee className="h-4 w-4" />
            <span>Redirecting to dashboard...</span>
          </p>
        </div>
      </div>
    </div>
  );
};

// Test Selection View with enhanced progress tracking
const TestSelectionView: React.FC<{
  test: Test;
  testProgress: TestProgress;
  onSelectSection: (type: 'mcq' | 'coding') => void;
  onBack: () => void;
  config: any;
}> = ({ test, testProgress, onSelectSection, onBack, config }) => {
  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 lg:p-6">
      <div className="w-full max-w-5xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors px-4 py-3 rounded-lg hover:bg-blue-50"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </button>
        
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">{test.title}</h1>
            <p className="text-gray-600 text-base">{test.description}</p>
          </div>
          
          {/* Enhanced Progress Indicator */}
          <div className="mb-8 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <span>Test Progress</span>
            </h3>
            <div className="flex items-center justify-between">
              <div className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                testProgress.mcqSubmitted 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : testProgress.currentSection === 'mcq'
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {testProgress.mcqSubmitted ? (
                  <CheckCircle className="h-5 w-5" />
                ) : testProgress.currentSection === 'mcq' ? (
                  <Play className="h-5 w-5" />
                ) : (
                  <Clock className="h-5 w-5" />
                )}
                <span className="font-semibold">MCQ Round</span>
                {testProgress.mcqSubmitted && <span className="text-xs bg-green-200 px-2 py-1 rounded">✓ Completed</span>}
              </div>
              
              <div className="flex-1 mx-4">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
                    style={{ width: `${testProgress.mcqSubmitted && testProgress.codingSubmitted ? 100 : testProgress.mcqSubmitted ? 50 : 0}%` }}
                  ></div>
                </div>
              </div>
              
              <div className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                testProgress.codingSubmitted 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : testProgress.currentSection === 'coding'
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {testProgress.codingSubmitted ? (
                  <CheckCircle className="h-5 w-5" />
                ) : testProgress.currentSection === 'coding' ? (
                  <Play className="h-5 w-5" />
                ) : (
                  <Clock className="h-5 w-5" />
                )}
                <span className="font-semibold">Coding Round</span>
                {testProgress.codingSubmitted && <span className="text-xs bg-green-200 px-2 py-1 rounded">✓ Completed</span>}
              </div>
            </div>
          </div>

          {/* Test Configuration Info */}
          <div className="mb-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              <span>Test Instructions</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span>Total Duration: <strong>{config.totalDuration} minutes</strong></span>
                </p>
                <p className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span>MCQ Section: <strong>{config.sections.mcq.duration} minutes</strong></span>
                </p>
                <p className="flex items-center space-x-2">
                  <Code className="h-4 w-4 text-blue-600" />
                  <span>Coding Section: <strong>{config.sections.coding.duration} minutes</strong></span>
                </p>
              </div>
              <div className="space-y-2">
                <p className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <span>Cannot switch sections without submitting</span>
                </p>
                <p className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Auto-save enabled</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Timer className="h-4 w-4 text-red-600" />
                  <span>Auto-submit when time ends</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {test.sections.map((section) => {
              const isDisabled = (
                (section.type === 'mcq' && testProgress.codingCompleted && !testProgress.codingSubmitted) ||
                (section.type === 'coding' && testProgress.mcqCompleted && !testProgress.mcqSubmitted)
              );
              
              const isCompleted = (
                (section.type === 'mcq' && testProgress.mcqSubmitted) ||
                (section.type === 'coding' && testProgress.codingSubmitted)
              );

              const isInProgress = testProgress.currentSection === section.type;

              return (
                <button
                  key={section.id}
                  onClick={() => onSelectSection(section.type)}
                  disabled={isDisabled || isCompleted}
                  className={`p-6 rounded-xl border text-left transition-all duration-300 ${
                    isCompleted
                      ? 'bg-green-50 border-green-300 text-green-800 cursor-default'
                      : isDisabled
                      ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                      : isInProgress
                      ? 'bg-blue-50 border-blue-300 text-blue-800 shadow-lg'
                      : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 hover:shadow-xl text-gray-800 hover:border-blue-300 transform hover:-translate-y-1'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{section.name}</h3>
                    <div className="flex items-center space-x-2">
                      {isCompleted && <CheckCircle className="h-6 w-6 text-green-600" />}
                      {isInProgress && <Play className="h-6 w-6 text-blue-600" />}
                      {section.type === 'mcq' ? (
                        <FileText className="h-6 w-6" />
                      ) : (
                        <Code className="h-6 w-6" />
                      )}
                    </div>
                  </div>
                  <p className="text-sm mb-4">{section.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{section.questions} questions</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{section.duration} minutes</span>
                      </span>
                    </div>
                    <div>
                      {isCompleted && (
                        <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                          ✓ Submitted
                        </span>
                      )}
                      {isInProgress && (
                        <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                          ▶ In Progress
                        </span>
                      )}
                    </div>
                  </div>
                  {isDisabled && (
                    <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-600">
                      <AlertCircle className="h-3 w-3 inline mr-1" />
                      Please complete and submit the other section first
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// MCQ Test View Component
const MCQTestView: React.FC<{
  test: Test;
  mcqProgress: any;
  onCompleteMCQSubsection: (id: string) => void;
  onSubmitMCQ: () => void;
  canSubmitMCQ: () => boolean;
  onBack: () => void;
  config: any;
}> = ({ test, mcqProgress, onCompleteMCQSubsection, onSubmitMCQ, canSubmitMCQ, onBack, config }) => {
  const [timeLeft, setTimeLeft] = useState(config.duration * 60); // in seconds

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Auto-submit when time ends
      onSubmitMCQ();
    }
  }, [timeLeft, onSubmitMCQ]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 lg:p-6">
      <div className="w-full max-w-5xl mx-auto">
        <div className="sticky top-4 z-10 mb-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="text-sm font-medium">Back to Test Selection</span>
              </button>
              
              <div className="flex items-center space-x-4">
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  timeLeft < 300 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  <Clock className="h-4 w-4" />
                  <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
                </div>
                <div className="text-sm text-gray-600">
                  MCQ Round • {config.totalQuestions} Questions
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">📝 MCQ Assessment</h1>
            <p className="text-gray-600">Complete all three sections to submit your MCQ round</p>
          </div>
          
          {/* Progress Overview */}
          <div className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Section Progress</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(config.subsections).map(([key, subsection]: [string, any]) => (
                <div key={key} className={`p-4 rounded-lg border ${
                  mcqProgress[key] ? 'bg-green-100 border-green-200' : 'bg-white border-gray-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800 capitalize">{key}</h4>
                    {mcqProgress[key] && <CheckCircle className="h-5 w-5 text-green-600" />}
                  </div>
                  <p className="text-sm text-gray-600">{subsection.questions} questions</p>
                  <p className="text-xs text-gray-500">{subsection.timeLimit} min limit</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            {['aptitude', 'logical', 'verbal'].map((section) => (
              <div key={section} className={`border rounded-xl p-6 transition-all duration-300 ${
                mcqProgress[section] 
                  ? 'border-green-300 bg-green-50' 
                  : 'border-gray-200 bg-white hover:shadow-md'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold capitalize text-gray-900">{section}</h3>
                      {mcqProgress[section] && (
                        <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          ✓ Completed
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{config.subsections[section].questions} questions</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{config.subsections[section].timeLimit} minutes</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Target className="h-4 w-4" />
                        <span>Pass: {config.subsections[section].passingScore}/{config.subsections[section].questions}</span>
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onCompleteMCQSubsection(section)}
                    disabled={mcqProgress[section]}
                    className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                      mcqProgress[section]
                        ? 'bg-green-100 text-green-600 cursor-default'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transform hover:-translate-y-1'
                    }`}
                  >
                    {mcqProgress[section] ? (
                      <>
                        <CheckCircle className="h-4 w-4 inline mr-2" />
                        Completed
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 inline mr-2" />
                        Start Section
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex justify-end">
            <button
              onClick={onSubmitMCQ}
              disabled={!canSubmitMCQ()}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2"
            >
              <CheckCircle className="h-5 w-5" />
              <span>Submit MCQ Test</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
          
          {!canSubmitMCQ() && (
            <p className="text-center text-sm text-orange-600 mt-4">
              Please complete all sections before submitting
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// Coding Test View Component
const CodingTestView: React.FC<{
  test: Test;
  onBack: () => void;
  onSubmit: () => void;
  config: any;
}> = ({ test, onBack, onSubmit, config }) => {
  const [timeLeft, setTimeLeft] = useState(config.duration * 60); // in seconds
  const [selectedLanguage, setSelectedLanguage] = useState(config.languages[0]);
  const [code, setCode] = useState('');

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Auto-submit when time ends
      onSubmit();
    }
  }, [timeLeft, onSubmit]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 lg:p-6">
      <div className="w-full max-w-7xl mx-auto">
        <div className="sticky top-4 z-10 mb-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="text-sm font-medium">Back to Test Selection</span>
              </button>
              
              <div className="flex items-center space-x-4">
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  timeLeft < 300 ? 'bg-red-100 text-red-700' : 'bg-purple-100 text-purple-700'
                }`}>
                  <Clock className="h-4 w-4" />
                  <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Coding Round • {config.totalQuestions} Problems
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">💻 Coding Assessment</h1>
            <p className="text-gray-600">Solve the programming problems using your preferred language</p>
          </div>

          {/* Language Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select Programming Language:
            </label>
            <div className="flex space-x-2">
              {config.languages.map((lang: string) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    selectedLanguage === lang
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Problem Statement */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
                <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                  <Code className="h-5 w-5 text-purple-600" />
                  <span>Problem 1: Two Sum</span>
                </h3>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Given an array of integers <code className="bg-gray-100 px-2 py-1 rounded">nums</code> and an integer <code className="bg-gray-100 px-2 py-1 rounded">target</code>, 
                    return <em>indices</em> of the two numbers such that they add up to <code className="bg-gray-100 px-2 py-1 rounded">target</code>.
                  </p>
                  <p className="text-gray-700 mb-4">
                    You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Example 1:</h4>
                  <pre className="text-sm text-gray-800 font-mono bg-gray-50 p-3 rounded">
{`Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].`}
                  </pre>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2">Constraints:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 2 ≤ nums.length ≤ 10⁴</li>
                    <li>• -10⁹ ≤ nums[i] ≤ 10⁹</li>
                    <li>• -10⁹ ≤ target ≤ 10⁹</li>
                    <li>• Only one valid answer exists</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <span>Coding Tips</span>
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Consider time and space complexity</li>
                  <li>• Test with the given examples</li>
                  <li>• Handle edge cases</li>
                  <li>• Write clean, readable code</li>
                </ul>
              </div>
            </div>

            {/* Code Editor */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Your Solution ({selectedLanguage}):
                </label>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-96 p-4 border-2 border-gray-200 rounded-xl font-mono text-sm hover:border-purple-300 focus:border-purple-500 focus:outline-none transition-colors resize-none"
                  placeholder={`// Write your ${selectedLanguage} code here...\n// Function signature will be provided based on selected language`}
                />
              </div>
              
              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 font-medium text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2">
                  <Play className="h-4 w-4" />
                  <span>Run Code</span>
                </button>
                <button className="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 font-medium text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Test Solution</span>
                </button>
              </div>

              {/* Test Results Area */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 min-h-24">
                <h4 className="font-semibold text-gray-800 mb-2">Test Results:</h4>
                <p className="text-sm text-gray-500">Run your code to see the results here...</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end space-x-4">
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
  );
};

export default StudentDashboard;
