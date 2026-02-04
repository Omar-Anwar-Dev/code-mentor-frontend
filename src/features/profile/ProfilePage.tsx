import React, { useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { Card, Badge, Button, ProgressBar, Input } from '@/components/ui';
import { addToast } from '@/features/ui/uiSlice';
import {
    Mail,
    Github,
    MapPin,
    Calendar,
    Link as LinkIcon,
    Edit3,
    Camera,
    Trophy,
    Flame,
    Target,
    Code,
    CheckCircle,
    Clock,
    BookOpen,
    Star,
    TrendingUp,
    ExternalLink,
    X,
    Save,
} from 'lucide-react';

// Mock user data
const mockUserData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: null,
    bio: 'Full Stack Developer passionate about building scalable applications and learning new technologies.',
    location: 'Cairo, Egypt',
    joinedAt: 'December 2024',
    githubUsername: 'omar-dev',
    githubConnected: true,
    website: 'https://omar-dev.com',
    level: 12,
    xp: 2450,
    xpToNextLevel: 3000,
    currentStreak: 7,
    longestStreak: 14,
    totalSubmissions: 47,
    avgScore: 85,
    completedTasks: 23,
    totalLearningHours: 156,
    badges: [
        { id: 1, name: 'Fast Learner', icon: '🚀', earned: true },
        { id: 2, name: 'Code Master', icon: '💻', earned: true },
        { id: 3, name: 'Week Warrior', icon: '🔥', earned: true },
        { id: 4, name: 'Perfect Score', icon: '⭐', earned: false },
    ],
    skills: [
        { name: 'React', level: 85 },
        { name: 'TypeScript', level: 78 },
        { name: 'Node.js', level: 72 },
        { name: 'Python', level: 65 },
        { name: 'SQL', level: 70 },
    ],
    recentActivity: [
        { id: 1, type: 'submission', title: 'Completed REST API Design', time: '2 hours ago', score: 92 },
        { id: 2, type: 'badge', title: 'Earned "Week Warrior" badge', time: '1 day ago' },
        { id: 3, type: 'task', title: 'Started React Hooks Advanced', time: '2 days ago' },
        { id: 4, type: 'submission', title: 'Completed Database Design', time: '3 days ago', score: 88 },
    ],
};

