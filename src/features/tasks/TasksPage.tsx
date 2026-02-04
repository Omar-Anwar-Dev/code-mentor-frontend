import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Badge, Button, ProgressBar } from '@/components/ui';
import {
    CheckCircle,
    Circle,
    Clock,
    Play,
    ChevronRight,
    ChevronDown,
    Filter,
    Search,
    Code,
    BookOpen,
    Zap,
    Target,
    Map,
    Star,
    Lock,
} from 'lucide-react';

interface Task {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: number;
    status: 'not_started' | 'in_progress' | 'completed';
    estimatedTime: string;
    points: number;
    progress?: number;
}

interface LearningPathSection {
    id: string;
    name: string;
    description: string;
    icon: 'frontend' | 'backend' | 'database' | 'devops' | 'general';
    color: string;
    progress: number;
    tasks: Task[];
}

const learningPaths: LearningPathSection[] = [
    {
        id: 'frontend',
        name: 'Frontend Development',
        description: 'Master modern frontend technologies and frameworks',
        icon: 'frontend',
        color: 'from-blue-500 to-cyan-400',
        progress: 60,
        tasks: [
            {
                id: 'fe-1',
                title: 'HTML & CSS Fundamentals',
                description: 'Learn the building blocks of web development with semantic HTML and modern CSS.',
                category: 'Web Basics',
                difficulty: 1,
                status: 'completed',
                estimatedTime: '2 hours',
                points: 100,
                progress: 100,
            },
            {
                id: 'fe-2',
                title: 'JavaScript Essentials',
                description: 'Master JavaScript fundamentals including ES6+ features, DOM manipulation, and async programming.',
                category: 'JavaScript',
                difficulty: 2,
                status: 'completed',
                estimatedTime: '4 hours',
                points: 150,
                progress: 100,
            },
            {
                id: 'fe-2b',
                title: 'CSS Flexbox & Grid',
                description: 'Master modern CSS layout techniques with Flexbox and CSS Grid for responsive designs.',
                category: 'CSS',
                difficulty: 2,
                status: 'in_progress',
                estimatedTime: '3 hours',
                points: 175,
                progress: 65,
            },
            {
                id: 'fe-3',
                title: 'React Basics',
                description: 'Learn React fundamentals: components, props, state, and hooks.',
                category: 'React',
                difficulty: 2,
                status: 'in_progress',
                estimatedTime: '5 hours',
                points: 200,
                progress: 45,
            },
            {
                id: 'fe-4',
                title: 'React State Management',
                description: 'Master state management with Redux Toolkit and React Query.',
                category: 'React',
                difficulty: 3,
                status: 'not_started',
                estimatedTime: '4 hours',
                points: 250,
            },
            {
                id: 'fe-5',
                title: 'TypeScript with React',
                description: 'Add type safety to your React applications with TypeScript.',
                category: 'TypeScript',
                difficulty: 3,
                status: 'not_started',
                estimatedTime: '3 hours',
                points: 200,
            },
        ],
    },
    {
        id: 'backend',
        name: 'Backend Development',
        description: 'Build robust server-side applications and APIs',
        icon: 'backend',
        color: 'from-green-500 to-emerald-400',
        progress: 25,
        tasks: [
            {
                id: 'be-1',
                title: 'Node.js Fundamentals',
                description: 'Learn Node.js basics: modules, npm, and building CLI applications.',
                category: 'Node.js',
                difficulty: 2,
                status: 'completed',
                estimatedTime: '3 hours',
                points: 150,
                progress: 100,
            },
            {
                id: 'be-2',
                title: 'Express.js REST APIs',
                description: 'Build RESTful APIs with Express.js, middleware, and routing.',
                category: 'Express',
                difficulty: 2,
                status: 'in_progress',
                estimatedTime: '4 hours',
                points: 200,
                progress: 30,
            },
            {
                id: 'be-3',
                title: 'Authentication & Authorization',
                description: 'Implement JWT authentication, OAuth, and role-based access control.',
                category: 'Security',
                difficulty: 4,
                status: 'not_started',
                estimatedTime: '5 hours',
                points: 300,
            },
            {
                id: 'be-4',
                title: 'API Design Best Practices',
                description: 'Learn REST API design principles, versioning, and documentation.',
                category: 'API Design',
                difficulty: 3,
                status: 'not_started',
                estimatedTime: '3 hours',
                points: 200,
            },
        ],
    },
    {
        id: 'database',
        name: 'Database & Data',
        description: 'Master data storage, querying, and management',
        icon: 'database',
        color: 'from-purple-500 to-pink-400',
        progress: 0,
        tasks: [
            {
                id: 'db-1',
                title: 'SQL Fundamentals',
                description: 'Learn SQL basics: queries, joins, and database design.',
                category: 'SQL',
                difficulty: 2,
                status: 'in_progress',
                estimatedTime: '4 hours',
                points: 150,
                progress: 25,
            },
            {
                id: 'db-2',
                title: 'MongoDB Essentials',
                description: 'Work with NoSQL databases using MongoDB and Mongoose.',
                category: 'NoSQL',
                difficulty: 2,
                status: 'not_started',
                estimatedTime: '3 hours',
                points: 150,
            },
            {
                id: 'db-3',
                title: 'Database Optimization',
                description: 'Learn indexing, query optimization, and performance tuning.',
                category: 'Performance',
                difficulty: 4,
                status: 'not_started',
                estimatedTime: '4 hours',
                points: 250,
            },
        ],
    },
    {
        id: 'devops',
        name: 'DevOps & Deployment',
        description: 'Learn deployment, CI/CD, and cloud services',
        icon: 'devops',
        color: 'from-orange-500 to-yellow-400',
        progress: 0,
        tasks: [
            {
                id: 'do-1',
                title: 'Git & GitHub Workflow',
                description: 'Master version control with Git and collaborative workflows.',
                category: 'Version Control',
                difficulty: 2,
                status: 'in_progress',
                estimatedTime: '2 hours',
                points: 100,
                progress: 40,
            },
            {
                id: 'do-2',
                title: 'Docker Fundamentals',
                description: 'Containerize applications with Docker and Docker Compose.',
                category: 'Containers',
                difficulty: 3,
                status: 'not_started',
                estimatedTime: '4 hours',
                points: 200,
            },
            {
                id: 'do-3',
                title: 'CI/CD with GitHub Actions',
                description: 'Automate testing and deployment with GitHub Actions.',
                category: 'CI/CD',
                difficulty: 3,
                status: 'not_started',
                estimatedTime: '3 hours',
                points: 200,
            },
        ],
    },
];

