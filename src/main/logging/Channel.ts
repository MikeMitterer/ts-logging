/**
 * Channel to log to
 * This could be console but could also be a HTTP-Server
 */
export interface Channel {
    warn(timestamp: number, loggerName: string, message: string, obj?: unknown): void;

    info(timestamp: number, loggerName: string, message: string, obj?: unknown): void;

    error(timestamp: number, loggerName: string, message: string, obj?: unknown): void;

    debug(timestamp: number, loggerName: string, message: string, obj?: unknown): void;

    fatal(timestamp: number, loggerName: string, message: string, obj?: unknown): void;
}
