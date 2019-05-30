import { Channel } from './Channel';
import { Logger } from './Logger';
import { LogLevel } from './LogLevel';

export class LoggerImpl implements Logger {
    public level: LogLevel;
    public channel: Channel;

    public readonly name: string;

    constructor(name: string, level: LogLevel, channel: Channel) {
        this.name = name;
        this.level = level;
        this.channel = channel;
    }

    public warn(message: string, obj?: unknown): void {
        if (this.level >= LogLevel.WARN) {
            this.channel.warn(Date.now(), this.name, message, obj);
        }
    }

    public info(message: string, obj?: unknown): void {
        if (this.level >= LogLevel.INFO) {
            this.channel.info(Date.now(), this.name, message, obj);
        }
    }

    public error(message: string, obj?: unknown): void {
        if (this.level >= LogLevel.ERROR) {
            this.channel.error(Date.now(), this.name, message, obj);
        }
    }

    public debug(message: string, obj?: unknown): void {
        if (this.level >= LogLevel.DEBUG) {
            this.channel.debug(Date.now(), this.name, message, obj);
        }
    }

    public fatal(message: string, obj?: unknown): void {
        if (this.level >= LogLevel.FATAL) {
            this.channel.fatal(Date.now(), this.name, message, obj);
        }
    }
}
