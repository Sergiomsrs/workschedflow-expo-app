import { ProcessedRecord } from '@/infrastructure/interfaces/processed.record.interface';
import React from 'react';
import { Text, View } from 'react-native';

interface Props {
    processedRecords: ProcessedRecord[];
}

const SchedulesList = ({ processedRecords }: Props) => {
    const getDayInfo = (dateString: string) => {
        const [day, month, year] = dateString.split("/");
        const date = new Date(`${year}-${month}-${day}`);
        const weekday = date.toLocaleDateString("es-ES", { weekday: "short" });
        return {
            dayNum: day,
            weekday: weekday.toUpperCase().replace('.', ''),
        };
    };

    if (processedRecords.length === 0) {
        return (
            <View className="flex-1 items-center justify-center py-12 px-4">
                <Text className="text-slate-400 text-center text-base">
                    No hay horarios disponibles para este mes
                </Text>
            </View>
        );
    }

    return (
        <View className="px-3 py-4">
            <View className="space-y-2">
                {processedRecords.map((record, index) => {
                    const { dayNum, weekday } = getDayInfo(record.data.day);
                    const isDayOff = record.data.isDayOff;

                    return (
                        <View key={record.data.day} className="flex-row items-start">
                            {/* Columna de Fecha */}
                            <View className="w-14 items-center pt-3">
                                <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{weekday}</Text>
                                <Text className="text-slate-800 text-lg font-black mt-0.5">{dayNum}</Text>
                            </View>

                            {/* Contenedor de Horarios */}
                            <View
                                className={`flex-1 ml-3 p-3 rounded-xl border ${isDayOff
                                        ? 'bg-slate-50 border-slate-200'
                                        : 'bg-white border-slate-200 shadow-sm'
                                    }`}
                                style={!isDayOff ? { elevation: 1 } : {}}
                            >
                                {isDayOff ? (
                                    <View className="flex-row items-center py-1">
                                        <Text className="text-slate-500 font-medium text-sm">Día libre</Text>
                                        <Text className="ml-2 text-lg">🌴</Text>
                                    </View>
                                ) : (
                                    <View className="flex-row justify-between items-start gap-2">
                                        <View className="flex-1">
                                            {record.data.periods.map((period, i) => (
                                                <View key={i} className="flex-row items-center mb-2 last:mb-0">
                                                    <View className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2 mt-0.5" />
                                                    <Text className="text-slate-700 font-semibold text-xs">
                                                        {period.entry} {period.exit && `→ ${period.exit}`}
                                                    </Text>
                                                </View>
                                            ))}
                                            {record.data.warning && (
                                                <Text className="text-orange-600 text-xs font-semibold mt-2">
                                                    {record.data.warning}
                                                </Text>
                                            )}
                                        </View>

                                        {/* Badge de Total */}
                                        <View className="bg-indigo-50 px-2 py-1.5 rounded-lg items-center border border-indigo-200 min-w-[48px]">
                                            <Text className="text-indigo-700 font-black text-xs">
                                                {record.data.totalWorked}
                                            </Text>
                                            <Text className="text-indigo-600 text-[9px] font-bold leading-none">h</Text>
                                        </View>
                                    </View>
                                )}
                            </View>
                        </View>
                    );
                })}
            </View>
            <View className="h-6" />
        </View>
    );
};

export default SchedulesList;