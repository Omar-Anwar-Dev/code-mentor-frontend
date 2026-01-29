import React, { useState } from 'react';
import { Card, Button, Input, Badge, Modal } from '@/components/ui';
import {
    Search,
    MoreVertical,
    UserPlus,
    Edit2,
    Trash2,
    Shield,
    Users,
    UserCheck,
    UserX,
    Clock,
    Mail,
    Save,
    CheckCircle,
} from 'lucide-react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

// Mock users data
const mockUsers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Learner', status: 'active', createdAt: '2024-01-15', lastActive: '2 hours ago', completedTasks: 8 },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Learner', status: 'active', createdAt: '2024-01-20', lastActive: '1 day ago', completedTasks: 12 },
    { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'Admin', status: 'active', createdAt: '2023-12-01', lastActive: '30 min ago', completedTasks: 0 },
    { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'Learner', status: 'inactive', createdAt: '2024-02-01', lastActive: '2 weeks ago', completedTasks: 3 },
    { id: '5', name: 'Charlie Davis', email: 'charlie@example.com', role: 'Learner', status: 'suspended', createdAt: '2024-01-10', lastActive: '1 month ago', completedTasks: 5 },
    { id: '6', name: 'Emma Johnson', email: 'emma@example.com', role: 'Learner', status: 'active', createdAt: '2024-02-15', lastActive: '5 hours ago', completedTasks: 15 },
    { id: '7', name: 'Michael Chen', email: 'michael@example.com', role: 'Learner', status: 'active', createdAt: '2024-03-01', lastActive: '1 hour ago', completedTasks: 22 },
];

// Stats calculations
const stats = {
    total: mockUsers.length,
    active: mockUsers.filter(u => u.status === 'active').length,
    inactive: mockUsers.filter(u => u.status === 'inactive').length,
    admins: mockUsers.filter(u => u.role === 'Admin').length,
};

