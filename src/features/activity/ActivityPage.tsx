import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Badge, Button } from '@/components/ui';
import {
    CheckCircle,
    Code,
    Trophy,
    Play,
    BookOpen,
    Send,
    Star,
    Clock,
    Filter,
    Calendar,
    ArrowLeft,
    TrendingUp,
    Zap,
    FileCode,
    MessageSquare,
    Award,
} from 'lucide-react';

// Extended mock data for activity history
const allActivities = [
    { id: 1, type: 'task_completed', title: 'Completed "React Basics"', description: 'Finished all lessons and exercises', time: '2 hours ago', date: '2024-12-23', icon: CheckCircle, color: 'text-success-500', bgColor: 'bg-success-500/10' },
    { id: 2, type: 'submission', title: 'Submitted REST API code', description: 'Code review for backend endpoints', time: '5 hours ago', date: '2024-12-23', icon: Code, color: 'text-primary-500', bgColor: 'bg-primary-500/10' },
    { id: 3, type: 'achievement', title: 'Earned "Fast Learner" badge', description: 'Completed 5 tasks in a week', time: '1 day ago', date: '2024-12-22', icon: Trophy, color: 'text-warning-500', bgColor: 'bg-warning-500/10' },
    { id: 4, type: 'task_started', title: 'Started "React Hooks"', description: 'Beginning advanced React concepts', time: '1 day ago', date: '2024-12-22', icon: Play, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
    { id: 5, type: 'feedback', title: 'Received feedback on "Auth System"', description: 'Score: 92/100 - Great implementation!', time: '2 days ago', date: '2024-12-21', icon: MessageSquare, color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
    { id: 6, type: 'submission', title: 'Submitted "Database Design"', description: 'PostgreSQL schema implementation', time: '2 days ago', date: '2024-12-21', icon: FileCode, color: 'text-primary-500', bgColor: 'bg-primary-500/10' },
    { id: 7, type: 'achievement', title: 'Earned "Week Warrior" badge', description: 'Maintained a 7-day streak', time: '3 days ago', date: '2024-12-20', icon: Award, color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
    { id: 8, type: 'task_completed', title: 'Completed "Node.js Fundamentals"', description: 'Server-side JavaScript mastered', time: '3 days ago', date: '2024-12-20', icon: CheckCircle, color: 'text-success-500', bgColor: 'bg-success-500/10' },
    { id: 9, type: 'learning', title: 'Spent 3 hours learning', description: 'Deep dive into TypeScript generics', time: '4 days ago', date: '2024-12-19', icon: BookOpen, color: 'text-cyan-500', bgColor: 'bg-cyan-500/10' },
    { id: 10, type: 'streak', title: 'Streak milestone: 5 days', description: 'Consistency is key!', time: '4 days ago', date: '2024-12-19', icon: Zap, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10' },
    { id: 11, type: 'submission', title: 'Submitted "User Authentication"', description: 'JWT-based auth implementation', time: '5 days ago', date: '2024-12-18', icon: Send, color: 'text-primary-500', bgColor: 'bg-primary-500/10' },
    { id: 12, type: 'task_started', title: 'Started "API Security"', description: 'Learning best practices for secure APIs', time: '5 days ago', date: '2024-12-18', icon: Play, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
    { id: 13, type: 'score', title: 'New high score: 95%', description: 'Best performance on React assessment', time: '1 week ago', date: '2024-12-16', icon: Star, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10' },
    { id: 14, type: 'task_completed', title: 'Completed "CSS Flexbox"', description: 'Layout mastery achieved', time: '1 week ago', date: '2024-12-16', icon: CheckCircle, color: 'text-success-500', bgColor: 'bg-success-500/10' },
    { id: 15, type: 'learning', title: 'Studied for 2 hours', description: 'Reviewed JavaScript closures', time: '1 week ago', date: '2024-12-15', icon: BookOpen, color: 'text-cyan-500', bgColor: 'bg-cyan-500/10' },
];

const activityStats = {
    totalActivities: 47,
    tasksCompleted: 12,
    submissionsMade: 18,
    badgesEarned: 6,
    totalHoursThisWeek: 14,
};

type FilterType = 'all' | 'task_completed' | 'submission' | 'achievement' | 'learning';

export const ActivityPage: React.FC = () => {
    const [filter, setFilter] = useState<FilterType>('all');
    const [visibleCount, setVisibleCount] = useState(8);

    const filterOptions: { id: FilterType; label: string; icon: React.ElementType }[] = [
        { id: 'all', label: 'All Activity', icon: Clock },
        { id: 'task_completed', label: 'Completed', icon: CheckCircle },
        { id: 'submission', label: 'Submissions', icon: Code },
        { id: 'achievement', label: 'Achievements', icon: Trophy },
        { id: 'learning', label: 'Learning', icon: BookOpen },
    ];

    const filteredActivities = allActivities.filter((activity) => {
        if (filter === 'all') return true;
        if (filter === 'task_completed') return activity.type === 'task_completed';
        if (filter === 'submission') return activity.type === 'submission' || activity.type === 'feedback';
        if (filter === 'achievement') return activity.type === 'achievement' || activity.type === 'streak' || activity.type === 'score';
        if (filter === 'learning') return activity.type === 'learning' || activity.type === 'task_started';
        return true;
    });

    const visibleActivities = filteredActivities.slice(0, visibleCount);
    const hasMore = visibleCount < filteredActivities.length;

    const loadMore = () => {
        setVisibleCount((prev) => Math.min(prev + 5, filteredActivities.length));
    };

    // Group activities by date
    const groupedActivities = visibleActivities.reduce((groups, activity) => {
        const date = activity.date;
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(activity);
        return groups;
    }, {} as Record<string, typeof allActivities>);

    const formatDateHeader = (dateStr: string) => {
        const date = new Date(dateStr);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) return 'Today';
        if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
        return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link to="/dashboard">
                        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                            Back
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">Activity History</h1>
                        <p className="text-neutral-600 dark:text-neutral-400">Track your learning journey and progress</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-400/20 to-purple-400/20 border border-primary-400/30">
                    <Calendar className="w-5 h-5 text-primary-500" />
                    <span className="font-semibold text-neutral-900 dark:text-white">{activityStats.totalActivities} Total Activities</span>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { icon: CheckCircle, value: activityStats.tasksCompleted, label: 'Tasks Done', gradient: 'from-green-500 to-emerald-400', bg: 'bg-green-500/10 dark:bg-green-500/20' },
                    { icon: Code, value: activityStats.submissionsMade, label: 'Submissions', gradient: 'from-blue-500 to-cyan-400', bg: 'bg-blue-500/10 dark:bg-blue-500/20' },
                    { icon: Trophy, value: activityStats.badgesEarned, label: 'Badges Earned', gradient: 'from-yellow-500 to-orange-400', bg: 'bg-yellow-500/10 dark:bg-yellow-500/20' },
                    { icon: TrendingUp, value: `${activityStats.totalHoursThisWeek}h`, label: 'Hours This Week', gradient: 'from-purple-500 to-pink-400', bg: 'bg-purple-500/10 dark:bg-purple-500/20' },
                ].map((stat, index) => (
                    <Card key={index} variant="glass">
                        <Card.Body className="p-5">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center`}>
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

            {/* Filters */}
            <Card variant="glass">
                <Card.Body className="p-4">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                        <Filter className="w-5 h-5 text-neutral-500 flex-shrink-0" />
                        {filterOptions.map((option) => (
                            <Button
                                key={option.id}
                                variant={filter === option.id ? 'primary' : 'ghost'}
                                size="sm"
                                leftIcon={<option.icon className="w-4 h-4" />}
                                onClick={() => {
                                    setFilter(option.id);
                                    setVisibleCount(8);
                                }}
                                className="flex-shrink-0"
                            >
                                {option.label}
                            </Button>
                        ))}
                    </div>
                </Card.Body>
            </Card>

            {/* Activity Timeline */}
            <div className="space-y-6">
                {Object.entries(groupedActivities).map(([date, activities]) => (
                    <div key={date}>
                        {/* Date Header */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-neutral-500" />
                            </div>
                            <h3 className="font-semibold text-neutral-900 dark:text-white">{formatDateHeader(date)}</h3>
                            <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
                            <Badge variant="default" size="sm">{activities.length} activities</Badge>
                        </div>

                        {/* Activity Cards */}
                        <div className="space-y-3 ml-5 pl-8 border-l-2 border-neutral-200 dark:border-neutral-700">
                            {activities.map((activity) => (
                                <Card key={activity.id} hover className="relative">
                                    {/* Timeline dot */}
                                    <div className="absolute -left-[2.85rem] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white dark:bg-dark-card border-2 border-neutral-300 dark:border-neutral-600" />

                                    <Card.Body className="p-4">
                                        <div className="flex items-start gap-4">
                                            <div className={`w-12 h-12 rounded-xl ${activity.bgColor} flex items-center justify-center flex-shrink-0`}>
                                                <activity.icon className={`w-6 h-6 ${activity.color}`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div>
                                                        <h4 className="font-semibold text-neutral-900 dark:text-white">{activity.title}</h4>
                                                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">{activity.description}</p>
                                                    </div>
                                                    <span className="text-xs text-neutral-500 flex-shrink-0 mt-1">{activity.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Load More */}
            {hasMore && (
                <div className="text-center">
                    <Button variant="outline" onClick={loadMore}>
                        Load More Activities
                    </Button>
                </div>
            )}

            {/* Empty State */}
            {filteredActivities.length === 0 && (
                <Card>
                    <Card.Body className="py-16 text-center">
                        <div className="w-16 h-16 mx-auto rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
                            <Clock className="w-8 h-8 text-neutral-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">No activities found</h3>
                        <p className="text-neutral-600 dark:text-neutral-400">
                            Try adjusting your filter or start learning to see your activity here.
                        </p>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
};
