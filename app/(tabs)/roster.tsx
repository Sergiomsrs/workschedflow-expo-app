import RosterMonthView from '@/components/roster/RosterMonthView'
import { useSchedules } from '@/hooks/useSchedules'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { processTimeStamps } from '../../utils/timeManagement'


const roster = () => {
    const [isRefreshing, setisRefreshing] = useState(false)
    const [currentDate, setCurrentDate] = useState(new Date())
    const [inputs, setInputs] = useState({
        id: 1,
        startDate: '2026-02-01',
        endDate: '2026-02-28'
    })

    const { monthSchedules, prefetchMonth } = useSchedules(inputs.id, inputs.startDate, inputs.endDate)

    // Función para calcular rango de fechas del mes
    const getMonthDateRange = (date: Date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const startDate = new Date(year, month, 1)
        const endDate = new Date(year, month + 1, 0)
        const formatDate = (d: Date) => d.toISOString().split('T')[0]
        return {
            startDate: formatDate(startDate),
            endDate: formatDate(endDate)
        }
    }

    // Cuando cambia el mes
    const handleMonthChange = (newDate: Date) => {
        setCurrentDate(newDate)
        const { startDate, endDate } = getMonthDateRange(newDate)
        setInputs(prev => ({
            ...prev,
            startDate,
            endDate
        }))

        // Prefetch meses adyacentes
        const prevDate = new Date(newDate.getFullYear(), newDate.getMonth() - 1, 1)
        const { startDate: prevStart, endDate: prevEnd } = getMonthDateRange(prevDate)
        prefetchMonth(prevStart, prevEnd)

        const nextDate = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 1)
        const { startDate: nextStart, endDate: nextEnd } = getMonthDateRange(nextDate)
        prefetchMonth(nextStart, nextEnd)
    }

    // Handle swipe (para prefetch adicional)
    const handleSwipe = (direction: 'left' | 'right') => {
        // Ya se maneja en handleMonthChange
    }

    // Handle refresh
    const handleRefresh = async () => {
        setisRefreshing(true)
        // Simular refresh
        setTimeout(() => setisRefreshing(false), 1000)
    }

    const horarios = monthSchedules.data ? processTimeStamps(monthSchedules.data, 1) : []

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <RosterMonthView
                processedRecords={horarios}
                currentDate={currentDate}
                onMonthChange={handleMonthChange}
                onSwipe={handleSwipe}
                isLoading={monthSchedules.isLoading || isRefreshing}
                onRefresh={handleRefresh}
            />
        </SafeAreaView>
    )
}

export default roster