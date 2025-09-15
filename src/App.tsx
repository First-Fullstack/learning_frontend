import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import PricingPage from './components/PricingPage';
import CourseList from './components/CourseList';
import CourseDetail from './components/CourseDetail';
import Quiz from './components/Quiz';
import Completion from './components/Completion';
import ProfilePage from './components/ProfilePage';

// 管理者用コンポーネント
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminCourses from './components/admin/AdminCourses';
import AdminQuizzes from './components/admin/AdminQuizzes';
import AdminUsers from './components/admin/AdminUsers';
import AdminSubscription from './components/admin/AdminSubscription';

function App() {
  return (
    <Router>
      <Routes>
        {/* 管理者用ルート */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="quizzes" element={<AdminQuizzes />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="subscription" element={<AdminSubscription />} />
        </Route>

        {/* 一般ユーザー用ルート */}
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/courses" element={<CourseList />} />
              <Route path="/course/:id" element={<CourseDetail />} />
              <Route path="/quiz/:courseId" element={<Quiz />} />
              <Route path="/completion" element={<Completion />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;