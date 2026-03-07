import { useAuthStore } from '@/auth/store/useAuthStore';
import React from 'react';
import { Button, View } from 'react-native';

const UserSection = () => {

    const { logout } = useAuthStore();



    return (
        <View>
            <Button title='logout' onPress={() => logout()} />
        </View>
    )
}

export default UserSection