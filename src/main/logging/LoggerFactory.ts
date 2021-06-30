import { ConsoleLogger } from '../channels/ConsoleLogger';
import { NoOpLogger } from '../channels/NoOpLogger';
import { Channel } from './Channel';
import { Logger } from './Logger';
import { LoggerImpl } from './LoggerImpl';
import { LogLevel } from './LogLevel';

export const noop: Channel = new NoOpLogger();
const defaultChannel: Channel = new ConsoleLogger();

/**
 * Creates and holds all the loggers
 */
export class LoggerFactory {
    public static defaultLevel = LogLevel.INFO;

    public static readonly loggers: LoggerImpl[] = [];

    public static getLogger(loggerName: string): Logger {
        let found = this.loggers.find((logger): boolean => logger.name === loggerName);
        if (!found) {
            found = instanciateLogger(loggerName, LoggerFactory.defaultLevel, defaultChannel);
        }
        return found;
    }

    public static for(loggerName: string): LoggerFactorySyntax {
        return new LoggerFactorySyntax(loggerName);
    }
}

const instanciateLogger = (loggerName: string, level: LogLevel, channel: Channel): LoggerImpl => {
    const logger = new LoggerImpl(loggerName, level, channel);

    LoggerFactory.loggers.push(logger);
    return logger;
};

export class LoggerFactorySyntax {
    private readonly loggerName: string;

    private channel: Channel | undefined;

    private _level: LogLevel | undefined;

    public constructor(loggerName: string) {
        this.loggerName = loggerName;
    }

    public get(): Logger {
        const found = LoggerFactory.loggers.find((logger): boolean => logger.name === this.loggerName);

        if (!found) {
            const level = this._level ? this._level : LoggerFactory.defaultLevel;
            const channel = this.channel ? this.channel : defaultChannel;

            return instanciateLogger(this.loggerName, level, channel);
        }

        if (this._level) {
            found.level = this._level;
        }
        if (this.channel) {
            found.channel = this.channel;
        }
        return found;
    }

    public on(channel: Channel): this {
        this.channel = channel;
        return this;
    }

    public level(level: LogLevel): this {
        this._level = level;
        return this;
    }
}
