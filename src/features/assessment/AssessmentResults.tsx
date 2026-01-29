import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { resetAssessment } from './assessmentSlice';
import { addToast } from '@/features/ui/uiSlice';
import { Button, Card, Badge, ProgressBar, CircularProgress } from '@/components/ui';
import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    ResponsiveContainer,
} from 'recharts';
import {
    Trophy,
    CheckCircle,
    AlertTriangle,
    ArrowRight,
    RotateCcw,
    Map,
    Clock,
    Star,
} from 'lucide-react';

export const AssessmentResults: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { results, selectedTrack } = useAppSelector((state) => state.assessment);

    // Mock results if not available
    const displayResults = results || {
        overallScore: 78,
        skillLevel: 'Intermediate' as const,
        grade: 'B+',
        categoryScores: [
            { category: 'JavaScript', score: 85, maxScore: 100, percentage: 85 },
            { category: 'React', score: 72, maxScore: 100, percentage: 72 },
            { category: 'TypeScript', score: 68, maxScore: 100, percentage: 68 },
            { category: 'Node.js', score: 75, maxScore: 100, percentage: 75 },
            { category: 'Databases', score: 82, maxScore: 100, percentage: 82 },
            { category: 'Testing', score: 65, maxScore: 100, percentage: 65 },
        ],
        strengths: ['JavaScript fundamentals', 'Database design', 'API integration'],
        weaknesses: ['TypeScript advanced types', 'Testing practices', 'Performance optimization'],
        recommendations: [
            {
                taskId: 't1',
                title: 'TypeScript Generics Deep Dive',
                reason: 'Strengthen your TypeScript skills',
                priority: 'high' as const,
                difficulty: 3,
                estimatedTime: '2 hours',
            },
            {
                taskId: 't2',
                title: 'Unit Testing with Jest',
                reason: 'Improve test coverage practices',
                priority: 'high' as const,
                difficulty: 2,
                estimatedTime: '3 hours',
            },
            {
                taskId: 't3',
                title: 'React Performance Optimization',
                reason: 'Master memoization and lazy loading',
                priority: 'medium' as const,
                difficulty: 4,
                estimatedTime: '4 hours',
            },
        ],
    };

    // Prepare radar chart data
    const radarData = displayResults.categoryScores.map((cat) => ({
        subject: cat.category,
        score: cat.percentage,
        fullMark: 100,
    }));

    const getScoreColor = (percentage: number) => {
        if (percentage >= 80) return 'success';
        if (percentage >= 60) return 'warning';
        return 'error';
    };

    const handleRetakeAssessment = () => {
        dispatch(resetAssessment());
        navigate('/assessment');
    };

    const handleViewLearningPath = () => {
        dispatch(addToast({
            type: 'success',
            title: 'Learning path created!',
            message: 'Your personalized learning path is ready.',
        }));
        navigate('/learning-path');
    };

    return (
        <div className="max-w-6xl mx-auto animate-fade-in">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-500/20 mb-4">
                    <Trophy className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                    Assessment Complete!
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400">
                    Here's a detailed breakdown of your performance in {selectedTrack?.name || 'Full Stack Development'}
                </p>
            </div>

            {/* Score Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="text-center">
                    <Card.Body className="py-8">
                        <CircularProgress
                            value={displayResults.overallScore}
                            size={140}
                            variant={getScoreColor(displayResults.overallScore)}
                        />
                        <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">Overall Score</p>
                    </Card.Body>
                </Card>

                <Card className="flex flex-col justify-center">
                    <Card.Body className="text-center py-8">
                        <div className="text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                            {displayResults.grade}
                        </div>
                        <Badge variant="primary" size="lg">{displayResults.skillLevel}</Badge>
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Body className="py-6">
                        <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">Quick Stats</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-neutral-600 dark:text-neutral-400">Questions Answered</span>
                                <span className="font-semibold dark:text-white">30</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-neutral-600 dark:text-neutral-400">Correct Answers</span>
                                <span className="font-semibold text-success-600 dark:text-success-400">23</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-neutral-600 dark:text-neutral-400">Time Spent</span>
                                <span className="font-semibold dark:text-white">28:45</span>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>

            {/* Category Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Radar Chart */}
                <Card>
                    <Card.Header>
                        <h3 className="font-semibold dark:text-white">Skill Radar</h3>
                    </Card.Header>
                    <Card.Body className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={radarData}>
                                <PolarGrid stroke="#e5e5e5" />
                                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: '#525252' }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                                <Radar
                                    name="Score"
                                    dataKey="score"
                                    stroke="#4f46e5"
                                    fill="#4f46e5"
                                    fillOpacity={0.3}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </Card.Body>
                </Card>

                {/* Category Progress Bars */}
                <Card>
                    <Card.Header>
                        <h3 className="font-semibold dark:text-white">Category Scores</h3>
                    </Card.Header>
                    <Card.Body className="space-y-4">
                        {displayResults.categoryScores.map((cat) => (
                            <div key={cat.category}>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{cat.category}</span>
                                    <span className="text-sm font-semibold text-neutral-900 dark:text-white">{cat.percentage}%</span>
                                </div>
                                <ProgressBar
                                    value={cat.percentage}
                                    variant={getScoreColor(cat.percentage)}
                                    size="md"
                                />
                            </div>
                        ))}
                    </Card.Body>
                </Card>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                    <Card.Header className="bg-success-50 dark:bg-success-500/20">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-success-600 dark:text-success-400" />
                            <h3 className="font-semibold text-success-900 dark:text-success-300">Your Strengths</h3>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <ul className="space-y-3">
                            {displayResults.strengths.map((strength, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-success-500 dark:text-success-400" />
                                    <span className="text-neutral-700 dark:text-neutral-300">{strength}</span>
                                </li>
                            ))}
                        </ul>
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Header className="bg-warning-50 dark:bg-warning-500/20">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-warning-600 dark:text-warning-400" />
                            <h3 className="font-semibold text-warning-900 dark:text-warning-300">Areas to Improve</h3>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <ul className="space-y-3">
                            {displayResults.weaknesses.map((weakness, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4 text-warning-500 dark:text-warning-400" />
                                    <span className="text-neutral-700 dark:text-neutral-300">{weakness}</span>
                                </li>
                            ))}
                        </ul>
                    </Card.Body>
                </Card>
            </div>

            {/* Recommendations */}
            <Card className="mb-8">
                <Card.Header>
                    <h3 className="font-semibold dark:text-white">Recommended Next Steps</h3>
                </Card.Header>
                <Card.Body>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {displayResults.recommendations.map((rec) => (
                            <div
                                key={rec.taskId}
                                className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-primary-200 dark:hover:border-primary-500/50 hover:shadow-md dark:hover:shadow-glow transition-all bg-white dark:bg-neutral-800/50"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge
                                        variant={rec.priority === 'high' ? 'error' : rec.priority === 'medium' ? 'warning' : 'default'}
                                        size="sm"
                                    >
                                        {rec.priority} priority
                                    </Badge>
                                </div>
                                <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">{rec.title}</h4>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{rec.reason}</p>
                                <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {rec.estimatedTime}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Star className="w-3 h-3" />
                                        Level {rec.difficulty}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card.Body>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                    variant="outline"
                    leftIcon={<RotateCcw className="w-4 h-4" />}
                    onClick={handleRetakeAssessment}
                >
                    Retake Assessment
                </Button>
                <Button
                    leftIcon={<Map className="w-4 h-4" />}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    onClick={handleViewLearningPath}
                >
                    View Learning Path
                </Button>
            </div>
        </div>
    );
};
