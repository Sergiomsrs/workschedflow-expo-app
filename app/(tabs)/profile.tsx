
import { useAuthStore } from '@/src/auth/store/useAuthStore';
import React from 'react';
import LoginScreen from '../userSection/LoginScreen';
import UserSection from '../userSection/UserSection';

const profile = () => {

    const { status } = useAuthStore();



    return (
        <>
            {status == 'authenticated' ? <UserSection /> : <LoginScreen />}
        </>
    )
}

export default profile