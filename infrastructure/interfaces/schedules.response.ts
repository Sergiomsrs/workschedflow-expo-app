export type ScheduleApiResponse = SchedulesResponse[];

export interface SchedulesResponse {
    date: Date;
    schedules: Schedule[];
}

export interface Schedule {
    id: number;
    timestamp: Date;
    employeeId: number;
}