const iconMap = {
    frontend: Code,
    backend: Zap,
    database: BookOpen,
    devops: Target,
    general: Map,
};

const statusConfig = {
    not_started: { icon: Circle, color: 'text-neutral-400', label: 'Not Started' },
    in_progress: { icon: Play, color: 'text-blue-500', label: 'In Progress' },
    completed: { icon: CheckCircle, color: 'text-green-500', label: 'Completed' },
};

export const TasksPage: React.FC = () => {
    const [filter, setFilter] = useState<'all' | 'not_started' | 'in_progress' | 'completed'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedPaths, setExpandedPaths] = useState<string[]>(learningPaths.map(p => p.id));

    const togglePath = (pathId: string) => {
        setExpandedPaths(prev =>
            prev.includes(pathId)
                ? prev.filter(id => id !== pathId)
                : [...prev, pathId]
        );
    };

    const getDifficultyStars = (level: number) => (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className={`w-3 h-3 ${i <= level ? 'text-warning-500 fill-warning-500' : 'text-neutral-300 dark:text-neutral-600'}`} />
            ))}
        </div>
    );

    const allTasks = learningPaths.flatMap(path => path.tasks);
    const stats = {
        total: allTasks.length,
        completed: allTasks.filter(t => t.status === 'completed').length,
        inProgress: allTasks.filter(t => t.status === 'in_progress').length,
        totalPoints: allTasks.reduce((acc, t) => acc + (t.status === 'completed' ? t.points : 0), 0),
    };

    const filterTasks = (tasks: Task[]) => {
        return tasks.filter((task) => {
            const matchesFilter = filter === 'all' || task.status === filter;
            const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
                        Learning Tasks
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                        Complete tasks from each learning path to level up your skills
                    </p>
                </div>
            </div>

            {/* In Progress Tasks Section */}
            <Card variant="glass" className="border-l-4 border-l-blue-500">
                <Card.Body className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                            <Play className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-neutral-900 dark:text-white">In Progress Tasks</h2>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">Continue where you left off</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {allTasks.filter(t => t.status === 'in_progress').map((task) => (
                            <div key={task.id} className="p-4 rounded-xl bg-white/50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-300">
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="font-semibold text-neutral-900 dark:text-white text-sm">{task.title}</h3>
                                    <Badge variant="primary" className="text-xs">In Progress</Badge>
                                </div>
                                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">{task.description}</p>
                                <div className="mb-3">
                                    <div className="flex justify-between text-xs text-neutral-500 mb-1">
                                        <span>Progress</span>
                                        <span className="font-medium text-blue-500">{task.progress}%</span>
                                    </div>
                                    <ProgressBar value={task.progress || 0} max={100} size="sm" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                                        <Clock className="w-3 h-3" />
                                        <span>{task.estimatedTime}</span>
                                    </div>
                                    <Link to={`/learning-path/project/${task.id}`}>
                                        <Button variant="primary" size="sm" rightIcon={<ChevronRight className="w-3 h-3" />}>
                                            Continue
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card.Body>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { icon: Target, value: stats.total, label: 'Total Tasks', gradient: 'from-purple-500 to-pink-400' },
                    { icon: CheckCircle, value: stats.completed, label: 'Completed', gradient: 'from-green-500 to-emerald-400' },
                    { icon: Play, value: stats.inProgress, label: 'In Progress', gradient: 'from-blue-500 to-cyan-400' },
                    { icon: Zap, value: `${stats.totalPoints} pts`, label: 'Points Earned', gradient: 'from-orange-500 to-yellow-400' },
                ].map((stat, index) => (
                    <Card key={index} variant="glass">
                        <Card.Body className="p-5">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                                    <stat.icon className="w-6 h-6 text-white" />
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
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>

                        {/* Filter buttons */}
                        <div className="flex gap-2">
                            <Filter className="w-5 h-5 text-neutral-400 self-center" />
                            {[
                                { key: 'all', label: 'All' },
                                { key: 'not_started', label: 'Not Started' },
                                { key: 'in_progress', label: 'In Progress' },
                                { key: 'completed', label: 'Completed' },
                            ].map((f) => (
                                <button
                                    key={f.key}
                                    onClick={() => setFilter(f.key as typeof filter)}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${filter === f.key
                                        ? 'bg-primary-500 text-white shadow-lg'
                                        : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                                        }`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </Card.Body>
            </Card>

            {/* Learning Path Sections */}
            <div className="space-y-6">
                {learningPaths.map((path) => {
                    const PathIcon = iconMap[path.icon];
                    const filteredTasks = filterTasks(path.tasks);
                    const isExpanded = expandedPaths.includes(path.id);
                    const pathCompleted = path.tasks.filter(t => t.status === 'completed').length;
                    const pathTotal = path.tasks.length;

                    if (filteredTasks.length === 0 && (filter !== 'all' || searchQuery)) {
                        return null;
                    }

                    return (
                        <div key={path.id} className="space-y-4">
                            {/* Section Header */}
                            <button
                                onClick={() => togglePath(path.id)}
                                className="w-full"
                            >
                                <Card variant="glass" hover className="group">
                                    <Card.Body className="p-5">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${path.color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                                                <PathIcon className="w-7 h-7 text-white" />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <div className="flex items-center gap-3">
                                                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                                                        {path.name}
                                                    </h2>
                                                    <Badge variant="default" className="dark:bg-neutral-700">
                                                        {pathCompleted}/{pathTotal} tasks
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                                                    {path.description}
                                                </p>
                                                <div className="mt-3 flex items-center gap-3">
                                                    <div className="flex-1 max-w-xs">
                                                        <ProgressBar value={path.progress} max={100} size="sm" />
                                                    </div>
                                                    <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                                                        {path.progress}%
                                                    </span>
                                                </div>
                                            </div>
                                            <ChevronDown className={`w-6 h-6 text-neutral-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                                        </div>
                                    </Card.Body>
                                </Card>
                            </button>

                            {/* Tasks List */}
                            {isExpanded && (
                                <div className="ml-4 pl-4 border-l-2 border-neutral-200 dark:border-neutral-700 space-y-3">
                                    {filteredTasks.length === 0 ? (
                                        <p className="text-neutral-500 dark:text-neutral-400 py-4 text-center">
                                            No tasks match your filter criteria.
                                        </p>
                                    ) : (
                                        filteredTasks.map((task, index) => {
                                            const status = statusConfig[task.status];
                                            const StatusIcon = status.icon;
                                            const isLocked = index > 0 &&
                                                path.tasks[index - 1].status !== 'completed' &&
                                                task.status === 'not_started';

                                            return (
                                                <Card key={task.id} variant="glass" className={`group ${isLocked ? 'opacity-60' : ''}`}>
                                                    <Card.Body className="p-4">
                                                        <div className="flex items-start gap-4">
                                                            {/* Status Icon */}
                                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${task.status === 'completed'
                                                                ? 'bg-gradient-to-br from-green-500 to-emerald-400'
                                                                : task.status === 'in_progress'
                                                                    ? 'bg-gradient-to-br from-blue-500 to-cyan-400'
                                                                    : 'bg-neutral-200 dark:bg-neutral-700'
                                                                }`}>
                                                                {isLocked ? (
                                                                    <Lock className="w-4 h-4 text-neutral-500" />
                                                                ) : (
                                                                    <StatusIcon className={`w-5 h-5 ${task.status !== 'not_started' ? 'text-white' : 'text-neutral-500'}`} />
                                                                )}
                                                            </div>

                                                            {/* Content */}
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-start justify-between gap-4">
                                                                    <div>
                                                                        <h3 className="font-semibold text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                                                            {task.title}
                                                                        </h3>
                                                                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-1">
                                                                            {task.description}
                                                                        </p>
                                                                    </div>

                                                                    {!isLocked && (
                                                                        <Link to={`/learning-path/project/${task.id}`}>
                                                                            <Button
                                                                                variant={task.status === 'completed' ? 'ghost' : task.status === 'in_progress' ? 'primary' : 'secondary'}
                                                                                size="sm"
                                                                                rightIcon={<ChevronRight className="w-4 h-4" />}
                                                                                className="flex-shrink-0"
                                                                            >
                                                                                {task.status === 'completed' ? 'Review' : task.status === 'in_progress' ? 'Continue' : 'Start'}
                                                                            </Button>
                                                                        </Link>
                                                                    )}
                                                                </div>

                                                                {/* Progress bar for in-progress tasks */}
                                                                {task.status === 'in_progress' && task.progress !== undefined && (
                                                                    <div className="mt-3">
                                                                        <div className="flex justify-between text-xs text-neutral-500 mb-1">
                                                                            <span>Progress</span>
                                                                            <span>{task.progress}%</span>
                                                                        </div>
                                                                        <ProgressBar value={task.progress} max={100} size="sm" />
                                                                    </div>
                                                                )}

                                                                {/* Meta info */}
                                                                <div className="flex items-center gap-4 mt-3">
                                                                    <Badge variant="default" className="dark:bg-neutral-700 text-xs">
                                                                        {task.category}
                                                                    </Badge>
                                                                    <span className="flex items-center gap-1 text-xs text-neutral-500">
                                                                        <Clock className="w-3 h-3" />
                                                                        {task.estimatedTime}
                                                                    </span>
                                                                    {getDifficultyStars(task.difficulty)}
                                                                    <span className="flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400 font-medium">
                                                                        <Zap className="w-3 h-3" />
                                                                        {task.points} pts
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            );
                                        })
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
