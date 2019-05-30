/* tslint:disable:no-console */
import { Channel } from '../logging/Channel';
import { defaultFormatter, Formatter, MessageFormatter, OptionalFormatter } from '../logging/Formatter';
import { LogLevel } from '../logging/LogLevel';

export class ConsoleLogger implements Channel {
    private readonly fmt: MessageFormatter;
    private readonly fmtOptional: OptionalFormatter;

    constructor({ formatter = defaultFormatter() }: { formatter?: Formatter } = {}) {
        this.fmt = formatter.format;
        this.fmtOptional = formatter.optional;
    }

    public debug(timestamp: number, loggerName: string, message: string, obj?: unknown): void {
        if (obj) {
            console.debug(this.fmt(LogLevel.DEBUG, timestamp, loggerName, message), this.fmtOptional(obj));
        } else {
            console.debug(this.fmt(LogLevel.DEBUG, timestamp, loggerName, message));
        }
    }

    public info(timestamp: number, loggerName: string, message: string, obj?: unknown): void {
        if (obj) {
            console.info(this.fmt(LogLevel.INFO, timestamp, loggerName, message), this.fmtOptional(obj));
        } else {
            console.info(this.fmt(LogLevel.INFO, timestamp, loggerName, message));
        }
    }

    public warn(timestamp: number, loggerName: string, message: string, obj?: unknown): void {
        if (obj) {
            console.warn(this.fmt(LogLevel.WARN, timestamp, loggerName, message), this.fmtOptional(obj));
        } else {
            console.warn(this.fmt(LogLevel.WARN, timestamp, loggerName, message));
        }
    }

    public error(timestamp: number, loggerName: string, message: string, obj?: unknown): void {
        if (obj) {
            console.error(this.fmt(LogLevel.ERROR, timestamp, loggerName, message), this.fmtOptional(obj));
        } else {
            console.error(this.fmt(LogLevel.ERROR, timestamp, loggerName, message));
        }
    }

    public fatal(timestamp: number, loggerName: string, message: string, obj?: unknown): void {
        if (obj) {
            console.error(this.fmt(LogLevel.FATAL, timestamp, loggerName, message), this.fmtOptional(obj));
        } else {
            console.error(this.fmt(LogLevel.FATAL, timestamp, loggerName, message));
        }
    }
}
