'use client';
import React, {createContext, useContext, useState, ReactNode, useEffect} from 'react';
import {normalizeUrl} from "next/dist/build/webpack/loaders/css-loader/src/utils";

export interface UserInfo {
    firstName?: string;
    lastName?: string;
    email?: string;
    userRole?: string;
}

interface UserContextType {
    userInfo: UserInfo;
    setUserInfo: (info: UserInfo) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}: { children: ReactNode }) => {
    const [userInfo, setUserInfo] = useState<UserInfo>({});

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await fetch('/api/proxy/auth/info', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                });

                if (res.ok) {
                    const data = await res.json();
                    console.log('data', data);
                    setUserInfo({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        userRole: data.userRole,
                    });
                }
            } catch (e) {
                // Optionally handle error
            }
        };
        fetchUserInfo();
    }, []);

    return (
        <UserContext.Provider value={{userInfo, setUserInfo}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
