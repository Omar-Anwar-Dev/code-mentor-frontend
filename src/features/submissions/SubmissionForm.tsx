import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/app/hooks';
import { createSubmission } from './submissionsSlice';
import { addToast } from '@/features/ui/uiSlice';
import { Button, Card, Input, Badge, Tabs, TabPanel } from '@/components/ui';
import { Github, Upload, FileArchive, ArrowRight, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';

export const SubmissionForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [, setActiveTab] = useState(0);
    const [githubUrl, setGithubUrl] = useState('');
    const [branch, setBranch] = useState('main');
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateGitHubUrl = (url: string) => {
        const pattern = /^https:\/\/github\.com\/[\w-]+\/[\w.-]+$/;
        return pattern.test(url);
    };

    const handleGitHubSubmit = () => {
        if (!validateGitHubUrl(githubUrl)) {
            dispatch(addToast({ type: 'error', title: 'Invalid URL', message: 'Please enter a valid GitHub repository URL' }));
            return;
        }

        setIsSubmitting(true);
        dispatch(createSubmission({
            submissionType: 'GitHub',
            repositoryUrl: githubUrl,
            branch,
            taskTitle: 'REST API Development',
        }));

        setTimeout(() => {
            setIsSubmitting(false);
            dispatch(addToast({ type: 'success', title: 'Submission received!', message: 'Your code is being processed.' }));
            navigate('/submissions/sub-' + Date.now() + '/status');
        }, 1000);
    };

    const handleFileUpload = () => {
        if (!file) {
            dispatch(addToast({ type: 'error', title: 'No file selected', message: 'Please select a ZIP file to upload' }));
            return;
        }

        setIsSubmitting(true);
        dispatch(createSubmission({
            submissionType: 'Upload',
            fileName: file.name,
            taskTitle: 'Component Library',
        }));

        setTimeout(() => {
            setIsSubmitting(false);
            dispatch(addToast({ type: 'success', title: 'Upload complete!', message: 'Your code is being processed.' }));
            navigate('/submissions/sub-' + Date.now() + '/status');
        }, 1500);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.size > 50 * 1024 * 1024) {
                dispatch(addToast({ type: 'error', title: 'File too large', message: 'Maximum file size is 50MB' }));
                return;
            }
            if (!selectedFile.name.endsWith('.zip')) {
                dispatch(addToast({ type: 'error', title: 'Invalid file type', message: 'Please upload a ZIP file' }));
                return;
            }
            setFile(selectedFile);
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const tabs = [
        { key: 'github', label: 'GitHub Repository', icon: <Github className="w-4 h-4" /> },
        { key: 'upload', label: 'Upload ZIP', icon: <Upload className="w-4 h-4" /> },
    ];

    return (
        <div className="max-w-2xl mx-auto animate-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">Submit Your Code</h1>
                <p className="text-neutral-600 dark:text-neutral-400">
                    Submit your completed task for AI-powered code review and feedback.
                </p>
            </div>

            {/* Task Info Card */}
            <Card variant="glass" className="mb-6">
                <Card.Body className="flex items-center gap-4 p-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg">
                        <FileArchive className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-neutral-900 dark:text-white text-lg">Build a REST API</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">Task #4 from your learning path</p>
                    </div>
                    <Badge variant="primary" className="bg-gradient-to-r from-primary-500 to-purple-500 text-white border-0">In Progress</Badge>
                </Card.Body>
            </Card>

            {/* Submission Form */}
            <Card variant="glass">
                <Card.Body className="p-6">
                    <Tabs tabs={tabs} onChange={setActiveTab}>
                        {/* GitHub Tab */}
                        <TabPanel>
                            <div className="space-y-4">
                                <div>
                                    <Input
                                        label="Repository URL"
                                        placeholder="https://github.com/username/repository"
                                        value={githubUrl}
                                        onChange={(e) => setGithubUrl(e.target.value)}
                                        leftIcon={<Github className="w-5 h-5" />}
                                        error={githubUrl && !validateGitHubUrl(githubUrl) ? 'Invalid GitHub URL format' : undefined}
                                    />
                                    <p className="mt-1 text-xs text-neutral-500">
                                        Make sure your repository is public or you've granted access.
                                    </p>
                                </div>

                                <Input
                                    label="Branch"
                                    placeholder="main"
                                    value={branch}
                                    onChange={(e) => setBranch(e.target.value)}
                                    helperText="The branch containing your submission code"
                                />

                                <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm border border-blue-100 dark:border-blue-800">
                                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                    <span>We'll clone your repository and analyze all files in the specified branch.</span>
                                </div>

                                <Button
                                    variant="gradient"
                                    fullWidth
                                    onClick={handleGitHubSubmit}
                                    loading={isSubmitting}
                                    disabled={!githubUrl || !validateGitHubUrl(githubUrl)}
                                    rightIcon={<ArrowRight className="w-4 h-4" />}
                                >
                                    Submit Repository
                                </Button>
                            </div>
                        </TabPanel>

                        {/* Upload Tab */}
                        <TabPanel>
                            <div className="space-y-4">
                                <div className="border-2 border-dashed border-neutral-200 dark:border-neutral-700 rounded-2xl p-8 text-center hover:border-primary-400 dark:hover:border-primary-500 transition-colors bg-neutral-50/50 dark:bg-neutral-800/50">
                                    <input
                                        type="file"
                                        accept=".zip"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <label htmlFor="file-upload" className="cursor-pointer">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                                            <Upload className="w-8 h-8 text-white" />
                                        </div>
                                        <p className="text-neutral-900 dark:text-white font-medium mb-1">
                                            {file ? file.name : 'Click to upload or drag and drop'}
                                        </p>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                            {file ? formatFileSize(file.size) : 'ZIP file up to 50MB'}
                                        </p>
                                    </label>
                                </div>

                                {file && (
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-success-50 text-success-700">
                                        <CheckCircle className="w-5 h-5" />
                                        <div className="flex-1">
                                            <p className="font-medium">{file.name}</p>
                                            <p className="text-sm opacity-80">{formatFileSize(file.size)}</p>
                                        </div>
                                        <button
                                            onClick={() => setFile(null)}
                                            className="text-success-600 hover:text-success-800"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}

                                <Button
                                    fullWidth
                                    onClick={handleFileUpload}
                                    loading={isSubmitting}
                                    disabled={!file}
                                    rightIcon={<ArrowRight className="w-4 h-4" />}
                                >
                                    Upload & Submit
                                </Button>
                            </div>
                        </TabPanel>
                    </Tabs>
                </Card.Body>
            </Card>

            {/* Help Section */}
            <div className="mt-6 text-center">
                <a href="#" className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700">
                    <span>Submission guidelines</span>
                    <ExternalLink className="w-4 h-4" />
                </a>
            </div>
        </div>
    );
};
