export interface DateStructure {
    year: string;
    month: string;
    day: string;
    hour: string;
    minute: string;
    second: string;
    ms: string;
}

export function toDateAndTime(timestamp: number): string {
    const date = asDateStructure(timestamp).withLeadingZeros;
    return `${date.year}-${date.month}-${date.day} ${date.hour}:${date.minute}:${date.second}.${date.ms}`;
}

export function toTime(timestamp: number): string {
    const date = asDateStructure(timestamp).withLeadingZeros;
    return `${date.hour}:${date.minute}:${date.second}.${date.ms}`;
}

export function asDateStructure(
    timestamp: number,
): { withLeadingZeros: DateStructure; simple: DateStructure } {
    const date = new Date(timestamp);
    const leadingZero = (value: number): string => {
        if (value <= 9) {
            return `0${value}`;
        }
        return `${value}`;
    };

    return {
        withLeadingZeros: {
            year: leadingZero(date.getFullYear()),
            month: leadingZero(date.getMonth() + 1),
            day: leadingZero(date.getDate()),
            hour: leadingZero(date.getHours()),
            minute: leadingZero(date.getMinutes()),
            second: leadingZero(date.getSeconds()),
            ms: leadingZero(date.getMilliseconds()),
        },
        simple: {
            year: date.getFullYear().toString(),
            month: (date.getMonth() + 1).toString(),
            day: date.getDate().toString(),
            hour: date.getHours().toString(),
            minute: date.getMinutes().toString(),
            second: date.getSeconds().toString(),
            ms: date.getMilliseconds().toString(),
        },
    };
}
