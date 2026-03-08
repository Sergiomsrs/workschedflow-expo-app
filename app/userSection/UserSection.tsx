import { useAuthStore } from '@/auth/store/useAuthStore';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const UserSection = () => {

    const { logout, user } = useAuthStore();

    return (

        <ScrollView className="flex-1 bg-white">

            <View className="px-6 pt-8 pb-12">

                {/* Header usuario */}
                <View className="mb-8 items-center">

                    <View className="w-20 h-20 rounded-full bg-blue-100 items-center justify-center mb-4">
                        <Text className="text-3xl">
                            👤
                        </Text>
                    </View>

                    <Text className="text-gray-900 text-2xl font-bold">
                        {user?.name} {user?.lastName}
                    </Text>

                    <Text className="text-gray-500 text-sm mt-1">
                        {user?.role}
                    </Text>

                </View>

                {/* Información personal */}
                <View className="mb-8 bg-gray-50 border border-gray-200 rounded-2xl p-4">

                    <Text className="text-gray-900 font-semibold mb-4">
                        Información de la cuenta
                    </Text>

                    <View className="space-y-3">

                        <View className="flex-row justify-between">
                            <Text className="text-gray-600">Nombre</Text>
                            <Text className="text-gray-900 font-medium">{user?.name}</Text>
                        </View>

                        <View className="flex-row justify-between">
                            <Text className="text-gray-600">Apellido</Text>
                            <Text className="text-gray-900 font-medium">{user?.lastName}</Text>
                        </View>

                        <View className="flex-row justify-between">
                            <Text className="text-gray-600">Rol</Text>
                            <Text className="text-gray-900 font-medium">{user?.role}</Text>
                        </View>

                    </View>

                </View>

                {/* Acciones rápidas */}
                <View className="mb-8 bg-blue-50 border border-blue-100 rounded-2xl p-4">

                    <Text className="text-gray-900 font-semibold mb-4">
                        Accesos rápidos
                    </Text>

                    <View className="space-y-4">

                        <TouchableOpacity className="flex-row items-center">
                            <Text className="text-2xl mr-3">📅</Text>
                            <View>
                                <Text className="text-gray-900 font-semibold text-sm">
                                    Ver mis cuadrantes
                                </Text>
                                <Text className="text-gray-600 text-xs">
                                    Consulta tus turnos programados
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity className="flex-row items-center">
                            <Text className="text-2xl mr-3">⏱️</Text>
                            <View>
                                <Text className="text-gray-900 font-semibold text-sm">
                                    Fichar jornada
                                </Text>
                                <Text className="text-gray-600 text-xs">
                                    Registra tu entrada o salida
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity className="flex-row items-center">
                            <Text className="text-2xl mr-3">⚠️</Text>
                            <View>
                                <Text className="text-gray-900 font-semibold text-sm">
                                    Reportar incidencia
                                </Text>
                                <Text className="text-gray-600 text-xs">
                                    Comunica ausencias o problemas
                                </Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                </View>

                {/* Próximamente / sección futura */}
                <View className="mb-8 bg-yellow-50 border border-yellow-200 rounded-2xl p-4">

                    <Text className="text-gray-900 font-semibold mb-2">
                        Próximamente
                    </Text>

                    <Text className="text-gray-600 text-sm">
                        Aquí podrás consultar estadísticas de jornada, histórico de fichajes y gestionar tus incidencias.
                    </Text>

                </View>

                {/* Logout */}
                <TouchableOpacity
                    onPress={logout}
                    className="bg-red-500 rounded-xl py-4 items-center active:bg-red-600"
                >
                    <Text className="text-white font-bold">
                        Cerrar sesión
                    </Text>
                </TouchableOpacity>

            </View>

        </ScrollView>
    );
};

export default UserSection;