import { SchedulesResponse } from "@/infrastructure/interfaces/schedules.response";

export const processTimeStamps = (dailySchedules: SchedulesResponse, id: any): any[] => {
    if (!Array.isArray(dailySchedules)) return [];
    return dailySchedules.map((dayData: any) => {
        const day = new Date(dayData.date).toLocaleDateString('es-ES');
        // Asegura que schedules es un array
        const times = Array.isArray(dayData.schedules)
            ? dayData.schedules.map((stamp: any) => ({
                timestamp: new Date(stamp.timestamp),
                isMod: stamp.isMod
            }))
            : [];

        // Si no hay registros → Día libre
        if (times.length === 0) {
            return {
                id,
                data: {
                    day,
                    periods: [],
                    totalWorked: "00:00",
                    recordsCount: 0,
                    isDayOff: true,
                    warning: null
                }
            };
        }

        // Ordenar cronológicamente
        times.sort((a: any, b: any) => a.timestamp - b.timestamp);

        let totalWorkedMs = 0;
        const periods: any[] = [];
        let warning = null;

        for (let i = 0; i < times.length; i += 2) {
            const entry = times[i];
            let exit: any, periodMs: number;

            if (i + 1 < times.length) {
                exit = times[i + 1];
                periodMs = exit.timestamp - entry.timestamp;
                totalWorkedMs += periodMs;
            } else {
                exit = null;
                periodMs = 0;
                warning = "⚠ Pendiente de revisión";
            }

            periods.push({
                entry: entry.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
                entryIsMod: entry.isMod,

                exit: exit?.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
                exitIsMod: exit?.isMod,

                durationMs: periodMs,
                isComplete: exit !== null
            });
        }

        const totalWorked = formatMillisecondsToTime(totalWorkedMs);

        return {
            id,
            data: {
                day,
                periods,
                totalWorked,
                recordsCount: times.length,
                isDayOff: false,
                warning
            }
        };
    });
};

export const formatMillisecondsToTime = (ms: number, emptySymbol: string = "--"): string => {
    if (ms <= 0) return emptySymbol;

    const totalHours = Math.floor(ms / 3600000);
    const totalMinutes = Math.floor((ms % 3600000) / 60000);

    return `${totalHours}h ${totalMinutes}m`;
};

export const getDayOfWeek = (dateString: string): string => {
    const [day, month, year] = dateString.split("/");
    const date = new Date(`${year}-${month}-${day}`);
    const weekday = date.toLocaleDateString("es-ES", { weekday: "long" });
    return weekday.charAt(0).toUpperCase() + weekday.slice(1);
};