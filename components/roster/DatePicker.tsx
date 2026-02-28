import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

interface DatePickerProps {
    onDateChange: (startDate: string, endDate: string) => void
    onPrefetchMonth?: (startDate: string, endDate: string) => void
    initialDate?: Date
}

const DatePicker: React.FC<DatePickerProps> = ({ onDateChange, onPrefetchMonth, initialDate = new Date() }) => {
    const [currentDate, setCurrentDate] = useState(initialDate)

    // Obtener el primer y último día del mes
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

    // Cuando cambia la fecha, actualizar el padre y precargar meses adyacentes
    useEffect(() => {
        const { startDate, endDate } = getMonthDateRange(currentDate)
        onDateChange(startDate, endDate)

        // Prefetch mes anterior
        const prevDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
        const { startDate: prevStart, endDate: prevEnd } = getMonthDateRange(prevDate)
        onPrefetchMonth?.(prevStart, prevEnd)

        // Prefetch mes siguiente
        const nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
        const { startDate: nextStart, endDate: nextEnd } = getMonthDateRange(nextDate)
        onPrefetchMonth?.(nextStart, nextEnd)
    }, [currentDate])

    const goToPreviousMonth = () => {
        const prevDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
        const { startDate, endDate } = getMonthDateRange(prevDate)
        onPrefetchMonth?.(startDate, endDate)

        // Prefetch el mes aún más anterior
        const twoMonthsBeforeDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, 1)
        const twoMonthsBefore = getMonthDateRange(twoMonthsBeforeDate)
        onPrefetchMonth?.(twoMonthsBefore.startDate, twoMonthsBefore.endDate)

        setCurrentDate(prevDate)
    }

    const goToNextMonth = () => {
        const nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
        const { startDate, endDate } = getMonthDateRange(nextDate)
        onPrefetchMonth?.(startDate, endDate)

        // Prefetch el mes aún más adelante
        const twoMonthsAheadDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 1)
        const twoMonthsAhead = getMonthDateRange(twoMonthsAheadDate)
        onPrefetchMonth?.(twoMonthsAhead.startDate, twoMonthsAhead.endDate)

        setCurrentDate(nextDate)
    }

    const goToCurrentMonth = () => {
        setCurrentDate(new Date())
    }

    const monthName = currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
    const isCurrentMonth = new Date().getMonth() === currentDate.getMonth() && new Date().getFullYear() === currentDate.getFullYear()

    return (
        <View className='bg-slate-900 border-b border-slate-700 px-4 py-4'>
            <View className='flex-row items-center justify-between'>
                {/* Botón anterior */}
                <TouchableOpacity
                    onPress={goToPreviousMonth}
                    className='p-2 rounded-lg active:bg-slate-700'
                >
                    <Ionicons name="chevron-back" size={28} color="#60a5fa" />
                </TouchableOpacity>

                {/* Mes y año */}
                <TouchableOpacity
                    onPress={goToCurrentMonth}
                    disabled={isCurrentMonth}
                    className={`flex-1 mx-4 py-3 px-4 rounded-lg ${isCurrentMonth ? 'bg-blue-600' : 'bg-slate-700 active:bg-slate-600'
                        }`}
                >
                    <Text className='text-white text-center text-lg font-semibold capitalize'>
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
        </View>
    )
}

export default DatePicker