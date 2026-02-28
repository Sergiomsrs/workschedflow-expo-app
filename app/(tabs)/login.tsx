import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '@/auth/store/useAuthStore'
import { getMe } from '@/auth/actions/auth-actions';

const LoginScreen = () => {

  const { login, token } = useAuthStore();
  const [bandera, setBandera] = useState(false)
  useEffect(() => {
    login("1234", "1234");
    setBandera(true)
  }, []);







  return (
    <View>
      <Text>Hola Mundo desde explore</Text>
    </View>
  )
}

export default LoginScreen