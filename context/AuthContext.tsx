import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, pass: string) => Promise<boolean>;
    register: (name: string, email: string, pass: string, faction: 'EFSF' | 'ZEON') => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Simulate session check on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('gundam_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email: string, pass: string): Promise<boolean> => {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // In a real app, we'd verify password hash. Here we just key off localstorage "users" DB
        const usersDB = JSON.parse(localStorage.getItem('gundam_users_db') || '[]');
        const foundUser = usersDB.find((u: any) => u.email === email && u.password === pass);

        if (foundUser) {
            const { password, ...userData } = foundUser;
            setUser(userData);
            localStorage.setItem('gundam_user', JSON.stringify(userData));
            setLoading(false);
            return true;
        }

        setLoading(false);
        return false;
    };

    const register = async (name: string, email: string, pass: string, faction: 'EFSF' | 'ZEON') => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));

        const newUser: User = {
            id: `PILOT-${Date.now()}`,
            name,
            email,
            faction,
            rank: 'Recruit',
            joinedDate: new Date().toISOString().split('T')[0]
        };

        // Save with password to "DB"
        const usersDB = JSON.parse(localStorage.getItem('gundam_users_db') || '[]');

        // Check if email exists
        if (usersDB.some((u: any) => u.email === email)) {
            setLoading(false);
            throw new Error('Signal Intercepted: Pilot ID already registered.');
        }

        usersDB.push({ ...newUser, password: pass });
        localStorage.setItem('gundam_users_db', JSON.stringify(usersDB));

        // Auto login
        setUser(newUser);
        localStorage.setItem('gundam_user', JSON.stringify(newUser));
        setLoading(false);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('gundam_user');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
