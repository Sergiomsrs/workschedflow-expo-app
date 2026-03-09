import { schedulesAction } from "@/src/roster/actions/schedules.actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";


export const useSchedules = (id: number, startDate: string, endDate: string) => {
    const queryClient = useQueryClient();

    const monthSchedules = useQuery({
        queryKey: ['schedules', { id, startDate, endDate }],
        queryFn: () => schedulesAction(id, startDate, endDate),
        staleTime: 1000 * 60 * 60 * 24, // 24horas
    });

    // Función integrada para prefetch de meses
    const prefetchMonth = async (prefetchStartDate: string, prefetchEndDate: string) => {
        await queryClient.prefetchQuery({
            queryKey: ['schedules', { id, startDate: prefetchStartDate, endDate: prefetchEndDate }],
            queryFn: () => schedulesAction(id, prefetchStartDate, prefetchEndDate),
            staleTime: 1000 * 60 * 60 * 24,
        });
    };

    return {
        monthSchedules,
        prefetchMonth
    }
}
