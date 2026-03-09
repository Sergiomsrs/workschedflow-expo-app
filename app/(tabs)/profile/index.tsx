
import LoginScreen from '@/app/userSection/LoginScreen';
import UserSection from '@/app/userSection/UserSection';
import { useAuthStore } from '@/src/auth/store/useAuthStore';
import React from 'react';


const profile = () => {

    const { status } = useAuthStore();



    return (
        <>
            {status == 'authenticated' ? <UserSection /> : <LoginScreen />}
        </>
    )
}

export default profile