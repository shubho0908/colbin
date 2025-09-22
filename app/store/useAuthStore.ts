import { create } from 'zustand';
import { z } from 'zod';
import { User } from '@prisma/client';

const userSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string(),
});

interface AuthState {
    isLoggedIn: boolean;
    user: z.infer<typeof userSchema> | null;
    isLoading: boolean;
    checkAuth: () => Promise<void>;
    login: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isLoggedIn: false,
    user: null,
    isLoading: true,
    checkAuth: async () => {
        try {
            const statusRes = await fetch('/api/status');
            const statusData = await statusRes.json();

            if (statusData.loggedIn) {
                const profileRes = await fetch('/api/profile');
                if (profileRes.ok) {
                    const profileData = await profileRes.json();
                    const validatedUser = userSchema.parse(profileData.user);
                    set({ isLoggedIn: true, user: validatedUser, isLoading: false });
                } else {
                    set({ isLoggedIn: false, user: null, isLoading: false });
                }
            } else {
                set({ isLoggedIn: false, user: null, isLoading: false });
            }
        } catch (error) {
            console.error('Auth check error:', error);
            set({ isLoggedIn: false, user: null, isLoading: false });
        }
    },
    login: (user: User) => {
        const validatedUser = userSchema.parse(user);
        set({ isLoggedIn: true, user: validatedUser, isLoading: false });
    },
    logout: () => set({ isLoggedIn: false, user: null, isLoading: false })
}));