import React, { useState } from 'react';
import { Card, Badge, Button, ProgressBar } from '@/components/ui';
import {
    Trophy,
    Medal,
    Star,
    Flame,
    Target,
    Crown,
    Award,
    TrendingUp,
    Lock,
    CheckCircle,
} from 'lucide-react';

// Mock data for achievements
const mockBadges = [
    { id: 1, name: 'First Steps', description: 'Complete your first task', icon: '🎯', category: 'milestone', earned: true, earnedDate: '2024-12-10', rarity: 'common' },
    { id: 2, name: 'Code Master', description: 'Submit 10 code reviews', icon: '💻', category: 'submission', earned: true, earnedDate: '2024-12-15', rarity: 'common' },
    { id: 3, name: 'Fast Learner', description: 'Complete 5 tasks in a week', icon: '🚀', category: 'speed', earned: true, earnedDate: '2024-12-18', rarity: 'rare' },
    { id: 4, name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '🔥', category: 'streak', earned: true, earnedDate: '2024-12-20', rarity: 'rare' },
    { id: 5, name: 'Perfect Score', description: 'Get 100% on any submission', icon: '⭐', category: 'quality', earned: false, progress: 92, rarity: 'epic' },
    { id: 6, name: 'Full Stack Hero', description: 'Complete Full Stack track', icon: '🦸', category: 'track', earned: false, progress: 65, rarity: 'legendary' },
    { id: 7, name: 'Community Star', description: 'Help 10 other learners', icon: '🌟', category: 'community', earned: false, progress: 30, rarity: 'rare' },
    { id: 8, name: 'Night Owl', description: 'Submit code after midnight', icon: '🦉', category: 'special', earned: true, earnedDate: '2024-12-12', rarity: 'common' },
    { id: 9, name: 'Month Master', description: 'Maintain a 30-day streak', icon: '👑', category: 'streak', earned: false, progress: 23, rarity: 'legendary' },
    { id: 10, name: 'Security Expert', description: 'Pass all security reviews', icon: '🔒', category: 'quality', earned: false, progress: 0, rarity: 'epic' },
    { id: 11, name: 'Speed Demon', description: 'Get review in under 1 minute', icon: '⚡', category: 'speed', earned: true, earnedDate: '2024-12-22', rarity: 'rare' },
    { id: 12, name: 'Consistent Coder', description: 'Submit every day for 2 weeks', icon: '📅', category: 'streak', earned: false, progress: 50, rarity: 'epic' },
];

const mockLeaderboard = [
    { rank: 1, name: 'Sarah Chen', xp: 12450, level: 25, avatar: null, badges: 18 },
    { rank: 2, name: 'Alex Johnson', xp: 11200, level: 23, avatar: null, badges: 16 },
    { rank: 3, name: 'Mohamed Ali', xp: 10800, level: 22, avatar: null, badges: 15 },
    { rank: 4, name: 'Emma Wilson', xp: 9500, level: 20, avatar: null, badges: 14 },
    { rank: 5, name: 'Omar Ahmed', xp: 8200, level: 18, avatar: null, badges: 12, isCurrentUser: true },
    { rank: 6, name: 'Lisa Park', xp: 7800, level: 17, avatar: null, badges: 11 },
    { rank: 7, name: 'David Lee', xp: 7500, level: 16, avatar: null, badges: 10 },
];

const streakData = {
    current: 7,
    longest: 14,
    thisMonth: [
        [0, 1, 1, 1, 0, 0, 1],
        [1, 1, 1, 1, 1, 0, 0],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0],
    ],
};

const stats = {
    totalXP: 8200,
    level: 18,
    xpToNextLevel: 1000,
    xpProgress: 200,
    totalBadges: 12,
    earnedBadges: 6,
    tasksCompleted: 47,
    avgScore: 85,
};

