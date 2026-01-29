import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { submitAnswer, nextQuestion, decrementTime, completeAssessment } from './assessmentSlice';
import { Button, Card, Badge, ProgressBar } from '@/components/ui';
import { Clock, Star, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

export const AssessmentQuestion: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        currentQuestion,
        questionsAnswered,
        totalQuestions,
        currentDifficulty,
        timeRemaining,
        lastAnswer,
        isCompleted,
    } = useAppSelector((state) => state.assessment);

    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);

    // Format time as MM:SS
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Timer effect
    useEffect(() => {
        if (isCompleted) {
            navigate('/assessment/results');
            return;
        }

        const timer = setInterval(() => {
            dispatch(decrementTime());
        }, 1000);

        return () => clearInterval(timer);
    }, [dispatch, isCompleted, navigate]);

    // Check time warnings
    const isTimeWarning = timeRemaining <= 300 && timeRemaining > 120; // 5 min warning
    const isTimeCritical = timeRemaining <= 120; // 2 min warning

    // Auto-submit when time runs out
    useEffect(() => {
        if (timeRemaining === 0) {
            dispatch(completeAssessment());
        }
    }, [timeRemaining, dispatch]);

    const handleSubmitAnswer = () => {
        if (!selectedOption) return;

        // Mock: determine if answer is correct (C is always correct in mock)
        const isCorrect = selectedOption === 'C';
        dispatch(submitAnswer({ option: selectedOption, isCorrect }));
        setShowFeedback(true);
    };

    const handleNextQuestion = () => {
        setShowFeedback(false);
        setSelectedOption(null);
        dispatch(nextQuestion());
    };

    if (!currentQuestion) {
        return (
            <div className="flex items-center justify-center h-96">
                <p className="text-neutral-600 dark:text-neutral-400">Loading question...</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto animate-fade-in">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                {/* Timer */}
                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-lg font-semibold ${isTimeCritical
                    ? 'bg-error-100 dark:bg-error-500/20 text-error-700 dark:text-error-400'
                    : isTimeWarning
                        ? 'bg-warning-100 dark:bg-warning-500/20 text-warning-700 dark:text-warning-400'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                    }`}>
                    <Clock className="w-5 h-5" />
                    {formatTime(timeRemaining)}
                </div>

                {/* Progress */}
                <div className="flex items-center gap-4">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        Question {questionsAnswered + 1} of {totalQuestions}
                    </span>
                    <div className="w-32">
                        <ProgressBar
                            value={questionsAnswered}
                            max={totalQuestions}
                            size="sm"
                            variant="primary"
                        />
                    </div>
                </div>

                {/* Difficulty */}
                <div className="flex items-center gap-2">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Difficulty:</span>
                    <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((level) => (
                            <Star
                                key={level}
                                className={`w-4 h-4 ${level <= currentDifficulty
                                    ? 'text-warning-500 fill-warning-500'
                                    : 'text-neutral-300 dark:text-neutral-600'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Category Badge */}
            <div className="flex gap-2 mb-4">
                <Badge variant="primary">{currentQuestion.category}</Badge>
                <Badge variant="default">{currentQuestion.topic}</Badge>
            </div>

            {/* Question Card */}
            <Card className="mb-6">
                <Card.Body className="p-6">
                    <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">
                        {currentQuestion.questionText}
                    </h2>

                    {/* Options */}
                    <div className="space-y-3">
                        {currentQuestion.options.map((option) => {
                            const isSelected = selectedOption === option.id;
                            const isCorrect = showFeedback && option.id === lastAnswer?.correctOption;
                            const isWrong = showFeedback && isSelected && !lastAnswer?.isCorrect;

                            return (
                                <button
                                    key={option.id}
                                    onClick={() => !showFeedback && setSelectedOption(option.id)}
                                    disabled={showFeedback}
                                    className={`
                    w-full p-4 rounded-xl text-left transition-all duration-200
                    flex items-center gap-3 border-2
                    ${showFeedback
                                            ? isCorrect
                                                ? 'border-success-500 bg-success-50 dark:bg-success-500/20 text-success-900 dark:text-success-300'
                                                : isWrong
                                                    ? 'border-error-500 bg-error-50 dark:bg-error-500/20 text-error-900 dark:text-error-300'
                                                    : 'border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                                            : isSelected
                                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/20 text-primary-900 dark:text-primary-300'
                                                : 'border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-500/50 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                                        }
                  `}
                                >
                                    <span className={`
                    w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold
                    ${showFeedback
                                            ? isCorrect
                                                ? 'bg-success-500 text-white'
                                                : isWrong
                                                    ? 'bg-error-500 text-white'
                                                    : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
                                            : isSelected
                                                ? 'bg-primary-500 text-white'
                                                : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
                                        }
                  `}>
                                        {option.id}
                                    </span>
                                    <span className="flex-1 font-medium">{option.text}</span>
                                    {showFeedback && isCorrect && (
                                        <CheckCircle className="w-5 h-5 text-success-500" />
                                    )}
                                    {showFeedback && isWrong && (
                                        <XCircle className="w-5 h-5 text-error-500" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </Card.Body>
            </Card>

            {/* Feedback Section */}
            {showFeedback && lastAnswer && (
                <Card className={`mb-6 border-2 ${lastAnswer.isCorrect ? 'border-success-200 dark:border-success-500/30' : 'border-warning-200 dark:border-warning-500/30'
                    }`}>
                    <Card.Body className="p-6">
                        <div className="flex items-start gap-3">
                            {lastAnswer.isCorrect ? (
                                <CheckCircle className="w-6 h-6 text-success-500 flex-shrink-0" />
                            ) : (
                                <XCircle className="w-6 h-6 text-error-500 flex-shrink-0" />
                            )}
                            <div>
                                <h3 className={`font-semibold mb-2 ${lastAnswer.isCorrect ? 'text-success-700 dark:text-success-400' : 'text-error-700 dark:text-error-400'
                                    }`}>
                                    {lastAnswer.isCorrect ? 'Correct!' : 'Incorrect'}
                                </h3>
                                <p className="text-neutral-600 dark:text-neutral-400">{lastAnswer.explanation}</p>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end">
                {!showFeedback ? (
                    <Button
                        onClick={handleSubmitAnswer}
                        disabled={!selectedOption}
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                        Submit Answer
                    </Button>
                ) : (
                    <Button
                        onClick={handleNextQuestion}
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                        {questionsAnswered >= totalQuestions - 1 ? 'View Results' : 'Next Question'}
                    </Button>
                )}
            </div>
        </div>
    );
};
