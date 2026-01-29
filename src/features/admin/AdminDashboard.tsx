import React from 'react';
import { Card, Badge } from '@/components/ui';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import {
    Users,
    FileCode,
    TrendingUp,
    Activity,
    CheckCircle,
    Clock,
} from 'lucide-react';

// Mock data
const userGrowthData = [
    { month: 'Jan', users: 120 },
    { month: 'Feb', users: 180 },
    { month: 'Mar', users: 240 },
    { month: 'Apr', users: 320 },
    { month: 'May', users: 420 },
    { month: 'Jun', users: 580 },
];

const submissionsData = [
    { day: 'Mon', submissions: 45 },
    { day: 'Tue', submissions: 52 },
    { day: 'Wed', submissions: 38 },
    { day: 'Thu', submissions: 65 },
    { day: 'Fri', submissions: 48 },
    { day: 'Sat', submissions: 72 },
    { day: 'Sun', submissions: 55 },
];

const trackDistribution = [
    { name: 'Full Stack', value: 35, color: '#4f46e5' },
    { name: 'Backend', value: 25, color: '#10b981' },
    { name: 'Frontend', value: 20, color: '#f59e0b' },
    { name: 'Python', value: 12, color: '#ef4444' },
    { name: 'C#/.NET', value: 8, color: '#8b5cf6' },
];

const recentSubmissions = [
    { id: 1, user: 'John Doe', task: 'REST API', score: 85, status: 'completed', time: '10 min ago' },
    { id: 2, user: 'Jane Smith', task: 'React Components', score: 92, status: 'completed', time: '25 min ago' },
    { id: 3, user: 'Bob Wilson', task: 'Database Design', status: 'processing', time: '30 min ago' },
    { id: 4, user: 'Alice Brown', task: 'TypeScript', score: 78, status: 'completed', time: '1 hour ago' },
];

export const AdminDashboard: React.FC = () => {
    const stats = {
        totalUsers: 1247,
        activeUsers: 842,
        totalSubmissions: 4562,
        averageScore: 76.5,
        newUsersThisWeek: 87,
        submissionsThisWeek: 324,
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-neutral-900 mb-1">Admin Dashboard</h1>
                <p className="text-neutral-600">Platform overview and analytics</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <Card.Body className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                                <Users className="w-5 h-5 text-primary-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-neutral-900">{stats.totalUsers.toLocaleString()}</p>
                                <p className="text-sm text-neutral-600">Total Users</p>
                            </div>
                        </div>
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Body className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-success-100 flex items-center justify-center">
                                <Activity className="w-5 h-5 text-success-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-neutral-900">{stats.activeUsers}</p>
                                <p className="text-sm text-neutral-600">Active Today</p>
                            </div>
                        </div>
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Body className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-warning-100 flex items-center justify-center">
                                <FileCode className="w-5 h-5 text-warning-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-neutral-900">{stats.totalSubmissions.toLocaleString()}</p>
                                <p className="text-sm text-neutral-600">Submissions</p>
                            </div>
                        </div>
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Body className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-neutral-900">{stats.averageScore}%</p>
                                <p className="text-sm text-neutral-600">Avg Score</p>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* User Growth */}
                <Card className="lg:col-span-2">
                    <Card.Header>
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold">User Growth</h3>
                            <Badge variant="success" dot>+{stats.newUsersThisWeek} this week</Badge>
                        </div>
                    </Card.Header>
                    <Card.Body className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={userGrowthData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip />
                                <Line type="monotone" dataKey="users" stroke="#4f46e5" strokeWidth={2} dot={{ fill: '#4f46e5' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card.Body>
                </Card>

                {/* Track Distribution */}
                <Card>
                    <Card.Header>
                        <h3 className="font-semibold">Track Distribution</h3>
                    </Card.Header>
                    <Card.Body className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={trackDistribution}
                                    innerRadius={50}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    labelLine={false}
                                >
                                    {trackDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card.Body>
                </Card>

                {/* Weekly Submissions */}
                <Card className="lg:col-span-2">
                    <Card.Header>
                        <h3 className="font-semibold">Weekly Submissions</h3>
                    </Card.Header>
                    <Card.Body className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={submissionsData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
                                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip />
                                <Bar dataKey="submissions" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card.Body>
                </Card>

                {/* Recent Submissions */}
                <Card>
                    <Card.Header>
                        <h3 className="font-semibold">Recent Submissions</h3>
                    </Card.Header>
                    <Card.Body className="p-0">
                        <ul className="divide-y divide-neutral-100">
                            {recentSubmissions.map((sub) => (
                                <li key={sub.id} className="px-4 py-3 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
                                        {sub.status === 'completed' ? (
                                            <CheckCircle className="w-4 h-4 text-success-500" />
                                        ) : (
                                            <Clock className="w-4 h-4 text-warning-500" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-neutral-900 truncate">{sub.user}</p>
                                        <p className="text-xs text-neutral-500">{sub.task}</p>
                                    </div>
                                    {sub.score ? (
                                        <Badge variant="success" size="sm">{sub.score}%</Badge>
                                    ) : (
                                        <Badge variant="warning" size="sm">Processing</Badge>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};
