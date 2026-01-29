import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/app/store/hooks';
import { Button, Card, Badge, ProgressBar } from '@/shared/components/ui';
import { CheckCircle, Clock, Star, Play, Lock, ArrowRight, Eye, Sparkles, TrendingUp } from 'lucide-react';
import type { LearningTask, RecommendedTask } from '@/shared/types';

export const LearningPathView: React.FC = () => {
    const { currentPath, recommendedTasks } = useAppSelector((state) => state.learningPath);

    if (!currentPath) {
        return (
            <div className="text-center py-12">
                <p className="text-neutral-600 dark:text-neutral-400">No learning path available. Complete an assessment first.</p>
                <Link to="/assessment" className="mt-4 inline-block">
                    <Button>Take Assessment</Button>
                </Link>
            </div>
        );
    }

    const progress = Math.round((currentPath.completedTasks / currentPath.totalTasks) * 100);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed':
                return <Badge variant="success" size="sm"><CheckCircle className="w-3 h-3" /> Completed</Badge>;
            case 'in_progress':
                return <Badge variant="primary" size="sm"><Play className="w-3 h-3" /> In Progress</Badge>;
            default:
                return <Badge variant="default" size="sm">Not Started</Badge>;
        }
    };

    const getDifficultyStars = (level: number) => (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className={`w-3 h-3 ${i <= level ? 'text-warning-500 fill-warning-500' : 'text-neutral-300 dark:text-neutral-600'}`} />
            ))}
        </div>
    );

    const canStartTask = (task: LearningTask) => {
        if (task.status !== 'not_started') return true;
        if (task.prerequisites.length === 0) return true;
        return task.prerequisites.every((prereqId: string) =>
            currentPath.tasks.find((t: LearningTask) => t.id === prereqId)?.status === 'completed'
        );
    };

    const getPriorityColor = (priority: RecommendedTask['priority']) => {
        switch (priority) {
            case 'high':
                return 'from-red-500 to-orange-500';
            case 'medium':
                return 'from-yellow-500 to-amber-500';
            case 'low':
                return 'from-green-500 to-emerald-500';
        }
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">{currentPath.trackName}</h1>
                    <Badge variant="primary" className="bg-gradient-to-r from-primary-500 to-purple-500 text-white border-0">{currentPath.skillLevel}</Badge>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    Your personalized learning path with {currentPath.totalTasks} tasks • Estimated {currentPath.estimatedTime}
                </p>

                {/* Progress Bar */}
                <div className="glass-frosted rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Overall Progress</span>
                        <span className="text-sm font-bold bg-gradient-to-r from-primary-500 to-purple-500 bg-clip-text text-transparent">{progress}% Complete</span>
                    </div>
                    <ProgressBar value={progress} size="md" variant="primary" />
                    <div className="flex justify-between mt-3 text-sm text-neutral-500 dark:text-neutral-400">
                        <span>{currentPath.completedTasks} tasks completed</span>
                        <span>{currentPath.totalTasks - currentPath.completedTasks} remaining</span>
                    </div>
                </div>
            </div>

            {/* Task List */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Your Tasks</h2>
                <div className="space-y-4">
                    {currentPath.tasks.map((task: LearningTask) => {
                        const isLocked = !canStartTask(task);

                        return (
                            <Card
                                key={task.id}
                                variant="glass"
                                className={`transition-all duration-300 ${task.status === 'in_progress' ? 'ring-2 ring-primary-500/50 dark:ring-primary-400/50' : ''
                                    } ${isLocked ? 'opacity-60' : 'hover:shadow-lg dark:hover:shadow-primary-500/10'}`}
                            >
                                <Card.Body className="p-5">
                                    <div className="flex items-start gap-4">
                                        {/* Order Number */}
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-semibold shadow-lg ${task.status === 'completed'
                                            ? 'bg-gradient-to-br from-green-500 to-emerald-400 text-white'
                                            : task.status === 'in_progress'
                                                ? 'bg-gradient-to-br from-primary-500 to-purple-500 text-white'
                                                : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'
                                            }`}>
                                            {task.status === 'completed' ? (
                                                <CheckCircle className="w-5 h-5" />
                                            ) : isLocked ? (
                                                <Lock className="w-4 h-4" />
                                            ) : (
                                                task.order
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-neutral-900 dark:text-white">{task.title}</h3>
                                                {getStatusBadge(task.status)}
                                            </div>
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{task.description}</p>

                                            <div className="flex flex-wrap items-center gap-4 text-sm">
                                                <Badge variant="default" className="dark:bg-neutral-700 dark:text-neutral-200">{task.category}</Badge>
                                                <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{task.estimatedTime}</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400">
                                                    {getDifficultyStars(task.difficulty)}
                                                </div>
                                                {task.score !== undefined && (
                                                    <span className="font-medium text-success-500 dark:text-success-400">Score: {task.score}%</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-col gap-2 flex-shrink-0">
                                            {task.status === 'completed' ? (
                                                <>
                                                    <Link to={`/submissions/task-${task.id}/feedback`}>
                                                        <Button variant="outline" size="sm">View Feedback</Button>
                                                    </Link>
                                                    <Link to={`/learning-path/project/${task.id}`}>
                                                        <Button variant="ghost" size="sm" leftIcon={<Eye className="w-4 h-4" />}>Details</Button>
                                                    </Link>
                                                </>
                                            ) : task.status === 'in_progress' ? (
                                                <>
                                                    <Link to="/submissions/new">
                                                        <Button variant="gradient" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                                                            Submit
                                                        </Button>
                                                    </Link>
                                                    <Link to={`/learning-path/project/${task.id}`}>
                                                        <Button variant="ghost" size="sm" leftIcon={<Eye className="w-4 h-4" />}>Details</Button>
                                                    </Link>
                                                </>
                                            ) : !isLocked ? (
                                                <>
                                                    <Link to={`/learning-path/project/${task.id}`}>
                                                        <Button variant="secondary" size="sm">Start</Button>
                                                    </Link>
                                                    <Link to={`/learning-path/project/${task.id}`}>
                                                        <Button variant="ghost" size="sm" leftIcon={<Eye className="w-4 h-4" />}>Details</Button>
                                                    </Link>
                                                </>
                                            ) : (
                                                <>
                                                    <Button variant="ghost" size="sm" disabled>
                                                        <Lock className="w-4 h-4" />
                                                    </Button>
                                                    <Link to={`/learning-path/project/${task.id}`}>
                                                        <Button variant="ghost" size="sm" leftIcon={<Eye className="w-4 h-4" />}>Details</Button>
                                                    </Link>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Recommended Tasks Section */}
            {recommendedTasks && recommendedTasks.length > 0 && (
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-primary-500" />
                        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Recommended For You</h2>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                        Based on your progress and skill level, we recommend these additional tasks:
                    </p>

                    <div className="grid gap-4 md:grid-cols-2">
                        {recommendedTasks.map((rec: RecommendedTask) => (
                            <Card
                                key={rec.id}
                                variant="glass"
                                className="hover:shadow-lg dark:hover:shadow-primary-500/10 transition-all duration-300"
                            >
                                <Card.Body className="p-5">
                                    <div className="flex items-start gap-4">
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getPriorityColor(rec.priority)} flex items-center justify-center flex-shrink-0`}>
                                            <TrendingUp className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-neutral-900 dark:text-white">{rec.title}</h3>
                                                <Badge
                                                    variant={rec.priority === 'high' ? 'error' : rec.priority === 'medium' ? 'warning' : 'success'}
                                                    size="sm"
                                                >
                                                    {rec.priority} priority
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">{rec.description}</p>
                                            <p className="text-xs text-primary-500 dark:text-primary-400 mb-3 italic">{rec.reason}</p>

                                            <div className="flex flex-wrap items-center gap-3 text-sm">
                                                <Badge variant="default" className="dark:bg-neutral-700 dark:text-neutral-200">{rec.category}</Badge>
                                                <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400">
                                                    <Clock className="w-3 h-3" />
                                                    <span className="text-xs">{rec.estimatedTime}</span>
                                                </div>
                                                {getDifficultyStars(rec.difficulty)}
                                            </div>

                                            <div className="mt-3 flex items-center gap-2">
                                                <div className="flex-1 bg-neutral-200 dark:bg-neutral-700 rounded-full h-1.5">
                                                    <div
                                                        className="bg-gradient-to-r from-primary-500 to-purple-500 h-1.5 rounded-full"
                                                        style={{ width: `${rec.matchScore}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs text-neutral-500 dark:text-neutral-400">{rec.matchScore}% match</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                                        <Button variant="secondary" size="sm" className="w-full">
                                            Add to Path
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
