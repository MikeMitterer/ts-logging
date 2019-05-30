/* tslint:disable:no-console */
import { Channel } from '../logging/Channel';

// tslint:disable-next-line:no-empty
function noop(timestamp: number, loggerName: string, message: string, obj?: unknown): void {}

export class NoOpLogger implements Channel {
    public debug = noop;
    public info = noop;
    public warn = noop;
    public error = noop;
    public fatal = noop;
}
