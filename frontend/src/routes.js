import HomePage from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import News from './pages/News';    
import Profile from './pages/Profile';
import SkillBot from './pages/SkillBot';
import Resume from './pages/Resume';
import InterviewForm from './pages/InterviewForm';
import ChatbotInterview from './pages/InterviewBot';
import LearningPlanForm from './pages/LearningPlanForm';
import ChangePassword from './pages/passwordChange';

export const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/forgotpassword', element: <ForgotPassword /> },
  { path: '/news', element: <News /> },
  { path: '/profile', element: <Profile /> },
  { path: '/skillbot', element: <SkillBot /> },
  { path: '/resume', element: <Resume /> },
  { path: '/form', element: <InterviewForm /> },
  { path: '/interview', element: <ChatbotInterview /> },
  { path: '/learning', element: <LearningPlanForm /> },
  { path: '/changepassword', element: <ChangePassword /> },
];
