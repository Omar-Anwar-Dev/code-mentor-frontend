import React, { useState } from 'react';
import { Card, Badge, Button, Input, Modal } from '@/components/ui';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Eye,
    CheckCircle,
    Clock,
    FileCode,
    Users,
    TrendingUp,
    Save,
    AlertTriangle,
} from 'lucide-react';

// Initial tasks data
const initialTasks = [
    {
        id: '1',
        title: 'Build REST API with Node.js',
        description: 'Create a complete REST API with authentication, CRUD operations, and proper error handling.',
        difficulty: 'Intermediate',
        category: 'Backend',
        track: 'Full Stack',
        status: 'Published',
        submissions: 234,
        avgScore: 78,
        createdAt: '2024-12-01',
        estimatedTime: 4,
    },
    {
        id: '2',
        title: 'React Component Library',
        description: 'Build a reusable component library with proper TypeScript types and documentation.',
        difficulty: 'Advanced',
        category: 'Frontend',
        track: 'Frontend',
        status: 'Published',
        submissions: 156,
        avgScore: 82,
        createdAt: '2024-12-05',
        estimatedTime: 6,
    },
    {
        id: '3',
        title: 'Database Schema Design',
        description: 'Design a normalized database schema for an e-commerce application.',
        difficulty: 'Beginner',
        category: 'Database',
        track: 'Backend',
        status: 'Published',
        submissions: 312,
        avgScore: 85,
        createdAt: '2024-12-10',
        estimatedTime: 2,
    },
    {
        id: '4',
        title: 'Security Best Practices',
        description: 'Implement authentication and authorization with security best practices.',
        difficulty: 'Advanced',
        category: 'Security',
        track: 'Full Stack',
        status: 'Draft',
        submissions: 0,
        avgScore: 0,
        createdAt: '2024-12-15',
        estimatedTime: 5,
    },
    {
        id: '5',
        title: 'Python Data Processing',
        description: 'Build a data processing pipeline with pandas and numpy.',
        difficulty: 'Intermediate',
        category: 'Data',
        track: 'Python',
        status: 'Published',
        submissions: 89,
        avgScore: 76,
        createdAt: '2024-12-18',
        estimatedTime: 3,
    },
    {
        id: '6',
        title: 'CSS Animations Workshop',
        description: 'Create advanced CSS animations and transitions.',
        difficulty: 'Beginner',
        category: 'Frontend',
        track: 'Frontend',
        status: 'Archived',
        submissions: 445,
        avgScore: 88,
        createdAt: '2024-11-20',
        estimatedTime: 2,
    },
];

type Task = typeof initialTasks[0];

const difficultyColors = {
    Beginner: 'success',
    Intermediate: 'warning',
    Advanced: 'error',
} as const;

const statusColors = {
    Published: 'success',
    Draft: 'warning',
    Archived: 'default',
} as const;

