import SchedulesList from '@/components/roster/SchedulesList'
import { timestampSchedulesMock } from '@/data/mocks/schedules'
import React from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { processTimeStamps } from '../../utils/timeManagement'


const roster = () => {




    const horarios = processTimeStamps(timestampSchedulesMock, 1);


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <SchedulesList processedRecords={horarios} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default roster