import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout, AuthLayout } from '@/components/layout';
import { ProtectedRoute } from '@/components/common';

// Auth pages
import { LoginPage, RegisterPage } from '@/features/auth';

// Assessment pages
import { AssessmentStart, AssessmentQuestion, AssessmentResults } from '@/features/assessment';

// Submission pages
import { SubmissionForm, SubmissionStatus, FeedbackView } from '@/features/submissions';

// Other pages
import { DashboardPage } from '@/features/dashboard';
import { LearningPathView, ProjectDetailsPage } from '@/features/learning-path';
import { AdminDashboard, UserManagement, TaskManagement, AnalyticsPage } from '@/features/admin';
import { LandingPage } from '@/features/landing';
import { ProfilePage } from '@/features/profile';
import { SettingsPage } from '@/features/settings';
import { AchievementsPage } from '@/features/achievements';
import { ActivityPage } from '@/features/activity';
import { LearningCVPage } from '@/features/learning-cv';
import { TasksPage } from '@/features/tasks';

export const router = createBrowserRouter([
    // Public landing page
    {
        path: '/',
        element: <LandingPage />,
    },

    // Public pages with AppLayout (accessible without login)
    {
        path: '/',
        element: <AppLayout />,
        children: [
            { path: 'activity', element: <ActivityPage /> },
            { path: 'tasks', element: <TasksPage /> },
        ],
    },


    // Public auth routes
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
        ],
    },

    // Protected app routes
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <AppLayout />
            </ProtectedRoute>
        ),
        children: [
            // Dashboard
            { path: 'dashboard', element: <DashboardPage /> },

            // Assessment
            { path: 'assessment', element: <AssessmentStart /> },
            { path: 'assessment/question', element: <AssessmentQuestion /> },
            { path: 'assessment/results', element: <AssessmentResults /> },

            // Submissions
            { path: 'submissions', element: <Navigate to="/submissions/new" replace /> },
            { path: 'submissions/new', element: <SubmissionForm /> },
            { path: 'submissions/:id/status', element: <SubmissionStatus /> },
            { path: 'submissions/:id/feedback', element: <FeedbackView /> },

            // Learning Path
            { path: 'learning-path', element: <LearningPathView /> },
            { path: 'learning-path/project/:taskId', element: <ProjectDetailsPage /> },

            // Profile & Settings
            { path: 'profile', element: <ProfilePage /> },
            { path: 'settings', element: <SettingsPage /> },
            { path: 'achievements', element: <AchievementsPage /> },
            { path: 'activity', element: <ActivityPage /> },
            { path: 'tasks', element: <TasksPage /> },
            { path: 'learning-cv', element: <LearningCVPage /> },
        ],
    },

    // Admin routes
    {
        path: '/admin',
        element: (
            <ProtectedRoute requireAdmin>
                <AppLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <AdminDashboard /> },
            { path: 'users', element: <UserManagement /> },
            { path: 'tasks', element: <TaskManagement /> },
            { path: 'analytics', element: <AnalyticsPage /> },
        ],
    },

    // Redirect unknown routes to dashboard
    {
        path: '*',
        element: <Navigate to="/dashboard" replace />,
    },
]);