export const AchievementsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'badges' | 'streaks' | 'leaderboard'>('badges');
    const [badgeFilter, setBadgeFilter] = useState<'all' | 'earned' | 'locked'>('all');

    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case 'common': return 'from-neutral-400 to-neutral-500';
            case 'rare': return 'from-blue-400 to-blue-600';
            case 'epic': return 'from-purple-400 to-purple-600';
            case 'legendary': return 'from-yellow-400 to-orange-500';
            default: return 'from-neutral-400 to-neutral-500';
        }
    };

    const getRarityBorder = (rarity: string) => {
        switch (rarity) {
            case 'common': return 'border-neutral-300 dark:border-neutral-600';
            case 'rare': return 'border-blue-300 dark:border-blue-600';
            case 'epic': return 'border-purple-300 dark:border-purple-600';
            case 'legendary': return 'border-yellow-300 dark:border-yellow-600';
            default: return 'border-neutral-300 dark:border-neutral-600';
        }
    };

    const filteredBadges = mockBadges.filter((badge) => {
        if (badgeFilter === 'all') return true;
        if (badgeFilter === 'earned') return badge.earned;
        if (badgeFilter === 'locked') return !badge.earned;
        return true;
    });

    const getInitials = (name: string) => name.split(' ').map((n) => n[0]).join('').toUpperCase();

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">Achievements</h1>
                    <p className="text-neutral-600 dark:text-neutral-400">Track your progress and earn rewards</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <span className="font-semibold text-neutral-900 dark:text-white">{stats.totalXP.toLocaleString()} XP</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-400/20 to-red-400/20 border border-orange-400/30">
                        <Flame className="w-5 h-5 text-orange-500" />
                        <span className="font-semibold text-neutral-900 dark:text-white">{streakData.current} Day Streak</span>
                    </div>
                </div>
            </div>

            {/* Level Progress */}
            <Card variant="glass">
                <Card.Body className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-xl">
                                <span className="text-3xl font-bold text-white">{stats.level}</span>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-neutral-900 dark:text-white">Level {stats.level}</p>
                                <p className="text-neutral-600 dark:text-neutral-400">Intermediate Developer</p>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-neutral-600 dark:text-neutral-400">Progress to Level {stats.level + 1}</span>
                                <span className="font-medium text-neutral-900 dark:text-white">{stats.xpProgress} / {stats.xpToNextLevel} XP</span>
                            </div>
                            <ProgressBar value={stats.xpProgress} max={stats.xpToNextLevel} size="lg" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 md:gap-6">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-neutral-900 dark:text-white">{stats.earnedBadges}</p>
                                <p className="text-sm text-neutral-500">Badges</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-neutral-900 dark:text-white">{stats.tasksCompleted}</p>
                                <p className="text-sm text-neutral-500">Tasks</p>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { icon: Trophy, value: stats.earnedBadges, total: stats.totalBadges, label: 'Badges Earned', gradient: 'from-yellow-500 to-orange-400', bg: 'bg-yellow-500/10 dark:bg-yellow-500/20' },
                    { icon: Target, value: stats.tasksCompleted, label: 'Tasks Completed', gradient: 'from-green-500 to-emerald-400', bg: 'bg-green-500/10 dark:bg-green-500/20' },
                    { icon: TrendingUp, value: `${stats.avgScore}%`, label: 'Average Score', gradient: 'from-blue-500 to-cyan-400', bg: 'bg-blue-500/10 dark:bg-blue-500/20' },
                    { icon: Flame, value: streakData.longest, label: 'Longest Streak', gradient: 'from-orange-500 to-red-400', bg: 'bg-orange-500/10 dark:bg-orange-500/20' },
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
                                    <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                                        {stat.value}{stat.total ? `/${stat.total}` : ''}
                                    </p>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{stat.label}</p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-neutral-200 dark:border-neutral-700">
                {[
                    { id: 'badges', label: 'Badges', icon: Trophy },
                    { id: 'streaks', label: 'Streaks', icon: Flame },
                    { id: 'leaderboard', label: 'Leaderboard', icon: Crown },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as 'badges' | 'streaks' | 'leaderboard')}
                        className={`flex items-center gap-2 px-4 py-2 font-medium text-sm transition-colors relative ${activeTab === tab.id
                            ? 'text-primary-600 dark:text-primary-400'
                            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400" />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'badges' && (
                <div className="space-y-6">
                    {/* Filter */}
                    <div className="flex gap-2">
                        {(['all', 'earned', 'locked'] as const).map((filter) => (
                            <Button
                                key={filter}
                                variant={badgeFilter === filter ? 'primary' : 'ghost'}
                                size="sm"
                                onClick={() => setBadgeFilter(filter)}
                            >
                                {filter.charAt(0).toUpperCase() + filter.slice(1)}
                                {filter === 'earned' && ` (${mockBadges.filter(b => b.earned).length})`}
                                {filter === 'locked' && ` (${mockBadges.filter(b => !b.earned).length})`}
                            </Button>
                        ))}
                    </div>

                    {/* Badges Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredBadges.map((badge) => (
                            <Card
                                key={badge.id}
                                className={`relative overflow-hidden ${!badge.earned ? 'opacity-70' : ''} border-2 ${getRarityBorder(badge.rarity)}`}
                            >
                                {/* Rarity indicator */}
                                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${getRarityColor(badge.rarity)} opacity-10 rounded-bl-full`} />

                                <Card.Body className="p-5">
                                    <div className="flex items-start gap-4">
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${badge.earned
                                            ? `bg-gradient-to-br ${getRarityColor(badge.rarity)} shadow-lg`
                                            : 'bg-neutral-200 dark:bg-neutral-700'
                                            }`}>
                                            {badge.earned ? badge.icon : <Lock className="w-6 h-6 text-neutral-400" />}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-neutral-900 dark:text-white">{badge.name}</h3>
                                                <Badge variant={
                                                    badge.rarity === 'legendary' ? 'warning' :
                                                        badge.rarity === 'epic' ? 'primary' :
                                                            badge.rarity === 'rare' ? 'info' : 'default'
                                                } size="sm">
                                                    {badge.rarity}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">{badge.description}</p>
                                            {badge.earned ? (
                                                <p className="text-xs text-success-600 dark:text-success-400 flex items-center gap-1">
                                                    <CheckCircle className="w-3 h-3" />
                                                    Earned on {badge.earnedDate}
                                                </p>
                                            ) : badge.progress !== undefined ? (
                                                <div>
                                                    <div className="flex justify-between text-xs mb-1">
                                                        <span className="text-neutral-500">Progress</span>
                                                        <span className="font-medium">{badge.progress}%</span>
                                                    </div>
                                                    <ProgressBar value={badge.progress} max={100} size="sm" />
                                                </div>
                                            ) : (
                                                <p className="text-xs text-neutral-500">Not started</p>
                                            )}
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'streaks' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Current Streak */}
                    <Card variant="glass">
                        <Card.Header>
                            <h3 className="font-semibold text-neutral-900 dark:text-white">Current Streak</h3>
                        </Card.Header>
                        <Card.Body>
                            <div className="text-center py-6">
                                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 flex items-center justify-center shadow-2xl mb-4">
                                    <div className="text-center">
                                        <Flame className="w-8 h-8 text-white mx-auto mb-1" />
                                        <span className="text-4xl font-bold text-white">{streakData.current}</span>
                                    </div>
                                </div>
                                <p className="text-xl font-semibold text-neutral-900 dark:text-white">Day Streak!</p>
                                <p className="text-neutral-500 mt-1">Keep it up! Your longest is {streakData.longest} days</p>
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Streak Calendar */}
                    <Card>
                        <Card.Header>
                            <h3 className="font-semibold text-neutral-900 dark:text-white">This Month's Activity</h3>
                        </Card.Header>
                        <Card.Body>
                            <div className="space-y-2">
                                <div className="grid grid-cols-7 gap-1 text-center text-xs text-neutral-500 mb-2">
                                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                                        <span key={i}>{day}</span>
                                    ))}
                                </div>
                                {streakData.thisMonth.map((week, weekIndex) => (
                                    <div key={weekIndex} className="grid grid-cols-7 gap-1">
                                        {week.map((day, dayIndex) => (
                                            <div
                                                key={dayIndex}
                                                className={`w-8 h-8 rounded-lg flex items-center justify-center ${day === 1
                                                    ? 'bg-gradient-to-br from-green-400 to-emerald-500'
                                                    : 'bg-neutral-100 dark:bg-neutral-800'
                                                    }`}
                                            >
                                                {day === 1 && <CheckCircle className="w-4 h-4 text-white" />}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center justify-center gap-4 mt-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded bg-gradient-to-br from-green-400 to-emerald-500" />
                                    <span className="text-neutral-600 dark:text-neutral-400">Active</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded bg-neutral-100 dark:bg-neutral-800" />
                                    <span className="text-neutral-600 dark:text-neutral-400">Inactive</span>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Streak Milestones */}
                    <Card className="lg:col-span-2">
                        <Card.Header>
                            <h3 className="font-semibold text-neutral-900 dark:text-white">Streak Milestones</h3>
                        </Card.Header>
                        <Card.Body>
                            <div className="flex items-center justify-between gap-4">
                                {[
                                    { days: 7, icon: '🔥', label: 'Week Warrior', achieved: true },
                                    { days: 14, icon: '💪', label: 'Fortnight Fighter', achieved: true },
                                    { days: 30, icon: '👑', label: 'Month Master', achieved: false },
                                    { days: 60, icon: '🏆', label: 'Legend Status', achieved: false },
                                    { days: 100, icon: '💎', label: 'Century Champion', achieved: false },
                                ].map((milestone, index) => (
                                    <div key={index} className="flex-1 text-center">
                                        <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-2xl mb-2 ${milestone.achieved
                                            ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg'
                                            : 'bg-neutral-100 dark:bg-neutral-800'
                                            }`}>
                                            {milestone.achieved ? milestone.icon : <Lock className="w-6 h-6 text-neutral-400" />}
                                        </div>
                                        <p className="font-medium text-neutral-900 dark:text-white">{milestone.days} Days</p>
                                        <p className="text-xs text-neutral-500">{milestone.label}</p>
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            )}

            {activeTab === 'leaderboard' && (
                <Card>
                    <Card.Header>
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-neutral-900 dark:text-white">Global Leaderboard</h3>
                            <Badge variant="primary">Top 100</Badge>
                        </div>
                    </Card.Header>
                    <Card.Body className="p-0">
                        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                            {mockLeaderboard.map((user) => (
                                <div
                                    key={user.rank}
                                    className={`flex items-center gap-4 px-6 py-4 ${user.isCurrentUser ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                                        }`}
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${user.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' :
                                        user.rank === 2 ? 'bg-gradient-to-br from-neutral-300 to-neutral-400 text-white' :
                                            user.rank === 3 ? 'bg-gradient-to-br from-orange-300 to-orange-400 text-white' :
                                                'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                                        }`}>
                                        {user.rank <= 3 ? (
                                            user.rank === 1 ? <Crown className="w-4 h-4" /> :
                                                user.rank === 2 ? <Medal className="w-4 h-4" /> :
                                                    <Award className="w-4 h-4" />
                                        ) : user.rank}
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                                        {getInitials(user.name)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium text-neutral-900 dark:text-white">{user.name}</p>
                                            {user.isCurrentUser && <Badge variant="primary" size="sm">You</Badge>}
                                        </div>
                                        <p className="text-sm text-neutral-500">Level {user.level} • {user.badges} badges</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-neutral-900 dark:text-white">{user.xp.toLocaleString()} XP</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
};
