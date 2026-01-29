import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Question, AnswerResponse, AssessmentResult, Track } from '@/shared/types';

// Mock data
export const mockTracks: Track[] = [
    {
        id: '1',
        name: 'Full Stack Development',
        description: 'Master both frontend and backend technologies to build complete web applications.',
        icon: 'Layers',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    },
    {
        id: '2',
        name: 'Backend Specialist',
        description: 'Focus on server-side development, APIs, databases, and system architecture.',
        icon: 'Server',
        technologies: ['Node.js', 'Python', 'SQL', 'Redis'],
    },
    {
        id: '3',
        name: 'Frontend Specialist',
        description: 'Create stunning user interfaces with modern JavaScript frameworks.',
        icon: 'Monitor',
        technologies: ['React', 'TypeScript', 'CSS', 'Webpack'],
    },
    {
        id: '4',
        name: 'Python Developer',
        description: 'Build applications with Python, from web apps to data science projects.',
        icon: 'Code2',
        technologies: ['Python', 'Django', 'FastAPI', 'Pandas'],
    },
    {
        id: '5',
        name: 'C# / .NET Developer',
        description: 'Develop enterprise applications using the Microsoft technology stack.',
        icon: 'Cpu',
        technologies: ['C#', '.NET Core', 'Azure', 'SQL Server'],
    },
    {
        id: '6',
        name: 'CS Fundamentals',
        description: 'Strengthen your core computer science knowledge and problem-solving skills.',
        icon: 'BookOpen',
        technologies: ['Algorithms', 'Data Structures', 'Design Patterns', 'System Design'],
    },
];

const mockQuestion: Question = {
    questionId: 'q1',
    questionNumber: 1,
    totalQuestions: 30,
    questionText: 'Which of the following is NOT a primitive data type in JavaScript?',
    options: [
        { id: 'A', text: 'string' },
        { id: 'B', text: 'boolean' },
        { id: 'C', text: 'array' },
        { id: 'D', text: 'undefined' },
    ],
    difficulty: 2,
    category: 'JavaScript',
    topic: 'Data Types',
};

const mockResults: AssessmentResult = {
    overallScore: 78,
    skillLevel: 'Intermediate',
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
            priority: 'high',
            difficulty: 3,
            estimatedTime: '2 hours',
        },
        {
            taskId: 't2',
            title: 'Unit Testing with Jest',
            reason: 'Improve test coverage practices',
            priority: 'high',
            difficulty: 2,
            estimatedTime: '3 hours',
        },
    ],
};

interface AssessmentState {
    assessmentId: string | null;
    selectedTrack: Track | null;
    currentQuestion: Question | null;
    questionsAnswered: number;
    totalQuestions: number;
    currentDifficulty: number;
    timeRemaining: number;
    lastAnswer: AnswerResponse | null;
    results: AssessmentResult | null;
    isStarted: boolean;
    isCompleted: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AssessmentState = {
    assessmentId: null,
    selectedTrack: null,
    currentQuestion: null,
    questionsAnswered: 0,
    totalQuestions: 30,
    currentDifficulty: 2,
    timeRemaining: 40 * 60, // 40 minutes in seconds
    lastAnswer: null,
    results: null,
    isStarted: false,
    isCompleted: false,
    loading: false,
    error: null,
};

const assessmentSlice = createSlice({
    name: 'assessment',
    initialState,
    reducers: {
        selectTrack: (state, action: PayloadAction<Track>) => {
            state.selectedTrack = action.payload;
        },
        startAssessment: (state) => {
            state.assessmentId = 'assessment-' + Date.now();
            state.isStarted = true;
            state.currentQuestion = mockQuestion;
            state.timeRemaining = 40 * 60;
        },
        setCurrentQuestion: (state, action: PayloadAction<Question>) => {
            state.currentQuestion = action.payload;
        },
        submitAnswer: (state, action: PayloadAction<{ option: string; isCorrect: boolean }>) => {
            state.questionsAnswered += 1;
            state.lastAnswer = {
                isCorrect: action.payload.isCorrect,
                correctOption: 'C',
                explanation: 'Arrays in JavaScript are objects, not primitive types. Primitive types include string, number, boolean, undefined, null, symbol, and bigint.',
                nextDifficulty: action.payload.isCorrect ? Math.min(5, state.currentDifficulty + 1) : Math.max(1, state.currentDifficulty - 1),
                questionsRemaining: state.totalQuestions - state.questionsAnswered,
                currentScore: Math.round((state.questionsAnswered / state.totalQuestions) * 100 * 0.78),
            };
            state.currentDifficulty = state.lastAnswer.nextDifficulty;
        },
        nextQuestion: (state) => {
            if (state.questionsAnswered >= state.totalQuestions) {
                state.isCompleted = true;
                state.results = mockResults;
            } else {
                state.currentQuestion = {
                    ...mockQuestion,
                    questionId: 'q' + (state.questionsAnswered + 1),
                    questionNumber: state.questionsAnswered + 1,
                    difficulty: state.currentDifficulty,
                };
                state.lastAnswer = null;
            }
        },
        decrementTime: (state) => {
            if (state.timeRemaining > 0) {
                state.timeRemaining -= 1;
            } else {
                state.isCompleted = true;
                state.results = mockResults;
            }
        },
        completeAssessment: (state) => {
            state.isCompleted = true;
            state.results = mockResults;
        },
        resetAssessment: () => initialState,
    },
});

export const {
    selectTrack,
    startAssessment,
    setCurrentQuestion,
    submitAnswer,
    nextQuestion,
    decrementTime,
    completeAssessment,
    resetAssessment,
} = assessmentSlice.actions;

export default assessmentSlice.reducer;
