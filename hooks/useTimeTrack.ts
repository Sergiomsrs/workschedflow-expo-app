
import { timeTrackApi } from "@/api/timetrack"
import { FicharPayload } from "@/infrastructure/interfaces/ficharPayload.interfaces"
import { useMutation } from "@tanstack/react-query"

export const useTimeTrack = () => {

    const addTimetrack = useMutation({
        mutationFn: async (payload: FicharPayload) => {
            const { data } = await timeTrackApi.post('/timestamp/fichar', payload)
            return data
        },
        onSuccess: (data) => {
            console.log("Fichaje correcto:", data)
        },
        onError: (error: any) => {
            console.log("Error:", error?.response?.data || error.message)
        }
    })



    return {
        addTimetrack
    }
}
