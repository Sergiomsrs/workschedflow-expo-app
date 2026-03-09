import { ProcessedRecord } from '@/src/roster/interfaces/processed.record.interface'
import { Ionicons } from '@expo/vector-icons'
import React, { useRef, useState } from 'react'
import { Animated, Dimensions, RefreshControl, ScrollView as RNScrollView, Text, TouchableOpacity, View } from 'react-native'
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
    const screenWidth = Dimensions.get('window').width
    const [startX, setStartX] = useState(0)
    const fadeAnim = useRef(new Animated.Value(1)).current
    const scaleAnim = useRef(new Animated.Value(1)).current

    const monthName = currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
    const yearNumber = currentDate.getFullYear()
    const monthNumber = currentDate.getMonth()
    const isCurrentMonth = new Date().getMonth() === monthNumber && new Date().getFullYear() === yearNumber
    const canGoNext = !isCurrentMonth || monthNumber < new Date().getMonth() || yearNumber < new Date().getFullYear()

    const goToPreviousMonth = () => {
        const prevDate = new Date(yearNumber, monthNumber - 1, 1)
        onMonthChange(prevDate)
        triggerTransitionAnimation()
        onSwipe('right')
    }

    const goToNextMonth = () => {
        const nextDate = new Date(yearNumber, monthNumber + 1, 1)
        onMonthChange(nextDate)
        triggerTransitionAnimation()
        onSwipe('left')
    }

    const goToCurrentMonth = () => {
        if (!isCurrentMonth) {
            onMonthChange(new Date())
            triggerTransitionAnimation()
        }
    }

    const triggerTransitionAnimation = () => {
        scaleAnim.setValue(0.95)
        fadeAnim.setValue(0.6)
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true,
            })
        ]).start()
    }

    const handleTouchStart = (e: any) => {
        setStartX(e.nativeEvent.pageX)
    }

    const handleTouchEnd = (e: any) => {
        const endX = e.nativeEvent.pageX
        const diff = startX - endX

        if (Math.abs(diff) > screenWidth * 0.15) {
            if (diff > 0 && canGoNext) {
                goToNextMonth()
            } else if (diff < 0) {
                goToPreviousMonth()
            }
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <RNScrollView
                scrollEnabled={true}
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
                style={{ flex: 1 }}
            >
                {/* Header mejorado */}
                <View className='bg-gradient-to-b from-slate-800 to-slate-700 px-4 shadow-lg'>

                    {/* Navegación de meses */}
                    <View
                        className='flex-row items-center justify-between gap-3'
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        {/* Botón anterior */}
                        <TouchableOpacity
                            onPress={goToPreviousMonth}
                            activeOpacity={0.7}
                            className='p-2 rounded-full bg-slate-600/50 active:bg-slate-600'
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <Ionicons name="chevron-back" size={24} color="#93c5fd" />
                        </TouchableOpacity>

                        {/* Mes - Centro */}
                        <TouchableOpacity
                            onPress={goToCurrentMonth}
                            disabled={isCurrentMonth}
                            activeOpacity={0.7}
                            className={`flex-1 py-3 px-4 rounded-2xl ${isCurrentMonth
                                ? 'bg-indigo-600/40 active:bg-slate-600/60'
                                : 'bg-slate-600/40 active:bg-slate-600/60'
                                }`}
                            hitSlop={{ top: 8, bottom: 8, left: 0, right: 0 }}
                        >
                            <Text className='text-white text-center text-lg font-bold capitalize'>
                                {monthName}
                            </Text>
                            <Text className='text-white text-center text-lg font-bold capitalize'>
                                {!isCurrentMonth ?
                                    <Text className='text-blue-200 text-center text-xs mt-1 font-medium'>
                                        Toca para hoy
                                    </Text> : <Text className='text-blue-200 text-center text-xs mt-1 font-medium' > Mes Actual </Text>}
                            </Text>

                        </TouchableOpacity>

                        {/* Botón siguiente */}
                        <TouchableOpacity
                            onPress={goToNextMonth}
                            activeOpacity={0.7}
                            className='p-2 rounded-full bg-slate-600/50 active:bg-slate-600'
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <Ionicons
                                name="chevron-forward"
                                size={24}
                                color="#93c5fd"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Contenido con animación */}
                <Animated.View style={{
                    opacity: fadeAnim,
                    transform: [{ scale: scaleAnim }]
                }}>
                    <SchedulesList processedRecords={processedRecords} />
                </Animated.View>
            </RNScrollView>
        </View>
    )
}

export default RosterMonthView
