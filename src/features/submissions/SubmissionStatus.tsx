import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/app/hooks';
import { updatePollingStatus, loadFeedback } from './submissionsSlice';
import { Button, Card, ProgressBar } from '@/components/ui';
import { CheckCircle, FileCode, Sparkles, Shield, Clock, ArrowRight } from 'lucide-react';

const stages = [
    { id: 'receiving', label: 'Receiving submission', icon: FileCode, progress: 0 },
    { id: 'cloning', label: 'Cloning repository', icon: FileCode, progress: 20 },
    { id: 'analyzing', label: 'Running static analysis', icon: Shield, progress: 40 },
    { id: 'ai', label: 'AI code review', icon: Sparkles, progress: 70 },
    { id: 'generating', label: 'Generating feedback', icon: FileCode, progress: 90 },
    { id: 'complete', label: 'Complete', icon: CheckCircle, progress: 100 },
];

export const SubmissionStatus: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // Note: useAppSelector can be used here to get currentSubmission or pollingStatus if needed

    const [currentStageIndex, setCurrentStageIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    // Simulate progress polling
    useEffect(() => {
        if (isComplete) return;

        const interval = setInterval(() => {
            setCurrentStageIndex((prev) => {
                if (prev >= stages.length - 1) {
                    setIsComplete(true);
                    clearInterval(interval);
                    return prev;
                }
                const nextIndex = prev + 1;
                dispatch(updatePollingStatus({
                    progress: stages[nextIndex].progress,
                    message: stages[nextIndex].label,
                }));
                return nextIndex;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [dispatch, isComplete]);

    const handleViewFeedback = () => {
        dispatch(loadFeedback());
        navigate('/submissions/sub-1/feedback');
    };

    return (
        <div className="max-w-2xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-neutral-900 mb-2">
                    {isComplete ? 'Review Complete!' : 'Processing Your Submission'}
                </h1>
                <p className="text-neutral-600">
                    {isComplete
                        ? 'Your code has been analyzed. View your detailed feedback below.'
                        : 'Our AI is analyzing your code. This usually takes 3-5 minutes.'}
                </p>
            </div>

            {/* Progress Card */}
            <Card className="mb-6">
                <Card.Body className="p-6">
                    {/* Overall Progress */}
                    <div className="mb-8">
                        <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium text-neutral-700">Overall Progress</span>
                            <span className="text-sm font-semibold text-primary-600">
                                {stages[currentStageIndex].progress}%
                            </span>
                        </div>
                        <ProgressBar
                            value={stages[currentStageIndex].progress}
                            variant={isComplete ? 'success' : 'primary'}
                            size="lg"
                            animated
                        />
                    </div>

                    {/* Stages */}
                    <div className="space-y-3">
                        {stages.slice(0, -1).map((stage, index) => {
                            const isActive = index === currentStageIndex;
                            const isCompleted = index < currentStageIndex || isComplete;
                            const Icon = stage.icon;

                            return (
                                <div
                                    key={stage.id}
                                    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? 'bg-primary-50' : isCompleted ? 'bg-success-50' : 'bg-neutral-50'
                                        }`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive
                                        ? 'bg-primary-500 text-white'
                                        : isCompleted
                                            ? 'bg-success-500 text-white'
                                            : 'bg-neutral-200 text-neutral-500'
                                        }`}>
                                        {isCompleted ? (
                                            <CheckCircle className="w-4 h-4" />
                                        ) : (
                                            <Icon className="w-4 h-4" />
                                        )}
                                    </div>
                                    <span className={`flex-1 font-medium ${isActive ? 'text-primary-700' : isCompleted ? 'text-success-700' : 'text-neutral-500'
                                        }`}>
                                        {stage.label}
                                    </span>
                                    {isActive && !isComplete && (
                                        <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </Card.Body>
            </Card>

            {/* Estimated Time */}
            {!isComplete && (
                <div className="flex items-center justify-center gap-2 text-neutral-600 mb-6">
                    <Clock className="w-4 h-4" />
                    <span>Estimated time remaining: {5 - currentStageIndex} minutes</span>
                </div>
            )}

            {/* Action Buttons */}
            <div className="text-center">
                {isComplete ? (
                    <Button
                        size="lg"
                        onClick={handleViewFeedback}
                        rightIcon={<ArrowRight className="w-5 h-5" />}
                    >
                        View Detailed Feedback
                    </Button>
                ) : (
                    <p className="text-sm text-neutral-500">
                        You can leave this page. We'll notify you when your review is ready.
                    </p>
                )}
            </div>
        </div>
    );
};
