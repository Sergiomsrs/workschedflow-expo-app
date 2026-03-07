import { useAuthStore } from '@/auth/store/useAuthStore';
import { Redirect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";


const LoginScreen = () => {

  const { login, checkStatus, status } = useAuthStore();
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ dni?: string; password?: string }>({});



  console.log('Estado de autenticación:', status);



  useEffect(() => {
    //login('1234', '1234');
  }, []);

  /*   if (status === 'checking') {
      return (
        <View className="flex-1 justify-center items-center bg-white">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className="mt-4 text-gray-600">Verificando sesión...</Text>
        </View>
      );
    }
  
    if (status === 'authenticated') {
      return <Redirect href="/userSection/UserSection" />;
    } */

  const validateForm = () => {
    const newErrors: { dni?: string; password?: string } = {};

    if (!dni.trim()) {
      newErrors.dni = 'El DNI es requerido';
    } else if (dni.length < 4) {
      newErrors.dni = 'El DNI debe tener al menos 8 caracteres';
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 4) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const success = await login(dni, password);
      if (!success) {
        Alert.alert('Error', 'DNI o contraseña incorrectos');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (

    <ScrollView className="flex-1 bg-white">

      {/* Header con imagen de fondo */}
      <ImageBackground
        source={require("../../assets/images/bg-image-loginForm.webp")}
        resizeMode="cover"
        className="w-full h-56 justify-end"
      >
        <View className="absolute inset-0 bg-gradient-to-b from-blue-900/90 to-blue-800/80" />

        <View className="pb-8 items-center px-6">
          <Text className="text-white text-3xl font-bold">
            WORK<Text className="text-blue-300">SCHEDFLOW</Text>
          </Text>
          <Text className="text-blue-100 text-sm mt-2">Mi Jornada Laboral</Text>
        </View>
      </ImageBackground>

      {/* Contenido principal */}
      <View className="px-6 pt-8 pb-12">

        {/* Bienvenida */}
        <View className="mb-8">
          <Text className="text-gray-900 text-2xl font-bold mb-2">
            ¡Bienvenido!
          </Text>
          <Text className="text-gray-600 text-sm leading-5">
            Accede con tus credenciales para consultar tus turnos, fichar tu jornada y más.
          </Text>
        </View>

        {/* Beneficios para empleados */}
        <View className="mb-8 bg-blue-50 rounded-2xl p-4 border border-blue-100">
          <View className="space-y-3">

            <View className="flex-row items-start">
              <Text className="text-2xl mr-3">📅</Text>
              <View className="flex-1">
                <Text className="text-gray-900 font-semibold text-sm">
                  Tus Cuadrantes
                </Text>
                <Text className="text-gray-600 text-xs mt-1">
                  Consulta tus turnos de forma clara y sencilla
                </Text>
              </View>
            </View>

            <View className="flex-row items-start">
              <Text className="text-2xl mr-3">⏱️</Text>
              <View className="flex-1">
                <Text className="text-gray-900 font-semibold text-sm">
                  Fichaje Rápido
                </Text>
                <Text className="text-gray-600 text-xs mt-1">
                  Ficha entrada y salida con un solo click
                </Text>
              </View>
            </View>

            <View className="flex-row items-start">
              <Text className="text-2xl mr-3">⚠️</Text>
              <View className="flex-1">
                <Text className="text-gray-900 font-semibold text-sm">
                  Reporta Incidencias
                </Text>
                <Text className="text-gray-600 text-xs mt-1">
                  Comunica ausencias o cambios de turno al instante
                </Text>
              </View>
            </View>

          </View>
        </View>

        {/* Formulario */}
        <View className="space-y-4">

          {/* DNI */}
          <View>
            <Text className="text-sm font-semibold text-gray-800 mb-2">
              DNI / NIE
            </Text>
            <TextInput
              placeholder="Ej: 12345678A"
              placeholderTextColor="#999"
              value={dni}
              onChangeText={(text) => {
                setDni(text.toUpperCase());
                if (errors.dni) setErrors({ ...errors, dni: '' });
              }}
              editable={!loading}
              className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-gray-900 ${errors.dni ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
            />
            {errors.dni && (
              <Text className="text-red-600 text-xs mt-1 font-medium">{errors.dni}</Text>
            )}
          </View>

          {/* Password */}
          <View>
            <Text className="text-sm font-semibold text-gray-800 mb-2">
              Contraseña
            </Text>
            <View className={`flex-row items-center bg-gray-50 border rounded-xl px-4 py-3 ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}>
              <TextInput
                placeholder="Tu contraseña"
                placeholderTextColor="#999"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) setErrors({ ...errors, password: '' });
                }}
                secureTextEntry={!showPassword}
                editable={!loading}
                className="flex-1 text-gray-900"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                disabled={!password}
              >
                <Text className="text-xl">{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text className="text-red-600 text-xs mt-1 font-medium">{errors.password}</Text>
            )}
          </View>

          {/* Botón */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            className={`mt-7 py-4 rounded-xl items-center justify-center ${loading ? 'bg-blue-400' : 'bg-blue-600 active:bg-blue-700'
              }`}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text className="text-white font-bold text-base">
                Iniciar Sesión
              </Text>
            )}
          </TouchableOpacity>

        </View>

        {/* Link de recuperación */}
        <View className="mt-6 items-center">
          <TouchableOpacity>
            <Text className="text-blue-600 text-sm font-medium">
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="mt-8 pt-6 border-t border-gray-200 items-center">
          <Text className="text-gray-500 text-xs text-center">
            Esta app está diseñada para empleados. Si tienes problemas de acceso, contacta con RRHH.
          </Text>
        </View>

      </View>
    </ScrollView>
  )
}


export default LoginScreen