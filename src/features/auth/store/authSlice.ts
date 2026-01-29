import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/shared/types';

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

// Mock user for static demo
const mockUser: User = {
    id: '1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    role: 'Learner',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    hasCompletedAssessment: true,
    createdAt: '2024-01-15T10:30:00Z',
};

const initialState: AuthState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
            state.loading = false;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
            state.error = null;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        // Mock login for static demo
        mockLogin: (state) => {
            state.user = mockUser;
            state.accessToken = 'mock-jwt-token-12345';
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
        },
        mockLoginAsAdmin: (state) => {
            state.user = { ...mockUser, role: 'Admin', name: 'Admin User' };
            state.accessToken = 'mock-admin-jwt-token-12345';
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    setUser,
    clearError,
    mockLogin,
    mockLoginAsAdmin,
} = authSlice.actions;

export default authSlice.reducer;
