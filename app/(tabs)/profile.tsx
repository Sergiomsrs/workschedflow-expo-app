
import { useAuthStore } from '@/auth/store/useAuthStore';
import { LoginScreen } from '@/components/profiles/LoginScreen';
import React from 'react';
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