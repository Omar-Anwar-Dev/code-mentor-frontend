import React, { useState } from 'react';
import { Card, Badge, Button, ProgressBar } from '@/components/ui';
import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    ResponsiveContainer,
} from 'recharts';
import {
    Share2,
    Download,
    Link as LinkIcon,
    Copy,
    CheckCircle,
    ExternalLink,
    Github,
    Mail,
    MapPin,
    Trophy,
    Target,
    Code,
    BookOpen,
    TrendingUp,
    Lock,
    Unlock,
} from 'lucide-react';

// Mock CV data
const mockCVData = {
    user: {
        name: 'Omar Ahmed',
        title: 'Full Stack Developer',
        email: 'omar.ahmed@example.com',
        location: 'Cairo, Egypt',
        github: 'omar-dev',
        website: 'https://omar-dev.com',
        bio: 'Passionate full stack developer with expertise in React, Node.js, and cloud technologies. Committed to writing clean, maintainable code and continuous learning.',
        joinedDate: 'December 2024',
        profileUrl: 'https://codementor.ai/cv/omar-ahmed-a1b2c3',
    },
    level: 18,
    xp: 8200,
    rank: 'Intermediate Developer',
    verifiedSkills: [
        { name: 'React', level: 85, verified: true, category: 'Frontend' },
        { name: 'TypeScript', level: 78, verified: true, category: 'Languages' },
        { name: 'Node.js', level: 72, verified: true, category: 'Backend' },
        { name: 'Python', level: 65, verified: false, category: 'Languages' },
        { name: 'SQL', level: 70, verified: true, category: 'Database' },
        { name: 'REST APIs', level: 80, verified: true, category: 'Backend' },
        { name: 'Git', level: 75, verified: true, category: 'Tools' },
        { name: 'Security', level: 60, verified: false, category: 'Quality' },
    ],
    skillRadar: [
        { skill: 'Frontend', value: 85, fullMark: 100 },
        { skill: 'Backend', value: 75, fullMark: 100 },
        { skill: 'Database', value: 70, fullMark: 100 },
        { skill: 'DevOps', value: 55, fullMark: 100 },
        { skill: 'Security', value: 60, fullMark: 100 },
        { skill: 'Testing', value: 65, fullMark: 100 },
    ],
    codeQuality: {
        overall: 85,
        metrics: [
            { name: 'Readability', score: 88 },
            { name: 'Maintainability', score: 82 },
            { name: 'Performance', score: 79 },
            { name: 'Security', score: 85 },
            { name: 'Best Practices', score: 90 },
        ],
    },
    projects: [
        {
            id: 1,
            title: 'E-commerce REST API',
            description: 'Built a complete REST API with authentication, product management, and order processing',
            technologies: ['Node.js', 'Express', 'MongoDB', 'JWT'],
            score: 92,
            completedDate: '2024-12-20',
            highlights: ['Clean architecture', 'Comprehensive error handling', 'Well-documented endpoints'],
        },
        {
            id: 2,
            title: 'React Dashboard',
            description: 'Developed an interactive analytics dashboard with real-time data visualization',
            technologies: ['React', 'TypeScript', 'Recharts', 'TailwindCSS'],
            score: 88,
            completedDate: '2024-12-15',
            highlights: ['Responsive design', 'Performance optimized', 'Accessible components'],
        },
        {
            id: 3,
            title: 'Authentication System',
            description: 'Implemented secure JWT authentication with OAuth integration',
            technologies: ['Node.js', 'Passport.js', 'Redis', 'PostgreSQL'],
            score: 85,
            completedDate: '2024-12-10',
            highlights: ['Rate limiting', 'Session management', 'Security best practices'],
        },
    ],
    badges: [
        { id: 1, name: 'Fast Learner', icon: '🚀' },
        { id: 2, name: 'Code Master', icon: '💻' },
        { id: 3, name: 'Week Warrior', icon: '🔥' },
        { id: 4, name: 'Quality Champion', icon: '⭐' },
    ],
    stats: {
        tasksCompleted: 47,
        totalSubmissions: 62,
        avgScore: 85,
        learningHours: 156,
        streak: 14,
    },
};

