import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { toggleCompactMode, addToast } from '@/features/ui/uiSlice';
import { Card, Button, Input } from '@/components/ui';
import {
    User,
    Mail,
    Lock,
    Bell,
    Moon,
    Sun,
    Globe,
    Shield,
    Eye,
    EyeOff,
    Github,
    Trash2,
    Download,
    CheckCircle,
    AlertTriangle,
    Smartphone,
    Monitor,
    ArrowLeft,
    X,
    Link as LinkIcon,
    Unlink,
} from 'lucide-react';

// Mock settings state
const initialSettings = {
    notifications: {
        emailSubmissionComplete: true,
        emailWeeklyProgress: true,
        emailNewBadges: false,
        emailCommunityReplies: true,
        pushEnabled: true,
        pushSubmissions: true,
        pushStreakReminder: true,
    },
    privacy: {
        publicProfile: true,
        showLearningCV: true,
        showActivity: false,
        allowAnalytics: true,
    },
    appearance: {
        theme: 'system' as 'light' | 'dark' | 'system',
    },
};

export const SettingsPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const compactMode = useAppSelector((state) => state.ui.compactMode);
    const [settings, setSettings] = useState(initialSettings);
    const [activeSection, setActiveSection] = useState('account');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    // Connected accounts state
    const [connectedAccounts, setConnectedAccounts] = useState({
        github: { connected: true, username: '@omar-dev' },
        google: { connected: false, email: '' },
    });

    // Modal states
    const [showDisconnectModal, setShowDisconnectModal] = useState<'github' | 'google' | null>(null);
    const [showConnectModal, setShowConnectModal] = useState<'github' | 'google' | null>(null);
    const [connectEmail, setConnectEmail] = useState('');
    const [showExportModal, setShowExportModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState('');

    const sections = [
        { id: 'account', label: 'Account', icon: User },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'appearance', label: 'Appearance', icon: Moon },
        { id: 'privacy', label: 'Privacy & Security', icon: Shield },
        { id: 'connections', label: 'Connected Accounts', icon: Github },
        { id: 'data', label: 'Data & Export', icon: Download },
    ];

    const toggleNotification = (key: keyof typeof settings.notifications) => {
        setSettings({
            ...settings,
            notifications: {
                ...settings.notifications,
                [key]: !settings.notifications[key],
            },
        });
    };

    const togglePrivacy = (key: keyof typeof settings.privacy) => {
        setSettings({
            ...settings,
            privacy: {
                ...settings.privacy,
                [key]: !settings.privacy[key],
            },
        });
    };

    const ToggleSwitch = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
        <button
            onClick={onToggle}
            className={`relative w-11 h-6 rounded-full transition-colors ${enabled ? 'bg-primary-600' : 'bg-neutral-300 dark:bg-neutral-600'
                }`}
        >
            <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
            />
        </button>
    );

    return (
        <div className="min-h-screen">
            {/* Header with Back Navigation */}
            <div className="flex items-center gap-3 sm:gap-4 mb-6">
                <Link to="/dashboard">
                    <button className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center justify-center transition-colors">
                        <ArrowLeft className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                    </button>
                </Link>
                <div className="min-w-0">
                    <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white truncate">Settings</h1>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 hidden sm:block">Manage your account preferences</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                {/* Sidebar Navigation - Horizontal scroll on mobile, vertical on desktop */}
                <div className="lg:w-56 xl:w-64 lg:flex-shrink-0">
                    <Card className="overflow-hidden">
                        <Card.Body className="p-2">
                            {/* Mobile: Horizontal scrollable tabs */}
                            <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 -mx-2 px-2 lg:mx-0 lg:px-0">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-left transition-colors whitespace-nowrap lg:whitespace-normal lg:w-full flex-shrink-0 ${activeSection === section.id
                                            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                                            : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                                            }`}
                                    >
                                        <section.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                                        <span className="font-medium text-sm sm:text-base">{section.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </Card.Body>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="flex-1 space-y-4 sm:space-y-6 min-w-0">
                    {/* Account Settings */}
                    {activeSection === 'account' && (
                        <>
                            <Card>
                                <Card.Header>
                                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Profile Information</h2>
                                </Card.Header>
                                <Card.Body className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input
                                            label="Full Name"
                                            placeholder="Your full name"
                                            defaultValue="Omar Ahmed"
                                            leftIcon={<User className="w-4 h-4" />}
                                        />
                                        <Input
                                            label="Email Address"
                                            type="email"
                                            placeholder="your@email.com"
                                            defaultValue="omar.ahmed@example.com"
                                            leftIcon={<Mail className="w-4 h-4" />}
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <Button variant="primary">Save Changes</Button>
                                    </div>
                                </Card.Body>
                            </Card>

                            <Card>
                                <Card.Header>
                                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Change Password</h2>
                                </Card.Header>
                                <Card.Body className="space-y-4">
                                    <Input
                                        label="Current Password"
                                        type={showCurrentPassword ? 'text' : 'password'}
                                        placeholder="Enter current password"
                                        leftIcon={<Lock className="w-4 h-4" />}
                                        rightIcon={
                                            <button onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                                                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        }
                                    />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input
                                            label="New Password"
                                            type={showNewPassword ? 'text' : 'password'}
                                            placeholder="Enter new password"
                                            leftIcon={<Lock className="w-4 h-4" />}
                                        />
                                        <Input
                                            label="Confirm New Password"
                                            type={showNewPassword ? 'text' : 'password'}
                                            placeholder="Confirm new password"
                                            leftIcon={<Lock className="w-4 h-4" />}
                                            rightIcon={
                                                <button onClick={() => setShowNewPassword(!showNewPassword)}>
                                                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            }
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <Button variant="primary">Update Password</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </>
                    )}

                    {/* Notifications */}
                    {activeSection === 'notifications' && (
                        <>
                            <Card>
                                <Card.Header>
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-5 h-5 text-primary-600" />
                                        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Email Notifications</h2>
                                    </div>
                                </Card.Header>
                                <Card.Body className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                    {[
                                        { key: 'emailSubmissionComplete' as const, label: 'Submission Complete', desc: 'Get notified when your code review is ready' },
                                        { key: 'emailWeeklyProgress' as const, label: 'Weekly Progress Report', desc: 'Receive a summary of your learning progress' },
                                        { key: 'emailNewBadges' as const, label: 'New Achievements', desc: 'Get notified when you earn new badges' },
                                        { key: 'emailCommunityReplies' as const, label: 'Community Replies', desc: 'Get notified when someone replies to your posts' },
                                    ].map((item) => (
                                        <div key={item.key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                                            <div>
                                                <p className="font-medium text-neutral-900 dark:text-white">{item.label}</p>
                                                <p className="text-sm text-neutral-500">{item.desc}</p>
                                            </div>
                                            <ToggleSwitch
                                                enabled={settings.notifications[item.key]}
                                                onToggle={() => toggleNotification(item.key)}
                                            />
                                        </div>
                                    ))}
                                </Card.Body>
                            </Card>

                            <Card>
                                <Card.Header>
                                    <div className="flex items-center gap-2">
                                        <Smartphone className="w-5 h-5 text-primary-600" />
                                        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Push Notifications</h2>
                                    </div>
                                </Card.Header>
                                <Card.Body className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                    {[
                                        { key: 'pushEnabled' as const, label: 'Enable Push Notifications', desc: 'Receive notifications in your browser' },
                                        { key: 'pushSubmissions' as const, label: 'Submission Updates', desc: 'Get instant updates on your submissions' },
                                        { key: 'pushStreakReminder' as const, label: 'Streak Reminder', desc: 'Daily reminder to maintain your streak' },
                                    ].map((item) => (
                                        <div key={item.key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                                            <div>
                                                <p className="font-medium text-neutral-900 dark:text-white">{item.label}</p>
                                                <p className="text-sm text-neutral-500">{item.desc}</p>
                                            </div>
                                            <ToggleSwitch
                                                enabled={settings.notifications[item.key]}
                                                onToggle={() => toggleNotification(item.key)}
                                            />
                                        </div>
                                    ))}
                                </Card.Body>
                            </Card>
                        </>
                    )}

                    {/* Appearance */}
                    {activeSection === 'appearance' && (
                        <Card>
                            <Card.Header>
                                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Theme Preferences</h2>
                            </Card.Header>
                            <Card.Body className="space-y-6">
                                <div>
                                    <p className="font-medium text-neutral-900 dark:text-white mb-3">Choose Theme</p>
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            { id: 'light', label: 'Light', icon: Sun },
                                            { id: 'dark', label: 'Dark', icon: Moon },
                                            { id: 'system', label: 'System', icon: Monitor },
                                        ].map((theme) => (
                                            <button
                                                key={theme.id}
                                                onClick={() => setSettings({ ...settings, appearance: { ...settings.appearance, theme: theme.id as 'light' | 'dark' | 'system' } })}
                                                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-colors ${settings.appearance.theme === theme.id
                                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                                    : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
                                                    }`}
                                            >
                                                <theme.icon className={`w-6 h-6 ${settings.appearance.theme === theme.id ? 'text-primary-600' : 'text-neutral-500'
                                                    }`} />
                                                <span className={`text-sm font-medium ${settings.appearance.theme === theme.id ? 'text-primary-600' : 'text-neutral-600 dark:text-neutral-400'
                                                    }`}>{theme.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between py-4 border-t border-neutral-200 dark:border-neutral-700">
                                    <div>
                                        <p className="font-medium text-neutral-900 dark:text-white">Compact Mode</p>
                                        <p className="text-sm text-neutral-500">Reduce spacing and padding in the UI</p>
                                    </div>
                                    <ToggleSwitch
                                        enabled={compactMode}
                                        onToggle={() => dispatch(toggleCompactMode())}
                                    />
                                </div>
                            </Card.Body>
                        </Card>
                    )}

                    {/* Privacy & Security */}
                    {activeSection === 'privacy' && (
                        <>
                            <Card>
                                <Card.Header>
                                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Privacy Settings</h2>
                                </Card.Header>
                                <Card.Body className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                    {[
                                        { key: 'publicProfile' as const, label: 'Public Profile', desc: 'Allow others to view your profile' },
                                        { key: 'showLearningCV' as const, label: 'Show Learning CV', desc: 'Make your Learning CV visible to employers' },
                                        { key: 'showActivity' as const, label: 'Show Activity', desc: 'Display your recent activity on your profile' },
                                        { key: 'allowAnalytics' as const, label: 'Usage Analytics', desc: 'Help us improve by sharing anonymous usage data' },
                                    ].map((item) => (
                                        <div key={item.key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                                            <div>
                                                <p className="font-medium text-neutral-900 dark:text-white">{item.label}</p>
                                                <p className="text-sm text-neutral-500">{item.desc}</p>
                                            </div>
                                            <ToggleSwitch
                                                enabled={settings.privacy[item.key]}
                                                onToggle={() => togglePrivacy(item.key)}
                                            />
                                        </div>
                                    ))}
                                </Card.Body>
                            </Card>

                            <Card>
                                <Card.Header>
                                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Security</h2>
                                </Card.Header>
                                <Card.Body className="space-y-4">
                                    <div className="flex items-center justify-between p-4 rounded-xl bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800">
                                        <div className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-success-600" />
                                            <div>
                                                <p className="font-medium text-success-900 dark:text-success-100">Email Verified</p>
                                                <p className="text-sm text-success-700 dark:text-success-300">Your email address is verified</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-4 rounded-xl bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800">
                                        <div className="flex items-center gap-3">
                                            <AlertTriangle className="w-5 h-5 text-warning-600" />
                                            <div>
                                                <p className="font-medium text-warning-900 dark:text-warning-100">Two-Factor Authentication</p>
                                                <p className="text-sm text-warning-700 dark:text-warning-300">Add an extra layer of security</p>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm">Enable</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </>
                    )}

                    {/* Connected Accounts */}
                    {activeSection === 'connections' && (
                        <Card>
                            <Card.Header>
                                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Connected Accounts</h2>
                            </Card.Header>
                            <Card.Body className="space-y-4">
                                {/* GitHub */}
                                <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-neutral-900 dark:bg-white flex items-center justify-center">
                                            <Github className="w-6 h-6 text-white dark:text-neutral-900" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-neutral-900 dark:text-white">GitHub</p>
                                            {connectedAccounts.github.connected ? (
                                                <p className="text-sm text-success-600 flex items-center gap-1">
                                                    <CheckCircle className="w-3 h-3" />
                                                    Connected as {connectedAccounts.github.username}
                                                </p>
                                            ) : (
                                                <p className="text-sm text-neutral-500">Not connected</p>
                                            )}
                                        </div>
                                    </div>
                                    {connectedAccounts.github.connected ? (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-error-600 hover:text-error-700"
                                            onClick={() => setShowDisconnectModal('github')}
                                        >
                                            Disconnect
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setShowConnectModal('github')}
                                        >
                                            Connect
                                        </Button>
                                    )}
                                </div>

                                {/* Google */}
                                <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                                            <Globe className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-neutral-900 dark:text-white">Google</p>
                                            {connectedAccounts.google.connected ? (
                                                <p className="text-sm text-success-600 flex items-center gap-1">
                                                    <CheckCircle className="w-3 h-3" />
                                                    Connected as {connectedAccounts.google.email}
                                                </p>
                                            ) : (
                                                <p className="text-sm text-neutral-500">Not connected</p>
                                            )}
                                        </div>
                                    </div>
                                    {connectedAccounts.google.connected ? (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-error-600 hover:text-error-700"
                                            onClick={() => setShowDisconnectModal('google')}
                                        >
                                            Disconnect
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setShowConnectModal('google')}
                                        >
                                            Connect
                                        </Button>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    )}

                    {/* Disconnect Modal */}
                    {showDisconnectModal && (
                        <div
                            className="fixed inset-0 z-50 overflow-y-auto"
                            onClick={() => setShowDisconnectModal(null)}
                        >
                            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" />
                            <div className="flex min-h-full items-center justify-center p-4">
                                <div
                                    className="relative bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl w-full max-w-md transform animate-scale-in"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-error-100 dark:bg-error-900/30 flex items-center justify-center">
                                                <Unlink className="w-5 h-5 text-error-600" />
                                            </div>
                                            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                                                Disconnect {showDisconnectModal === 'github' ? 'GitHub' : 'Google'}
                                            </h2>
                                        </div>
                                        <button
                                            onClick={() => setShowDisconnectModal(null)}
                                            className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                                        >
                                            <X className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                                        </button>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                                            Are you sure you want to disconnect your {showDisconnectModal === 'github' ? 'GitHub' : 'Google'} account?
                                            You will need to reconnect it to use related features.
                                        </p>
                                        <div className="flex gap-3">
                                            <Button
                                                variant="outline"
                                                className="flex-1"
                                                onClick={() => setShowDisconnectModal(null)}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                variant="primary"
                                                className="flex-1 bg-error-600 hover:bg-error-700"
                                                onClick={() => {
                                                    const account = showDisconnectModal;
                                                    setConnectedAccounts(prev => ({
                                                        ...prev,
                                                        [account]: { connected: false, username: '', email: '' }
                                                    }));
                                                    dispatch(addToast({
                                                        type: 'success',
                                                        title: 'Account Disconnected',
                                                        message: `Your ${account === 'github' ? 'GitHub' : 'Google'} account has been disconnected.`
                                                    }));
                                                    setShowDisconnectModal(null);
                                                }}
                                            >
                                                Disconnect
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Connect Modal */}
                    {showConnectModal && (
                        <div
                            className="fixed inset-0 z-50 overflow-y-auto"
                            onClick={() => setShowConnectModal(null)}
                        >
                            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" />
                            <div className="flex min-h-full items-center justify-center p-4">
                                <div
                                    className="relative bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl w-full max-w-md transform animate-scale-in"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                                                <LinkIcon className="w-5 h-5 text-primary-600" />
                                            </div>
                                            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                                                Connect {showConnectModal === 'github' ? 'GitHub' : 'Google'}
                                            </h2>
                                        </div>
                                        <button
                                            onClick={() => setShowConnectModal(null)}
                                            className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                                        >
                                            <X className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                                        </button>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                                            {showConnectModal === 'github'
                                                ? 'Connect your GitHub account to sync your repositories and showcase your coding activity.'
                                                : 'Connect your Google account to enable single sign-on and sync your preferences.'}
                                        </p>
                                        {showConnectModal === 'google' && (
                                            <Input
                                                label="Google Email"
                                                type="email"
                                                value={connectEmail}
                                                onChange={(e) => setConnectEmail(e.target.value)}
                                                placeholder="your@gmail.com"
                                                className="mb-4"
                                            />
                                        )}
                                        <div className="flex gap-3">
                                            <Button
                                                variant="outline"
                                                className="flex-1"
                                                onClick={() => {
                                                    setShowConnectModal(null);
                                                    setConnectEmail('');
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                variant="gradient"
                                                className="flex-1"
                                                onClick={() => {
                                                    const account = showConnectModal;
                                                    if (account === 'github') {
                                                        setConnectedAccounts(prev => ({
                                                            ...prev,
                                                            github: { connected: true, username: '@user' }
                                                        }));
                                                    } else {
                                                        setConnectedAccounts(prev => ({
                                                            ...prev,
                                                            google: { connected: true, email: connectEmail || 'user@gmail.com' }
                                                        }));
                                                    }
                                                    dispatch(addToast({
                                                        type: 'success',
                                                        title: 'Account Connected',
                                                        message: `Your ${account === 'github' ? 'GitHub' : 'Google'} account has been connected successfully!`
                                                    }));
                                                    setShowConnectModal(null);
                                                    setConnectEmail('');
                                                }}
                                            >
                                                Connect Account
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Data & Export */}
                    {activeSection === 'data' && (
                        <>
                            <Card>
                                <Card.Header>
                                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Export Your Data</h2>
                                </Card.Header>
                                <Card.Body className="space-y-4">
                                    <p className="text-neutral-600 dark:text-neutral-400">
                                        Download a copy of all your data including profile information, submissions, feedback, and progress history.
                                    </p>
                                    <Button
                                        variant="outline"
                                        leftIcon={<Download className="w-4 h-4" />}
                                        onClick={() => setShowExportModal(true)}
                                    >
                                        Request Data Export
                                    </Button>
                                </Card.Body>
                            </Card>

                            <Card className="border-error-200 dark:border-error-800">
                                <Card.Header>
                                    <h2 className="text-lg font-semibold text-error-600">Danger Zone</h2>
                                </Card.Header>
                                <Card.Body className="space-y-4">
                                    <div className="flex items-center justify-between p-4 rounded-xl bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800">
                                        <div>
                                            <p className="font-medium text-error-900 dark:text-error-100">Delete Account</p>
                                            <p className="text-sm text-error-700 dark:text-error-300">
                                                Permanently delete your account and all associated data
                                            </p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-error-600 hover:text-error-700 hover:bg-error-100 dark:hover:bg-error-900/30"
                                            leftIcon={<Trash2 className="w-4 h-4" />}
                                            onClick={() => setShowDeleteModal(true)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </>
                    )}

                    {/* Export Data Modal */}
                    {showExportModal && (
                        <div
                            className="fixed inset-0 z-50 overflow-y-auto"
                            onClick={() => setShowExportModal(false)}
                        >
                            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" />
                            <div className="flex min-h-full items-center justify-center p-4">
                                <div
                                    className="relative bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl w-full max-w-md transform animate-scale-in"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                                                <Download className="w-5 h-5 text-primary-600" />
                                            </div>
                                            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Export Your Data</h2>
                                        </div>
                                        <button
                                            onClick={() => setShowExportModal(false)}
                                            className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                                        >
                                            <X className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                                        </button>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                                            Your data export will include:
                                        </p>
                                        <ul className="text-sm text-neutral-500 dark:text-neutral-400 space-y-2 mb-6">
                                            <li className="flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4 text-success-500" />
                                                Profile information and settings
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4 text-success-500" />
                                                All code submissions and feedback
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4 text-success-500" />
                                                Progress history and achievements
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4 text-success-500" />
                                                Learning path data and notes
                                            </li>
                                        </ul>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                                            You will receive an email with a download link within 24 hours.
                                        </p>
                                        <div className="flex gap-3">
                                            <Button
                                                variant="outline"
                                                className="flex-1"
                                                onClick={() => setShowExportModal(false)}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                variant="gradient"
                                                className="flex-1"
                                                leftIcon={<Download className="w-4 h-4" />}
                                                onClick={() => {
                                                    dispatch(addToast({
                                                        type: 'success',
                                                        title: 'Export Requested',
                                                        message: 'Your data export has been requested. You will receive an email shortly.'
                                                    }));
                                                    setShowExportModal(false);
                                                }}
                                            >
                                                Request Export
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Delete Account Modal */}
                    {showDeleteModal && (
                        <div
                            className="fixed inset-0 z-50 overflow-y-auto"
                            onClick={() => {
                                setShowDeleteModal(false);
                                setDeleteConfirmText('');
                            }}
                        >
                            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" />
                            <div className="flex min-h-full items-center justify-center p-4">
                                <div
                                    className="relative bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl w-full max-w-md transform animate-scale-in"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-error-100 dark:bg-error-900/30 flex items-center justify-center">
                                                <Trash2 className="w-5 h-5 text-error-600" />
                                            </div>
                                            <h2 className="text-xl font-bold text-error-600">Delete Account</h2>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setShowDeleteModal(false);
                                                setDeleteConfirmText('');
                                            }}
                                            className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                                        >
                                            <X className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                                        </button>
                                    </div>
                                    <div className="p-6">
                                        <div className="bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-xl p-4 mb-4">
                                            <div className="flex items-start gap-3">
                                                <AlertTriangle className="w-5 h-5 text-error-600 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="font-medium text-error-900 dark:text-error-100 mb-1">
                                                        This action is irreversible!
                                                    </p>
                                                    <p className="text-sm text-error-700 dark:text-error-300">
                                                        All your data will be permanently deleted including submissions, progress, and achievements.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                                Type <span className="font-bold text-error-600">DELETE</span> to confirm
                                            </label>
                                            <Input
                                                value={deleteConfirmText}
                                                onChange={(e) => setDeleteConfirmText(e.target.value)}
                                                placeholder="Type DELETE to confirm"
                                            />
                                        </div>
                                        <div className="flex gap-3">
                                            <Button
                                                variant="outline"
                                                className="flex-1"
                                                onClick={() => {
                                                    setShowDeleteModal(false);
                                                    setDeleteConfirmText('');
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                variant="primary"
                                                className="flex-1 bg-error-600 hover:bg-error-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={deleteConfirmText !== 'DELETE'}
                                                leftIcon={<Trash2 className="w-4 h-4" />}
                                                onClick={() => {
                                                    if (deleteConfirmText === 'DELETE') {
                                                        dispatch(addToast({
                                                            type: 'success',
                                                            title: 'Account Deleted',
                                                            message: 'Your account has been permanently deleted.'
                                                        }));
                                                        setShowDeleteModal(false);
                                                        setDeleteConfirmText('');
                                                    }
                                                }}
                                            >
                                                Delete Account
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
