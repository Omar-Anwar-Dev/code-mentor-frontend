import React, { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import {
    Bell,
    Check,
    CheckCheck,
    Trophy,
    BookOpen,
    MessageSquare,
    Star,
    Clock,
    X,
    Settings,
} from 'lucide-react';

// Mock notification data - in real app this would come from an API/store
const mockNotifications = [
    {
        id: 1,
        type: 'achievement',
        title: 'Achievement Unlocked!',
        message: 'You completed your first coding challenge',
        time: '2 minutes ago',
        read: false,
        icon: Trophy,
        iconBg: 'bg-gradient-to-br from-yellow-400 to-orange-500',
    },
    {
        id: 2,
        type: 'course',
        title: 'New Course Available',
        message: 'Advanced TypeScript Patterns is now available',
        time: '1 hour ago',
        read: false,
        icon: BookOpen,
        iconBg: 'bg-gradient-to-br from-primary-400 to-primary-600',
    },
    {
        id: 3,
        type: 'feedback',
        title: 'Feedback Received',
        message: 'Your mentor reviewed your React project',
        time: '3 hours ago',
        read: false,
        icon: MessageSquare,
        iconBg: 'bg-gradient-to-br from-green-400 to-emerald-600',
    },
    {
        id: 4,
        type: 'milestone',
        title: '7-Day Streak!',
        message: 'Keep up the great work! You\'re on fire 🔥',
        time: '1 day ago',
        read: true,
        icon: Star,
        iconBg: 'bg-gradient-to-br from-purple-400 to-purple-600',
    },
    {
        id: 5,
        type: 'reminder',
        title: 'Continue Learning',
        message: 'You have 2 incomplete tasks in your learning path',
        time: '2 days ago',
        read: true,
        icon: Clock,
        iconBg: 'bg-gradient-to-br from-blue-400 to-blue-600',
    },
];

export const NotificationsPopup: React.FC = () => {
    const [notifications, setNotifications] = useState(mockNotifications);
    const unreadCount = notifications.filter((n) => !n.read).length;

    const markAsRead = (id: number) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const markAllAsRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    const removeNotification = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <Menu as="div" className="relative">
            <Menu.Button className="relative p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all duration-200">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-gradient-to-r from-error-500 to-rose-500 rounded-full shadow-lg shadow-error-500/30 animate-pulse">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95 translate-y-2"
                enterTo="transform opacity-100 scale-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="transform opacity-100 scale-100 translate-y-0"
                leaveTo="transform opacity-0 scale-95 translate-y-2"
            >
                <Menu.Items className="absolute right-0 mt-2 w-96 origin-top-right rounded-2xl bg-white dark:bg-neutral-800 shadow-2xl border border-neutral-100 dark:border-neutral-700 focus:outline-none overflow-hidden">
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-neutral-100 dark:border-neutral-700 bg-gradient-to-r from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-750">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                                    Notifications
                                </h3>
                                {unreadCount > 0 && (
                                    <span className="px-2 py-0.5 text-xs font-medium bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full">
                                        {unreadCount} new
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-1">
                                {unreadCount > 0 && (
                                    <button
                                        onClick={markAllAsRead}
                                        className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-lg transition-colors"
                                    >
                                        <CheckCheck className="w-3.5 h-3.5" />
                                        Mark all read
                                    </button>
                                )}
                                <button className="p-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors">
                                    <Settings className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-[420px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-700">
                        {notifications.length > 0 ? (
                            <div className="divide-y divide-neutral-100 dark:divide-neutral-700/50">
                                {notifications.map((notification) => {
                                    const IconComponent = notification.icon;
                                    return (
                                        <Menu.Item key={notification.id}>
                                            {({ active }) => (
                                                <div
                                                    onClick={() => markAsRead(notification.id)}
                                                    className={`relative flex items-start gap-3 p-4 cursor-pointer transition-all duration-200 ${active
                                                            ? 'bg-neutral-50 dark:bg-neutral-700/50'
                                                            : ''
                                                        } ${!notification.read
                                                            ? 'bg-primary-50/50 dark:bg-primary-500/5'
                                                            : ''
                                                        }`}
                                                >
                                                    {/* Unread indicator */}
                                                    {!notification.read && (
                                                        <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary-500" />
                                                    )}

                                                    {/* Icon */}
                                                    <div
                                                        className={`flex-shrink-0 w-10 h-10 rounded-xl ${notification.iconBg} flex items-center justify-center shadow-lg`}
                                                    >
                                                        <IconComponent className="w-5 h-5 text-white" />
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex-1 min-w-0">
                                                        <p
                                                            className={`text-sm font-medium ${notification.read
                                                                    ? 'text-neutral-700 dark:text-neutral-300'
                                                                    : 'text-neutral-900 dark:text-white'
                                                                }`}
                                                        >
                                                            {notification.title}
                                                        </p>
                                                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-2">
                                                            {notification.message}
                                                        </p>
                                                        <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1.5 flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {notification.time}
                                                        </p>
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="flex-shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {!notification.read && (
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    markAsRead(notification.id);
                                                                }}
                                                                className="p-1 text-neutral-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-lg transition-colors"
                                                                title="Mark as read"
                                                            >
                                                                <Check className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={(e) =>
                                                                removeNotification(notification.id, e)
                                                            }
                                                            className="p-1 text-neutral-400 hover:text-error-500 hover:bg-error-50 dark:hover:bg-error-500/10 rounded-lg transition-colors"
                                                            title="Remove"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </Menu.Item>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 px-4">
                                <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center mb-4">
                                    <Bell className="w-8 h-8 text-neutral-400" />
                                </div>
                                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
                                    All caught up!
                                </p>
                                <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
                                    No new notifications
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="px-4 py-3 border-t border-neutral-100 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50">
                            <button className="w-full text-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                                View all notifications
                            </button>
                        </div>
                    )}
                </Menu.Items>
            </Transition>
        </Menu>
    );
};
