import { schedulesApi } from "@/api/schedulesApi";
import { SchedulesResponse } from "../interfaces/schedules.response";

export const schedulesAction = async (id: number, startDate: string, endDate: string) => {
    try {
        const { data } = await schedulesApi.get<SchedulesResponse>(`/schedule/employeeday/${id}/schedules?startDate=${startDate}&endDate=${endDate}`);

        // console.log(JSON.stringify(data, null, 2));
        //const schedules = data.results.map(MovieMapper.fromTheMovieDBToMovie);

        return data;
    } catch (error) {
        console.log(error);
        throw 'Cannot load now playing movies';
    }
};