export const UserManagement: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

    const filteredUsers = mockUsers.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
        return matchesSearch && matchesRole && matchesStatus;
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active': return <Badge variant="success" size="sm">Active</Badge>;
            case 'inactive': return <Badge variant="warning" size="sm">Inactive</Badge>;
            case 'suspended': return <Badge variant="error" size="sm">Suspended</Badge>;
            default: return <Badge variant="default" size="sm">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">User Management</h1>
                    <p className="text-neutral-600 dark:text-neutral-400">Manage platform users and permissions</p>
                </div>
                <Button
                    variant="primary"
                    leftIcon={<UserPlus className="w-4 h-4" />}
                    onClick={() => setIsAddUserModalOpen(true)}
                >
                    Add User
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-900/20 dark:to-primary-800/10 border-primary-200/50 dark:border-primary-700/30">
                    <Card.Body className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">
                                <Users className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-neutral-900 dark:text-white">{stats.total}</p>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">Total Users</p>
                            </div>
                        </div>
                    </Card.Body>
                </Card>

                <Card className="bg-gradient-to-br from-success-50 to-success-100/50 dark:from-success-900/20 dark:to-success-800/10 border-success-200/50 dark:border-success-700/30">
                    <Card.Body className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-success-500/20 flex items-center justify-center">
                                <UserCheck className="w-5 h-5 text-success-600 dark:text-success-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-neutral-900 dark:text-white">{stats.active}</p>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">Active</p>
                            </div>
                        </div>
                    </Card.Body>
                </Card>

                <Card className="bg-gradient-to-br from-warning-50 to-warning-100/50 dark:from-warning-900/20 dark:to-warning-800/10 border-warning-200/50 dark:border-warning-700/30">
                    <Card.Body className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-warning-500/20 flex items-center justify-center">
                                <UserX className="w-5 h-5 text-warning-600 dark:text-warning-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-neutral-900 dark:text-white">{stats.inactive}</p>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">Inactive</p>
                            </div>
                        </div>
                    </Card.Body>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10 border-purple-200/50 dark:border-purple-700/30">
                    <Card.Body className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-neutral-900 dark:text-white">{stats.admins}</p>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">Admins</p>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <Card.Body className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <Input
                                placeholder="Search users..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                leftIcon={<Search className="w-5 h-5" />}
                            />
                        </div>
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                        >
                            <option value="all">All Roles</option>
                            <option value="Learner">Learner</option>
                            <option value="Admin">Admin</option>
                        </select>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="suspended">Suspended</option>
                        </select>
                    </div>
                </Card.Body>
            </Card>

            {/* Users Table */}
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-neutral-100 dark:border-neutral-700">
                                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-700 dark:text-neutral-300">User</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-700 dark:text-neutral-300">Role</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-700 dark:text-neutral-300">Status</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-700 dark:text-neutral-300">Tasks</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-700 dark:text-neutral-300">Last Active</th>
                                <th className="text-right px-6 py-4 text-sm font-semibold text-neutral-700 dark:text-neutral-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="border-b border-neutral-50 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-neutral-900 dark:text-white">{user.name}</p>
                                                <p className="text-sm text-neutral-500 dark:text-neutral-400">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant={user.role === 'Admin' ? 'primary' : 'default'}>
                                            {user.role === 'Admin' && <Shield className="w-3 h-3" />}
                                            {user.role}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                                    <td className="px-6 py-4 text-neutral-600 dark:text-neutral-400">{user.completedTasks}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span className="text-sm">{user.lastActive}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Menu as="div" className="relative inline-block text-left">
                                            <Menu.Button className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                                                <MoreVertical className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                                            </Menu.Button>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white dark:bg-neutral-800 shadow-lg border border-neutral-100 dark:border-neutral-700 focus:outline-none z-10">
                                                    <div className="p-1">
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button className={`flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg text-neutral-700 dark:text-neutral-300 ${active ? 'bg-neutral-100 dark:bg-neutral-700' : ''}`}>
                                                                    <Edit2 className="w-4 h-4" /> Edit User
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button className={`flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg text-neutral-700 dark:text-neutral-300 ${active ? 'bg-neutral-100 dark:bg-neutral-700' : ''}`}>
                                                                    <Shield className="w-4 h-4" /> Change Role
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                        <div className="border-t border-neutral-100 dark:border-neutral-700 my-1" />
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button className={`flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg text-error-600 dark:text-error-400 ${active ? 'bg-error-50 dark:bg-error-900/20' : ''}`}>
                                                                    <Trash2 className="w-4 h-4" /> Delete User
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                    </div>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredUsers.length === 0 && (
                        <div className="text-center py-12">
                            <Users className="w-12 h-12 mx-auto text-neutral-300 dark:text-neutral-600 mb-4" />
                            <p className="text-neutral-500 dark:text-neutral-400">No users found matching your criteria</p>
                        </div>
                    )}
                </div>
            </Card>

            {/* Add User Modal */}
            <Modal isOpen={isAddUserModalOpen} onClose={() => setIsAddUserModalOpen(false)} size="lg">
                <Modal.Header>Add New User</Modal.Header>
                <Modal.Body>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Full Name" placeholder="Enter full name..." />
                            <Input label="Email Address" placeholder="user@example.com" leftIcon={<Mail className="w-4 h-4" />} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                                    Role
                                </label>
                                <select className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500">
                                    <option value="Learner">Learner</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                                    Status
                                </label>
                                <select className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500">
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                        <Input label="Temporary Password" type="password" placeholder="Enter temporary password..." />
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm">
                            <CheckCircle className="w-4 h-4 flex-shrink-0" />
                            <span>User will receive an email with login instructions.</span>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="ghost" onClick={() => setIsAddUserModalOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="outline" leftIcon={<Save className="w-4 h-4" />}>
                        Save as Draft
                    </Button>
                    <Button variant="primary" leftIcon={<UserPlus className="w-4 h-4" />}>
                        Create User
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
