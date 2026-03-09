export interface Period {
    entry: string;
    entryIsMod: boolean;
    exit?: string;
    exitIsMod?: boolean;
    durationMs: number;
    isComplete: boolean;
}

export interface RecordData {
    day: string;
    periods: Period[];
    totalWorked: string;
    recordsCount: number;
    isDayOff: boolean;
    warning?: string;
}

export interface ProcessedRecord {
    id: number;
    data: RecordData;
}

// 1. Definimos la unidad individual (el registro de entrada/salida)
export interface ScheduleEntry {
    id: number;
    timestamp: string; // Formato ISO: "YYYY-MM-DDTHH:mm:ss"
    employeeId: number;
}

// 2. Definimos el objeto que agrupa la fecha con sus registros
export interface DailySchedules {
    date: string;      // Formato: "YYYY-MM-DD"
    schedules: ScheduleEntry[];
}

// 3. El tipo para tu Mock es un array de estos objetos
export type TimestampSchedules = DailySchedules[];