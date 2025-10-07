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

// 認証関連コンポーネント
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PasswordReset from './components/auth/PasswordReset';
import PasswordResetConfirm from './components/auth/PasswordResetConfirm';

// ユーザー管理コンポーネント
import ChangePassword from './components/user/ChangePassword';
import DeleteAccount from './components/user/DeleteAccount';

// 決済関連コンポーネント
import Checkout from './components/payment/Checkout';
import PaymentSuccess from './components/payment/PaymentSuccess';
import PaymentFailed from './components/payment/PaymentFailed';
import SubscriptionManagement from './components/payment/SubscriptionManagement';

// エラー画面コンポーネント
import NotFound from './components/error/NotFound';
import ServerError from './components/error/ServerError';
import Maintenance from './components/error/Maintenance';
import Forbidden from './components/error/Forbidden';

// アフィリエイト関連コンポーネント
import AffiliateRegister from './components/affiliate/AffiliateRegister';

// 管理者用コンポーネント
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminCourses from './components/admin/AdminCourses';
import AdminQuizzes from './components/admin/AdminQuizzes';
import AdminUsers from './components/admin/AdminUsers';
import AdminSubscription from './components/admin/AdminSubscription';

// アフィリエイト管理コンポーネント
import AffiliateList from './components/admin/AffiliateList';
import AffiliateLinks from './components/admin/AffiliateLinks';
import AffiliateTracking from './components/admin/AffiliateTracking';
import AffiliateRewards from './components/admin/AffiliateRewards';

function App() {
  return (
    <Router>
      <Routes>
        {/* 管理者用ルート */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="quizzes" element={<AdminQuizzes />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="subscription" element={<AdminSubscription />} />
          <Route path="affiliate/list" element={<AffiliateList />} />
          <Route path="affiliate/links" element={<AffiliateLinks />} />
          <Route path="affiliate/tracking" element={<AffiliateTracking />} />
          <Route path="affiliate/rewards" element={<AffiliateRewards />} />
        </Route>

        {/* 認証関連ルート */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/password-reset/confirm" element={<PasswordResetConfirm />} />

        {/* ユーザー管理ルート */}
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/delete-account" element={<DeleteAccount />} />

        {/* 決済関連ルート */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="/subscription" element={<SubscriptionManagement />} />

        {/* エラー画面ルート */}
        <Route path="/404" element={<NotFound />} />
        <Route path="/500" element={<ServerError />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/forbidden" element={<Forbidden />} />

        {/* アフィリエイト関連ルート */}
        <Route path="/affiliate/register" element={<AffiliateRegister />} />

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
              {/* 404ページは最後に配置 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;