export const ProfilePage: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'skills'>('overview');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Profile data state (this will be updated when form is submitted)
    const [profileData, setProfileData] = useState({
        name: user?.name || mockUserData.name,
        email: user?.email || mockUserData.email,
        bio: mockUserData.bio,
        location: mockUserData.location,
        website: mockUserData.website,
    });

    // Form state for edit modal
    const [formData, setFormData] = useState({
        name: profileData.name,
        email: profileData.email,
        bio: profileData.bio,
        location: profileData.location,
        website: profileData.website,
    });

    // Merge profile data with mock static data
    const userData = { ...mockUserData, ...profileData };

    // Handle avatar file selection
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                dispatch(addToast({
                    type: 'error',
                    title: 'Invalid File',
                    message: 'Please select an image file.'
                }));
                return;
            }
            // Create URL for preview
            const url = URL.createObjectURL(file);
            setAvatarUrl(url);
            dispatch(addToast({
                type: 'success',
                title: 'Photo Updated',
                message: 'Your profile photo has been updated.'
            }));
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase();
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Update the profile data with form values
        setProfileData({
            name: formData.name,
            email: formData.email,
            bio: formData.bio,
            location: formData.location,
            website: formData.website,
        });
        dispatch(addToast({
            type: 'success',
            title: 'Profile Updated',
            message: 'Your profile has been updated successfully.'
        }));
        setIsEditModalOpen(false);
    };

    // Reset form data when modal opens
    const openEditModal = () => {
        setFormData({
            name: profileData.name,
            email: profileData.email,
            bio: profileData.bio,
            location: profileData.location,
            website: profileData.website,
        });
        setIsEditModalOpen(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Edit Profile Modal */}
            {isEditModalOpen && (
                <div
                    className="fixed inset-0 z-50 overflow-y-auto"
                    onClick={() => setIsEditModalOpen(false)}
                >
                    {/* Backdrop */}
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" />

                    <div className="flex min-h-full items-center justify-center p-4">
                        {/* Modal */}
                        <div
                            className="relative bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl w-full max-w-lg transform animate-scale-in"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
                                <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Edit Profile</h2>
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                                >
                                    <X className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
                                <Input
                                    label="Full Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Your full name"
                                />

                                <Input
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="your@email.com"
                                />

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                        Bio
                                    </label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200 resize-none"
                                        placeholder="Tell us about yourself..."
                                    />
                                </div>

                                <Input
                                    label="Location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    placeholder="City, Country"
                                />

                                <Input
                                    label="Website"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleInputChange}
                                    placeholder="https://yourwebsite.com"
                                />

                                {/* Actions */}
                                <div className="flex gap-3 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="flex-1"
                                        onClick={() => setIsEditModalOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="gradient"
                                        className="flex-1"
                                        leftIcon={<Save className="w-4 h-4" />}
                                    >
                                        Save Changes
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Profile Header */}
            <Card variant="glass" className="overflow-hidden">
                {/* Cover/Banner */}
                <div className="h-32 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 relative">
                    <div className="absolute inset-0 bg-white/10 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20px 20px, rgba(255,255,255,0.2) 2px, transparent 0)', backgroundSize: '40px 40px' }} />
                </div>

                <Card.Body className="relative pt-0">
                    {/* Hidden file input for avatar upload */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleAvatarChange}
                        accept="image/*"
                        className="hidden"
                    />

                    {/* Avatar */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-16 sm:-mt-12">
                        <div className="relative">
                            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-primary-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl border-4 border-white dark:border-neutral-800 overflow-hidden">
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt={userData.name} className="w-full h-full object-cover" />
                                ) : userData.avatar ? (
                                    <img src={userData.avatar} alt={userData.name} className="w-full h-full object-cover" />
                                ) : (
                                    getInitials(userData.name)
                                )}
                            </div>
                            <button
                                onClick={triggerFileInput}
                                className="absolute bottom-1 right-1 w-8 h-8 bg-white dark:bg-neutral-800 rounded-full shadow-lg flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors hover:scale-110"
                                title="Change profile photo"
                            >
                                <Camera className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                            </button>
                        </div>

                        <div className="flex-1 text-center sm:text-left pb-2">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">{userData.name}</h1>
                                <Badge variant="primary" className="self-center sm:self-auto">Level {userData.level}</Badge>
                            </div>
                            <p className="text-neutral-600 dark:text-neutral-400 mt-1">{userData.bio}</p>
                        </div>

                        <Button
                            variant="outline"
                            leftIcon={<Edit3 className="w-4 h-4" />}
                            onClick={openEditModal}
                            className="border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-500 dark:hover:text-white transition-all duration-300"
                        >
                            Edit Profile
                        </Button>
                    </div>

                    {/* User Info Grid */}
                    <div className="flex flex-wrap gap-4 mt-6 text-sm text-neutral-600 dark:text-neutral-400">
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span>{userData.email}</span>
                        </div>
                        {userData.location && (
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>{userData.location}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>Joined {userData.joinedAt}</span>
                        </div>
                        {userData.website && (
                            <a href={userData.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary-600 hover:text-primary-700">
                                <LinkIcon className="w-4 h-4" />
                                <span>Website</span>
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        )}
                    </div>

                    {/* GitHub Connection */}
                    <div className="mt-6 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-neutral-900 dark:bg-white flex items-center justify-center">
                                    <Github className="w-5 h-5 text-white dark:text-neutral-900" />
                                </div>
                                <div>
                                    <p className="font-medium text-neutral-900 dark:text-white">GitHub Account</p>
                                    {userData.githubConnected ? (
                                        <p className="text-sm text-success-600 dark:text-success-400 flex items-center gap-1">
                                            <CheckCircle className="w-3 h-3" />
                                            Connected as @{userData.githubUsername}
                                        </p>
                                    ) : (
                                        <p className="text-sm text-neutral-500">Not connected</p>
                                    )}
                                </div>
                            </div>
                            <Button variant={userData.githubConnected ? 'ghost' : 'primary'} size="sm">
                                {userData.githubConnected ? 'Disconnect' : 'Connect'}
                            </Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { icon: Flame, value: userData.currentStreak, label: 'Day Streak', subtext: `Best: ${userData.longestStreak}`, gradient: 'from-orange-500 to-yellow-400', bg: 'bg-orange-500/10 dark:bg-orange-500/20' },
                    { icon: Target, value: userData.completedTasks, label: 'Tasks Done', subtext: `${userData.totalSubmissions} submissions`, gradient: 'from-green-500 to-emerald-400', bg: 'bg-green-500/10 dark:bg-green-500/20' },
                    { icon: TrendingUp, value: `${userData.avgScore}%`, label: 'Avg Score', subtext: 'Above average', gradient: 'from-blue-500 to-cyan-400', bg: 'bg-blue-500/10 dark:bg-blue-500/20' },
                    { icon: Clock, value: `${userData.totalLearningHours}h`, label: 'Learning Time', subtext: 'Total hours', gradient: 'from-purple-500 to-pink-400', bg: 'bg-purple-500/10 dark:bg-purple-500/20' },
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

            {/* XP Progress */}
            <Card>
                <Card.Body className="p-5">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                                <Star className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="font-semibold text-neutral-900 dark:text-white">Level {userData.level} Progress</p>
                                <p className="text-sm text-neutral-500">{userData.xp} / {userData.xpToNextLevel} XP</p>
                            </div>
                        </div>
                        <Badge variant="warning">{userData.xpToNextLevel - userData.xp} XP to Level {userData.level + 1}</Badge>
                    </div>
                    <ProgressBar value={userData.xp} max={userData.xpToNextLevel} size="lg" showLabel />
                </Card.Body>
            </Card>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-neutral-200 dark:border-neutral-700">
                {(['overview', 'activity', 'skills'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 font-medium text-sm transition-colors relative ${activeTab === tab
                            ? 'text-primary-600 dark:text-primary-400'
                            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                            }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400" />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {activeTab === 'overview' && (
                    <>
                        {/* Badges */}
                        <Card className="lg:col-span-2">
                            <Card.Header>
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-neutral-900 dark:text-white">Recent Badges</h3>
                                    <a href="/achievements" className="text-sm text-primary-600 hover:text-primary-700">View all</a>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <div className="flex flex-wrap gap-4">
                                    {userData.badges.map((badge) => (
                                        <div
                                            key={badge.id}
                                            className={`flex items-center gap-3 p-3 rounded-xl border ${badge.earned
                                                ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800'
                                                : 'bg-neutral-50 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-700 opacity-50'
                                                }`}
                                        >
                                            <span className="text-2xl">{badge.icon}</span>
                                            <div>
                                                <p className="font-medium text-neutral-900 dark:text-white">{badge.name}</p>
                                                <p className="text-xs text-neutral-500">{badge.earned ? 'Earned' : 'Locked'}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card.Body>
                        </Card>

                        {/* Top Skills */}
                        <Card>
                            <Card.Header>
                                <h3 className="font-semibold text-neutral-900 dark:text-white">Top Skills</h3>
                            </Card.Header>
                            <Card.Body className="space-y-4">
                                {userData.skills.slice(0, 5).map((skill) => (
                                    <div key={skill.name}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium text-neutral-700 dark:text-neutral-300">{skill.name}</span>
                                            <span className="text-neutral-500">{skill.level}%</span>
                                        </div>
                                        <ProgressBar value={skill.level} max={100} size="sm" />
                                    </div>
                                ))}
                            </Card.Body>
                        </Card>
                    </>
                )}

                {activeTab === 'activity' && (
                    <Card className="lg:col-span-3">
                        <Card.Header>
                            <h3 className="font-semibold text-neutral-900 dark:text-white">Recent Activity</h3>
                        </Card.Header>
                        <Card.Body className="p-0">
                            <ul className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                {userData.recentActivity.map((activity) => (
                                    <li key={activity.id} className="flex items-center gap-4 px-6 py-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.type === 'submission' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' :
                                            activity.type === 'badge' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600' :
                                                'bg-green-100 dark:bg-green-900/30 text-green-600'
                                            }`}>
                                            {activity.type === 'submission' ? <Code className="w-5 h-5" /> :
                                                activity.type === 'badge' ? <Trophy className="w-5 h-5" /> :
                                                    <BookOpen className="w-5 h-5" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-neutral-900 dark:text-white">{activity.title}</p>
                                            <p className="text-sm text-neutral-500">{activity.time}</p>
                                        </div>
                                        {activity.score && (
                                            <Badge variant="success">{activity.score}%</Badge>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                )}

                {activeTab === 'skills' && (
                    <Card className="lg:col-span-3">
                        <Card.Header>
                            <h3 className="font-semibold text-neutral-900 dark:text-white">Skill Breakdown</h3>
                        </Card.Header>
                        <Card.Body>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {userData.skills.map((skill) => (
                                    <div key={skill.name} className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="font-semibold text-neutral-900 dark:text-white">{skill.name}</span>
                                            <Badge variant={skill.level >= 80 ? 'success' : skill.level >= 60 ? 'warning' : 'default'}>
                                                {skill.level >= 80 ? 'Advanced' : skill.level >= 60 ? 'Intermediate' : 'Beginner'}
                                            </Badge>
                                        </div>
                                        <ProgressBar value={skill.level} max={100} size="md" showLabel />
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                )}
            </div>
        </div>
    );
};
