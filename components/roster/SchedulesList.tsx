import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { ProcessedRecord } from '@/infrastructure/interfaces/processed.record.interface';
import { formatMillisecondsToTime } from '@/utils/timeManagement';

interface Props {
    processedRecords: ProcessedRecord[];
}

const SchedulesList = ({ processedRecords }: Props) => {
    const getDayInfo = (dateString: string) => {
        const [day, month, year] = dateString.split("/");
        const date = new Date(`${year}-${month}-${day}`);
        const weekday = date.toLocaleDateString("es-ES", { weekday: "short" }); // "lun", "mar"
        return {
            dayNum: day,
            weekday: weekday.toUpperCase().replace('.', ''),
        };
    };

    return (
        <ScrollView className="flex-1 bg-white">
            {/* Header con estilo de tu web */}
            <View className="px-6 pt-6 pb-2">
                <Text className="text-[#3F4191] text-2xl font-bold">Planificación</Text>
                <View className="h-1 w-12 bg-[#6366F1] mt-1 rounded-full" />
            </View>

            <View className="p-4">
                {processedRecords.map((record, index) => {
                    const { dayNum, weekday } = getDayInfo(record.data.day);
                    const isDayOff = record.data.isDayOff;

                    return (
                        <View key={record.data.day} className="flex-row mb-1">
                            {/* Columna de Fecha (Indicador lateral) */}
                            <View className="w-16 items-center justify-start py-2">
                                <Text className="text-gray-400 text-[10px] font-extrabold uppercase">{weekday}</Text>
                                <Text className="text-slate-800 text-lg font-black">{dayNum}</Text>
                                {/* Línea conectora visual para dar continuidad */}
                                <View className="w-[1px] flex-1 bg-gray-100 my-1" />
                            </View>

                            {/* Contenedor de Horarios (Cuerpo) */}
                            <View
                                className={`flex-1 ml-2 mb-4 p-4 rounded-2xl border ${isDayOff ? 'bg-gray-50 border-gray-100' : 'bg-white border-slate-100 shadow-sm'
                                    }`}
                                style={!isDayOff ? { elevation: 1 } : {}}
                            >
                                {isDayOff ? (
                                    <View className="flex-row items-center">
                                        <Text className="text-gray-400 font-medium italic text-sm">Día de descanso</Text>
                                        <Text className="ml-2 opacity-60">🌴</Text>
                                    </View>
                                ) : (
                                    <View className="flex-row justify-between items-center">
                                        <View className="flex-1">
                                            {record.data.periods.map((period, i) => (
                                                <View key={i} className="flex-row items-center mb-1">
                                                    <View className="w-2 h-2 rounded-full bg-[#6366F1] mr-3" />
                                                    <Text className="text-slate-700 font-bold text-sm">
                                                        {period.entry} — {period.exit || '...'}
                                                    </Text>
                                                </View>
                                            ))}
                                        </View>

                                        {/* Badge lateral de Total */}
                                        <View className="bg-[#EEF2FF] px-3 py-2 rounded-xl items-center border border-[#E0E7FF]">
                                            <Text className="text-[#6366F1] font-black text-xs">
                                                {record.data.totalWorked}
                                            </Text>
                                            <Text className="text-[#6366F1] text-[8px] font-bold uppercase">Total</Text>
                                        </View>
                                    </View>
                                )}
                            </View>
                        </View>
                    );
                })}
            </View>
            <View className="h-10" />
        </ScrollView>
    );
};

export default SchedulesList;