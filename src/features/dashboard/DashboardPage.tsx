import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { Button, Card, Badge, ProgressBar, CircularProgress } from '@/components/ui';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
} from 'recharts';
import {
    TrendingUp,
    Target,
    Clock,
    Trophy,
    BookOpen,
    Code,
    ArrowRight,
    Flame,
    CheckCircle,
    Play,
    Sparkles,
} from 'lucide-react';

// Mock data
const progressData = [
    { week: 'W1', score: 45 },
    { week: 'W2', score: 52 },
    { week: 'W3', score: 58 },
    { week: 'W4', score: 68 },
    { week: 'W5', score: 72 },
    { week: 'W6', score: 78 },
];

const activityData = [
    { day: 'Mon', hours: 2 },
    { day: 'Tue', hours: 1.5 },
    { day: 'Wed', hours: 3 },
    { day: 'Thu', hours: 2.5 },
    { day: 'Fri', hours: 1 },
    { day: 'Sat', hours: 4 },
    { day: 'Sun', hours: 2 },
];

const recentActivity = [
    { id: 1, type: 'task_completed', title: 'Completed "React Basics"', time: '2 hours ago', icon: CheckCircle, color: 'text-success-500' },
    { id: 2, type: 'submission', title: 'Submitted REST API code', time: '5 hours ago', icon: Code, color: 'text-primary-500' },
    { id: 3, type: 'achievement', title: 'Earned "Fast Learner" badge', time: '1 day ago', icon: Trophy, color: 'text-warning-500' },
    { id: 4, type: 'task_started', title: 'Started "React Hooks"', time: '1 day ago', icon: Play, color: 'text-blue-500' },
];

export const DashboardPage: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);
    const { currentPath } = useAppSelector((state) => state.learningPath);

    const stats = {
        completedTasks: 3,
        totalTasks: 12,
        currentStreak: 7,
        totalHours: 28,
        averageScore: 85,
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Welcome Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-1">
                        <span className="text-neutral-900 dark:text-white">Welcome back, </span>
                        <span className="bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            {user?.name?.split(' ')[0] || 'Learner'}
                        </span>
                        <span className="text-neutral-900 dark:text-white"> 👋</span>
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-400">
                        You're making great progress. Keep up the momentum!
                    </p>
                </div>
                <Link to="/assessment">
                    <Button variant="glass" leftIcon={<Sparkles className="w-4 h-4" />} className="border border-neutral-200 dark:border-neutral-700">
                        Retake Assessment
                    </Button>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { icon: Target, value: `${stats.completedTasks}/${stats.totalTasks}`, label: 'Tasks Complete', gradient: 'from-green-500 to-emerald-400', bgLight: 'bg-green-500/10', bgDark: 'dark:bg-green-500/20' },
                    { icon: Flame, value: stats.currentStreak, label: 'Day Streak 🔥', gradient: 'from-orange-500 to-yellow-400', bgLight: 'bg-orange-500/10', bgDark: 'dark:bg-orange-500/20' },
                    { icon: Clock, value: `${stats.totalHours}h`, label: 'Total Learning', gradient: 'from-blue-500 to-cyan-400', bgLight: 'bg-blue-500/10', bgDark: 'dark:bg-blue-500/20' },
                    { icon: TrendingUp, value: `${stats.averageScore}%`, label: 'Avg Score', gradient: 'from-purple-500 to-pink-400', bgLight: 'bg-purple-500/10', bgDark: 'dark:bg-purple-500/20' },
                ].map((stat, index) => (
                    <Card key={index} variant="glass">
                        <Card.Body className="p-5">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl ${stat.bgLight} ${stat.bgDark} flex items-center justify-center`}>
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                                        <stat.icon className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-neutral-900 dark:text-white">{stat.value}</p>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{stat.label}</p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Progress Chart */}
                <Card className="lg:col-span-2">
                    <Card.Header>
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold">Learning Progress</h3>
                            <Badge variant="success" dot>+15% this week</Badge>
                        </div>
                    </Card.Header>
                    <Card.Body className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={progressData}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                                <Tooltip />
                                <Area type="monotone" dataKey="score" stroke="#4f46e5" fill="url(#colorScore)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Card.Body>
                </Card>

                {/* Current Progress */}
                <Card>
                    <Card.Header>
                        <h3 className="font-semibold">Current Path</h3>
                    </Card.Header>
                    <Card.Body>
                        <div className="text-center mb-4">
                            <CircularProgress
                                value={Math.round((stats.completedTasks / stats.totalTasks) * 100)}
                                size={120}
                            />
                            <p className="mt-2 text-sm text-neutral-600">
                                {currentPath?.trackName || 'Full Stack Development'}
                            </p>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-neutral-600">Progress</span>
                                    <span className="font-medium">{stats.completedTasks} of {stats.totalTasks} tasks</span>
                                </div>
                                <ProgressBar value={stats.completedTasks} max={stats.totalTasks} size="sm" />
                            </div>
                        </div>
                        <Link to="/learning-path" className="block mt-4">
                            <Button variant="outline" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                                View Full Path
                            </Button>
                        </Link>
                    </Card.Body>
                </Card>

                {/* Activity Chart */}
                <Card>
                    <Card.Header>
                        <h3 className="font-semibold">This Week</h3>
                    </Card.Header>
                    <Card.Body className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={activityData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
                                <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                                <YAxis hide />
                                <Tooltip />
                                <Line type="monotone" dataKey="hours" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card.Body>
                </Card>

                {/* Recent Activity */}
                <Card className="lg:col-span-2">
                    <Card.Header>
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold">Recent Activity</h3>
                            <Link to="/activity" className="text-sm text-primary-600 hover:text-primary-700">
                                View all
                            </Link>
                        </div>
                    </Card.Header>
                    <Card.Body className="p-0">
                        <ul className="divide-y divide-neutral-100">
                            {recentActivity.map((activity) => (
                                <li key={activity.id} className="flex items-center gap-4 px-6 py-4">
                                    <div className={`w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center ${activity.color}`}>
                                        <activity.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-neutral-900 font-medium">{activity.title}</p>
                                        <p className="text-sm text-neutral-500">{activity.time}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Card.Body>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                    { href: '/submissions/new', icon: Code, title: 'Submit Code', desc: 'Get AI feedback on your work', gradient: 'from-blue-500 to-cyan-400' },
                    { href: '/learning-path', icon: BookOpen, title: 'Continue Learning', desc: 'Pick up where you left off', gradient: 'from-green-500 to-emerald-400' },
                    { href: '/achievements', icon: Trophy, title: 'Achievements', desc: 'View your earned badges', gradient: 'from-orange-500 to-yellow-400' },
                ].map((action) => (
                    <Link key={action.href} to={action.href}>
                        <Card hover variant="glass" className="h-full group">
                            <Card.Body className="flex items-center gap-4 p-5">
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <action.icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-neutral-900 dark:text-white">{action.title}</h4>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{action.desc}</p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};
