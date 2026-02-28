import { ProcessedRecord } from '@/infrastructure/interfaces/processed.record.interface'
import { Ionicons } from '@expo/vector-icons'
import React, { useRef, useState } from 'react'
import { Animated, PanResponder, RefreshControl, ScrollView as RNScrollView, Text, TouchableOpacity, View } from 'react-native'
import SchedulesList from './SchedulesList'

interface RosterMonthViewProps {
    processedRecords: ProcessedRecord[]
    currentDate: Date
    onMonthChange: (date: Date) => void
    onSwipe: (direction: 'left' | 'right') => void
    isLoading: boolean
    onRefresh: () => void
}

const RosterMonthView: React.FC<RosterMonthViewProps> = ({
    processedRecords,
    currentDate,
    onMonthChange,
    onSwipe,
    isLoading,
    onRefresh
}) => {
    const [startX, setStartX] = useState(0)
    const fadeAnim = useRef(new Animated.Value(1)).current
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: (evt) => {
                setStartX(evt.nativeEvent.pageX)
            },
            onPanResponderRelease: (evt) => {
                const endX = evt.nativeEvent.pageX
                const diff = startX - endX

                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        // Swipe izquierda → próximo mes
                        goToNextMonth()
                        onSwipe('left')
                    } else {
                        // Swipe derecha → mes anterior
                        goToPreviousMonth()
                        onSwipe('right')
                    }
                }
            }
        })
    ).current

    const monthName = currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
    const isCurrentMonth = new Date().getMonth() === currentDate.getMonth() && new Date().getFullYear() === currentDate.getFullYear()

    const goToPreviousMonth = () => {
        const prevDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
        onMonthChange(prevDate)
        triggerFadeAnimation()
    }

    const goToNextMonth = () => {
        const nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
        onMonthChange(nextDate)
        triggerFadeAnimation()
    }

    const goToCurrentMonth = () => {
        if (!isCurrentMonth) {
            onMonthChange(new Date())
            triggerFadeAnimation()
        }
    }

    const triggerFadeAnimation = () => {
        fadeAnim.setValue(0.5)
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start()
    }

    const handlePanResponderRelease = (endX: number) => {
        const diff = startX - endX
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                // Swipe izquierda → próximo mes
                goToNextMonth()
                onSwipe('left')
            } else {
                // Swipe derecha → mes anterior
                goToPreviousMonth()
                onSwipe('right')
            }
        }
    }

    return (
        <View
            {...panResponder.panHandlers}
            style={{ flex: 1 }}
        >
            <RNScrollView
                scrollEnabled={true}
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
                style={{ flex: 1 }}
            >
                {/* Header con DatePicker integrado */}
                <View className='bg-gradient-to-b from-slate-800 to-slate-900 pt-4 pb-6 px-4'>
                    <View className='flex-row items-center justify-between mb-4'>
                        {/* Botón anterior */}
                        <TouchableOpacity
                            onPress={goToPreviousMonth}
                            className='p-2 rounded-lg active:bg-slate-700'
                        >
                            <Ionicons name="chevron-back" size={28} color="#60a5fa" />
                        </TouchableOpacity>

                        {/* Mes y año - Botón "Hoy" */}
                        <TouchableOpacity
                            onPress={goToCurrentMonth}
                            disabled={isCurrentMonth}
                            className={`flex-1 mx-4 py-2 px-4 rounded-xl ${isCurrentMonth ? 'bg-blue-600' : 'bg-slate-700 active:bg-slate-600'
                                }`}
                        >
                            <Text className='text-white text-center text-base font-semibold capitalize'>
                                {monthName}
                            </Text>
                        </TouchableOpacity>

                        {/* Botón siguiente */}
                        <TouchableOpacity
                            onPress={goToNextMonth}
                            className='p-2 rounded-lg active:bg-slate-700'
                        >
                            <Ionicons name="chevron-forward" size={28} color="#60a5fa" />
                        </TouchableOpacity>
                    </View>

                    {/* Indicador de swipe */}
                    <View className='flex-row items-center justify-center gap-1'>
                        <Ionicons name="hand-left" size={16} color="#94a3b8" />
                        <Text className='text-slate-400 text-xs'>Desliza para cambiar mes</Text>
                        <Ionicons name="hand-right" size={16} color="#94a3b8" />
                    </View>
                </View>

                {/* Contenido con animación */}
                <Animated.View style={{ opacity: fadeAnim }}>
                    <SchedulesList processedRecords={processedRecords} />
                </Animated.View>
            </RNScrollView>
        </View>
    )
}

export default RosterMonthView
