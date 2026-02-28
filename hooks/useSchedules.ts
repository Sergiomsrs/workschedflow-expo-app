import { schedulesAction } from "@/infrastructure/actions/schedules.actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";






export const useSchedules = (id: number, startDate: string, endDate: string) => {

    const monthSchedules = useQuery({
        queryKey: ['schedules', { id, startDate, endDate }],
        queryFn: () => schedulesAction(id, startDate, endDate),
        staleTime: 1000 * 60 * 60 * 24, // 24horas
    });




    return {
        monthSchedules
    }
}

// Hook para precargar meses anteriores y siguientes
export const usePrefetchSchedules = (id: number) => {
    const queryClient = useQueryClient();

    const prefetchMonth = async (startDate: string, endDate: string) => {
        await queryClient.prefetchQuery({
            queryKey: ['schedules', { id, startDate, endDate }],
            queryFn: () => schedulesAction(id, startDate, endDate),
            staleTime: 1000 * 60 * 60 * 24,
        });
    };

    return { prefetchMonth };
};
