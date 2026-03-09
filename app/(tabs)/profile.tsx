
import { useAuthStore } from '@/auth/store/useAuthStore';
import React from 'react';
import UserSection from '../userSection/UserSection';
import LoginScreen from '../userSection/LoginScreen';

const profile = () => {

    const { status } = useAuthStore();



    return (
        <>
            {status == 'authenticated' ? <UserSection /> : <LoginScreen />}
        </>
    )
}

export default profile