export const TaskManagement: React.FC = () => {
    // Tasks state
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    // Filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
    const [filterTrack, setFilterTrack] = useState<string>('all');

    // Modal states
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [editTask, setEditTask] = useState<Task | null>(null);
    const [deleteTask, setDeleteTask] = useState<Task | null>(null);

    // Form state for create modal
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        difficulty: 'Beginner',
        track: 'Full Stack',
        category: 'Frontend',
        estimatedTime: 4,
    });

    // Form state for edit modal
    const [editFormData, setEditFormData] = useState({
        title: '',
        description: '',
        difficulty: 'Beginner',
        track: 'Full Stack',
        status: 'Draft',
        estimatedTime: 4,
    });

    // Update edit form when editTask changes
    React.useEffect(() => {
        if (editTask) {
            setEditFormData({
                title: editTask.title,
                description: editTask.description,
                difficulty: editTask.difficulty,
                track: editTask.track,
                status: editTask.status,
                estimatedTime: editTask.estimatedTime,
            });
        }
    }, [editTask]);

    // Create task handler
    const handleCreateTask = (status: 'Draft' | 'Published') => {
        const task: Task = {
            id: String(Date.now()),
            title: newTask.title,
            description: newTask.description,
            difficulty: newTask.difficulty,
            category: newTask.category,
            track: newTask.track,
            status: status,
            submissions: 0,
            avgScore: 0,
            createdAt: new Date().toISOString().split('T')[0],
            estimatedTime: newTask.estimatedTime,
        };
        setTasks([task, ...tasks]);
        setIsCreateModalOpen(false);
        setNewTask({
            title: '',
            description: '',
            difficulty: 'Beginner',
            track: 'Full Stack',
            category: 'Frontend',
            estimatedTime: 4,
        });
    };

    // Update task handler
    const handleUpdateTask = () => {
        if (!editTask) return;
        setTasks(tasks.map(t =>
            t.id === editTask.id
                ? {
                    ...t,
                    title: editFormData.title,
                    description: editFormData.description,
                    difficulty: editFormData.difficulty,
                    track: editFormData.track,
                    status: editFormData.status,
                    estimatedTime: editFormData.estimatedTime,
                }
                : t
        ));
        setEditTask(null);
    };

    // Delete task handler
    const handleDeleteTask = () => {
        if (!deleteTask) return;
        setTasks(tasks.filter(t => t.id !== deleteTask.id));
        setDeleteTask(null);
    };

    const filteredTasks = tasks.filter((task) => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
        const matchesDifficulty = filterDifficulty === 'all' || task.difficulty === filterDifficulty;
        const matchesTrack = filterTrack === 'all' || task.track === filterTrack;
        return matchesSearch && matchesStatus && matchesDifficulty && matchesTrack;
    });

    const stats = {
        total: tasks.length,
        published: tasks.filter(t => t.status === 'Published').length,
        draft: tasks.filter(t => t.status === 'Draft').length,
        totalSubmissions: tasks.reduce((sum, t) => sum + t.submissions, 0),
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">Task Management</h1>
                    <p className="text-neutral-600 dark:text-neutral-400">Create and manage learning tasks</p>
                </div>
                <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setIsCreateModalOpen(true)}>
                    Create Task
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { icon: FileCode, value: stats.total, label: 'Total Tasks', color: 'text-primary-600', bg: 'bg-primary-100 dark:bg-primary-900/30' },
                    { icon: CheckCircle, value: stats.published, label: 'Published', color: 'text-success-600', bg: 'bg-success-100 dark:bg-success-900/30' },
                    { icon: Clock, value: stats.draft, label: 'Drafts', color: 'text-warning-600', bg: 'bg-warning-100 dark:bg-warning-900/30' },
                    { icon: Users, value: stats.totalSubmissions, label: 'Total Submissions', color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
                ].map((stat, index) => (
                    <Card key={index}>
                        <Card.Body className="p-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
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
            <Card>
                <Card.Body className="p-4">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1">
                            <Input
                                placeholder="Search tasks..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                leftIcon={<Search className="w-4 h-4" />}
                            />
                        </div>
                        <div className="flex gap-3">
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                                <option value="all">All Status</option>
                                <option value="Published">Published</option>
                                <option value="Draft">Draft</option>
                                <option value="Archived">Archived</option>
                            </select>
                            <select
                                value={filterDifficulty}
                                onChange={(e) => setFilterDifficulty(e.target.value)}
                                className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                                <option value="all">All Difficulty</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                            <select
                                value={filterTrack}
                                onChange={(e) => setFilterTrack(e.target.value)}
                                className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                                <option value="all">All Tracks</option>
                                <option value="Full Stack">Full Stack</option>
                                <option value="Frontend">Frontend</option>
                                <option value="Backend">Backend</option>
                                <option value="Python">Python</option>
                            </select>
                        </div>
                    </div>
                </Card.Body>
            </Card>

            {/* Tasks Table */}
            <Card>
                <Card.Body className="p-0 overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-neutral-50 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-700">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-600 dark:text-neutral-400">Task</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-600 dark:text-neutral-400">Difficulty</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-600 dark:text-neutral-400">Track</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-600 dark:text-neutral-400">Status</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-600 dark:text-neutral-400">Submissions</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-600 dark:text-neutral-400">Avg Score</th>
                                <th className="text-right px-6 py-4 text-sm font-semibold text-neutral-600 dark:text-neutral-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                            {filteredTasks.map((task) => (
                                <tr key={task.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="max-w-xs">
                                            <p className="font-medium text-neutral-900 dark:text-white truncate">{task.title}</p>
                                            <p className="text-sm text-neutral-500 truncate">{task.description}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant={difficultyColors[task.difficulty as keyof typeof difficultyColors]}>
                                            {task.difficulty}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-neutral-600 dark:text-neutral-400">{task.track}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant={statusColors[task.status as keyof typeof statusColors]} dot>
                                            {task.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium text-neutral-900 dark:text-white">{task.submissions}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {task.avgScore > 0 ? (
                                            <div className="flex items-center gap-2">
                                                <TrendingUp className={`w-4 h-4 ${task.avgScore >= 80 ? 'text-success-500' : task.avgScore >= 60 ? 'text-warning-500' : 'text-error-500'}`} />
                                                <span className="text-sm font-medium text-neutral-900 dark:text-white">{task.avgScore}%</span>
                                            </div>
                                        ) : (
                                            <span className="text-sm text-neutral-400">N/A</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="sm" onClick={() => setSelectedTask(task)}>
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" onClick={() => setEditTask(task)}>
                                                <Edit2 className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="text-error-600 hover:text-error-700" onClick={() => setDeleteTask(task)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredTasks.length === 0 && (
                        <div className="text-center py-12">
                            <FileCode className="w-12 h-12 mx-auto text-neutral-300 dark:text-neutral-600 mb-4" />
                            <p className="text-neutral-500">No tasks found matching your criteria</p>
                        </div>
                    )}
                </Card.Body>
            </Card>

            {/* Create Task Modal */}
            <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} size="lg">
                <Modal.Header>Create New Task</Modal.Header>
                <Modal.Body>
                    <div className="space-y-4">
                        <Input
                            label="Task Title"
                            placeholder="Enter task title..."
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        />
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                                Description
                            </label>
                            <textarea
                                placeholder="Describe the task objectives and requirements..."
                                rows={4}
                                value={newTask.description}
                                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                                    Difficulty
                                </label>
                                <select
                                    value={newTask.difficulty}
                                    onChange={(e) => setNewTask({ ...newTask, difficulty: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                >
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                                    Track
                                </label>
                                <select
                                    value={newTask.track}
                                    onChange={(e) => setNewTask({ ...newTask, track: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                >
                                    <option value="Full Stack">Full Stack</option>
                                    <option value="Frontend">Frontend</option>
                                    <option value="Backend">Backend</option>
                                    <option value="Python">Python</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                                    Category
                                </label>
                                <select
                                    value={newTask.category}
                                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                >
                                    <option value="Frontend">Frontend</option>
                                    <option value="Backend">Backend</option>
                                    <option value="Database">Database</option>
                                    <option value="Security">Security</option>
                                    <option value="Data">Data</option>
                                </select>
                            </div>
                            <Input
                                label="Estimated Time (hours)"
                                type="number"
                                placeholder="4"
                                value={String(newTask.estimatedTime)}
                                onChange={(e) => setNewTask({ ...newTask, estimatedTime: Number(e.target.value) || 1 })}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="ghost" onClick={() => setIsCreateModalOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="outline" leftIcon={<Save className="w-4 h-4" />} onClick={() => handleCreateTask('Draft')}>
                        Save as Draft
                    </Button>
                    <Button variant="primary" leftIcon={<CheckCircle className="w-4 h-4" />} onClick={() => handleCreateTask('Published')}>
                        Publish
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Task Detail Modal */}
            <Modal
                isOpen={!!selectedTask}
                onClose={() => setSelectedTask(null)}
                size="lg"
            >
                {selectedTask && (
                    <>
                        <Modal.Header>{selectedTask.title}</Modal.Header>
                        <Modal.Body>
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant={difficultyColors[selectedTask.difficulty as keyof typeof difficultyColors]}>
                                        {selectedTask.difficulty}
                                    </Badge>
                                    <Badge variant="default">{selectedTask.track}</Badge>
                                    <Badge variant="default">{selectedTask.category}</Badge>
                                    <Badge variant={statusColors[selectedTask.status as keyof typeof statusColors]} dot>
                                        {selectedTask.status}
                                    </Badge>
                                </div>
                                <p className="text-neutral-600 dark:text-neutral-400">{selectedTask.description}</p>
                                <div className="grid grid-cols-3 gap-4 py-4 border-y border-neutral-200 dark:border-neutral-700">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-neutral-900 dark:text-white">{selectedTask.submissions}</p>
                                        <p className="text-sm text-neutral-500">Submissions</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-neutral-900 dark:text-white">{selectedTask.avgScore > 0 ? `${selectedTask.avgScore}%` : 'N/A'}</p>
                                        <p className="text-sm text-neutral-500">Avg Score</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-neutral-900 dark:text-white">{selectedTask.estimatedTime}h</p>
                                        <p className="text-sm text-neutral-500">Est. Time</p>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="ghost" onClick={() => setSelectedTask(null)}>
                                Close
                            </Button>
                            <Button variant="outline" leftIcon={<Edit2 className="w-4 h-4" />}>
                                Edit Task
                            </Button>
                        </Modal.Footer>
                    </>
                )}
            </Modal>

            {/* Edit Task Modal */}
            <Modal isOpen={!!editTask} onClose={() => setEditTask(null)} size="lg">
                <Modal.Header>Edit Task</Modal.Header>
                <Modal.Body>
                    {editTask && (
                        <div className="space-y-4">
                            <Input
                                label="Task Title"
                                placeholder="Enter task title..."
                                value={editFormData.title}
                                onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                            />
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                                    Description
                                </label>
                                <textarea
                                    placeholder="Describe the task objectives and requirements..."
                                    rows={4}
                                    value={editFormData.description}
                                    onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                                        Difficulty
                                    </label>
                                    <select
                                        value={editFormData.difficulty}
                                        onChange={(e) => setEditFormData({ ...editFormData, difficulty: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    >
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                                        Track
                                    </label>
                                    <select
                                        value={editFormData.track}
                                        onChange={(e) => setEditFormData({ ...editFormData, track: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    >
                                        <option value="Full Stack">Full Stack</option>
                                        <option value="Frontend">Frontend</option>
                                        <option value="Backend">Backend</option>
                                        <option value="Python">Python</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                                        Status
                                    </label>
                                    <select
                                        value={editFormData.status}
                                        onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    >
                                        <option value="Draft">Draft</option>
                                        <option value="Published">Published</option>
                                        <option value="Archived">Archived</option>
                                    </select>
                                </div>
                                <Input
                                    label="Estimated Time (hours)"
                                    type="number"
                                    placeholder="4"
                                    value={String(editFormData.estimatedTime)}
                                    onChange={(e) => setEditFormData({ ...editFormData, estimatedTime: Number(e.target.value) || 1 })}
                                />
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="ghost" onClick={() => setEditTask(null)}>
                        Cancel
                    </Button>
                    <Button variant="primary" leftIcon={<Save className="w-4 h-4" />} onClick={handleUpdateTask}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal isOpen={!!deleteTask} onClose={() => setDeleteTask(null)} size="sm">
                <Modal.Body>
                    {deleteTask && (
                        <div className="text-center py-4">
                            <div className="w-16 h-16 rounded-full bg-error-100 dark:bg-error-900/30 flex items-center justify-center mx-auto mb-4">
                                <AlertTriangle className="w-8 h-8 text-error-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                                Delete Task?
                            </h3>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-2">
                                Are you sure you want to delete
                            </p>
                            <p className="font-medium text-neutral-900 dark:text-white mb-4">
                                "{deleteTask.title}"?
                            </p>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                This action cannot be undone. All {deleteTask.submissions} submissions will also be removed.
                            </p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="ghost" onClick={() => setDeleteTask(null)} className="flex-1">
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        className="flex-1 !bg-error-600 hover:!bg-error-700"
                        leftIcon={<Trash2 className="w-4 h-4" />}
                        onClick={handleDeleteTask}
                    >
                        Delete Task
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
