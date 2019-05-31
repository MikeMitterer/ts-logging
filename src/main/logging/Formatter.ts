import * as TimeStamp from '../utils/TimeStamp';
import { LogLevel } from './LogLevel';

// prettier-ignore
export type MessageFormatter = (level: LogLevel, timestamp: number, loggerName: string, message: string) => string;
export type OptionalFormatter = (obj: unknown) => string | unknown;

export interface Formatter {
    format: MessageFormatter;
    optional: OptionalFormatter;
}

/**
 * Defines a basic output-Format
 *
 * @param minMessageLength Defines the minimum length of the message
 * @param maxNameLength Defines the maximal output length of logger name
 */
// prettier-ignore
export const defaultFormatter = (minMessageLength: number = 50, maxNameLength: number = 30): Formatter => {

    return {
        format: (level: LogLevel, timestamp: number, loggerName: string, message: string): string => {

            const formattedTimeStamp = TimeStamp.toTime(timestamp);

            return `${formattedTimeStamp} [${LogLevel[level]}] ` +
                `${padMessage(message, minMessageLength)}` +
                ` | ${truncateLoggerName(loggerName, maxNameLength)}`;
        },

        optional: toJson,
    };
};

export const jsonFormatter: Formatter = {
    format: (level: LogLevel, timestamp: number, loggerName: string, message: string): string => {
        return JSON.stringify({
            level,
            timestamp: TimeStamp.toTime(timestamp),
            name: loggerName,
            message,
        });
    },

    optional: toJson,
};

export const padMessage = (message: string, length: number): string => {
    // if (message.length > length) {
    //     return `${message.substr(0, length - 3)}...`;
    // }
    return message.padEnd(length);
};

export const truncateLoggerName = (loggerName: string, length: number): string => {
    const reverse = (value: string): string =>
        value
            .split('')
            .reverse()
            .join('');

    if (loggerName.length > length) {
        let temp = reverse(loggerName);
        temp = temp.substr(0, length + 3);
        return `...${reverse(temp)}`;
    }
    return loggerName.padEnd(length);
};

export function toJson(obj: unknown, spaces: number = 4): string | unknown {
    if (obj) {
        return `\n${JSON.stringify(JSON.parse(JSON.stringify(obj)), undefined, spaces)}`;
    }
    return obj;
}