export const LearningCVPage: React.FC = () => {
    const [isPublic, setIsPublic] = useState(true);
    const [copied, setCopied] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(mockCVData.user.profileUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-success-600';
        if (score >= 75) return 'text-primary-600';
        if (score >= 60) return 'text-warning-600';
        return 'text-error-600';
    };

    const getScoreBadge = (score: number) => {
        if (score >= 90) return 'success';
        if (score >= 75) return 'primary';
        if (score >= 60) return 'warning';
        return 'error';
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header with Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">Learning CV</h1>
                    <p className="text-neutral-600 dark:text-neutral-400">Your verified skills and achievements portfolio</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                        <button
                            onClick={() => setIsPublic(!isPublic)}
                            className={`flex items-center gap-1 px-2 py-1 rounded-md text-sm font-medium transition-colors ${isPublic ? 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400' : ''
                                }`}
                        >
                            {isPublic ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                            {isPublic ? 'Public' : 'Private'}
                        </button>
                    </div>
                    <Button variant="outline" leftIcon={<Share2 className="w-4 h-4" />}>
                        Share
                    </Button>
                    <Button variant="primary" leftIcon={<Download className="w-4 h-4" />}>
                        Export PDF
                    </Button>
                </div>
            </div>

            {/* Share Link */}
            <Card className="border-primary-200 dark:border-primary-800 bg-primary-50/50 dark:bg-primary-900/10">
                <Card.Body className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                                <LinkIcon className="w-5 h-5 text-primary-600" />
                            </div>
                            <div>
                                <p className="font-medium text-neutral-900 dark:text-white">Your Public CV Link</p>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">{mockCVData.user.profileUrl}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                leftIcon={copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                onClick={handleCopyLink}
                            >
                                {copied ? 'Copied!' : 'Copy Link'}
                            </Button>
                            <Button variant="ghost" size="sm" leftIcon={<ExternalLink className="w-4 h-4" />}>
                                Preview
                            </Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>

            {/* CV Preview */}
            <Card variant="glass" className="overflow-hidden">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 p-8 text-white">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-28 h-28 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-4xl font-bold">
                            {mockCVData.user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="text-center md:text-left flex-1">
                            <h2 className="text-3xl font-bold mb-1">{mockCVData.user.name}</h2>
                            <p className="text-xl text-white/90 mb-2">{mockCVData.user.title}</p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-white/80">
                                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{mockCVData.user.location}</span>
                                <span className="flex items-center gap-1"><Mail className="w-4 h-4" />{mockCVData.user.email}</span>
                                <span className="flex items-center gap-1"><Github className="w-4 h-4" />@{mockCVData.user.github}</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-2">
                                <span className="text-3xl font-bold">{mockCVData.level}</span>
                            </div>
                            <p className="text-sm text-white/80">Level</p>
                        </div>
                    </div>
                </div>

                <Card.Body className="p-6">
                    {/* Bio */}
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6">{mockCVData.user.bio}</p>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                        {[
                            { icon: Target, value: mockCVData.stats.tasksCompleted, label: 'Tasks Done' },
                            { icon: Code, value: mockCVData.stats.totalSubmissions, label: 'Submissions' },
                            { icon: TrendingUp, value: `${mockCVData.stats.avgScore}%`, label: 'Avg Score' },
                            { icon: BookOpen, value: `${mockCVData.stats.learningHours}h`, label: 'Learning' },
                            { icon: Trophy, value: mockCVData.badges.length, label: 'Badges' },
                        ].map((stat, index) => (
                            <div key={index} className="text-center p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
                                <stat.icon className="w-5 h-5 mx-auto mb-2 text-primary-600" />
                                <p className="text-xl font-bold text-neutral-900 dark:text-white">{stat.value}</p>
                                <p className="text-xs text-neutral-500">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Skills Radar */}
                        <Card>
                            <Card.Header>
                                <h3 className="font-semibold text-neutral-900 dark:text-white">Skill Overview</h3>
                            </Card.Header>
                            <Card.Body className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart data={mockCVData.skillRadar}>
                                        <PolarGrid stroke="#e5e5e5" />
                                        <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12 }} />
                                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                                        <Radar
                                            name="Skills"
                                            dataKey="value"
                                            stroke="#4f46e5"
                                            fill="#4f46e5"
                                            fillOpacity={0.3}
                                            strokeWidth={2}
                                        />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </Card.Body>
                        </Card>

                        {/* Code Quality */}
                        <Card>
                            <Card.Header>
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-neutral-900 dark:text-white">Code Quality Score</h3>
                                    <Badge variant={getScoreBadge(mockCVData.codeQuality.overall)} size="lg">
                                        {mockCVData.codeQuality.overall}%
                                    </Badge>
                                </div>
                            </Card.Header>
                            <Card.Body className="space-y-4">
                                {mockCVData.codeQuality.metrics.map((metric) => (
                                    <div key={metric.name}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium text-neutral-700 dark:text-neutral-300">{metric.name}</span>
                                            <span className={`font-semibold ${getScoreColor(metric.score)}`}>{metric.score}%</span>
                                        </div>
                                        <ProgressBar value={metric.score} max={100} size="sm" />
                                    </div>
                                ))}
                            </Card.Body>
                        </Card>
                    </div>

                    {/* Verified Skills */}
                    <div className="mt-6">
                        <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">Verified Skills</h3>
                        <div className="flex flex-wrap gap-3">
                            {mockCVData.verifiedSkills.map((skill) => (
                                <div
                                    key={skill.name}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${skill.verified
                                        ? 'bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-800'
                                        : 'bg-neutral-50 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-700'
                                        }`}
                                >
                                    {skill.verified && <CheckCircle className="w-4 h-4 text-success-600" />}
                                    <span className="font-medium text-neutral-900 dark:text-white">{skill.name}</span>
                                    <Badge variant={skill.verified ? 'success' : 'default'} size="sm">
                                        {skill.level}%
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Projects */}
                    <div className="mt-8">
                        <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">Featured Projects</h3>
                        <div className="space-y-4">
                            {mockCVData.projects.map((project) => (
                                <Card key={project.id} className="border border-neutral-200 dark:border-neutral-700">
                                    <Card.Body className="p-5">
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h4 className="font-semibold text-neutral-900 dark:text-white">{project.title}</h4>
                                                    <Badge variant={getScoreBadge(project.score)}>
                                                        AI Score: {project.score}%
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{project.description}</p>
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {project.technologies.map((tech) => (
                                                        <Badge key={tech} variant="default" size="sm">
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.highlights.map((highlight) => (
                                                        <span key={highlight} className="flex items-center gap-1 text-xs text-success-600 dark:text-success-400">
                                                            <CheckCircle className="w-3 h-3" />
                                                            {highlight}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-neutral-500">{project.completedDate}</p>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="mt-8">
                        <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">Achievements</h3>
                        <div className="flex flex-wrap gap-4">
                            {mockCVData.badges.map((badge) => (
                                <div
                                    key={badge.id}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800"
                                >
                                    <span className="text-2xl">{badge.icon}</span>
                                    <span className="font-medium text-neutral-900 dark:text-white">{badge.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700 text-center">
                        <p className="text-sm text-neutral-500">
                            Verified by CodeMentor AI • Member since {mockCVData.user.joinedDate}
                        </p>
                        <p className="text-xs text-neutral-400 mt-1">
                            {mockCVData.user.profileUrl}
                        </p>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};
