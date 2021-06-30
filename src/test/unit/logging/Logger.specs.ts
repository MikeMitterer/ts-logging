import 'jest-extended';
import { LoggerFactory, noop } from '../../../main/logging/LoggerFactory';
import { LogLevel } from '../../../main/logging/LogLevel';

describe('Logger', (): void => {
    beforeEach((): void => {
        // Mock the console object
        // @ts-ignore
        global.console = {
            debug: jest.fn(),
            info: jest.fn(),
            warn: jest.fn(),
            error: jest.fn(),
        };
        LoggerFactory.loggers.length = 0;
        LoggerFactory.defaultLevel = LogLevel.INFO;
    });

    test('Log something', (): void => {
        const logger = LoggerFactory.for('test.Logger')
            .level(LogLevel.INFO)
            .get();

        logger.debug('Test - Debug');
        logger.info('Test - Info', { name: 'Mike Mitterer' });
        logger.warn('Test - Warn', 'Mike');
        logger.error('Test - Error');

        expect(global.console.debug).toHaveBeenCalledTimes(0);
        expect(global.console.info).toHaveBeenCalledTimes(1);
        expect(global.console.warn).toHaveBeenCalledTimes(1);
        expect(global.console.error).toHaveBeenCalledTimes(1);

        expect(LoggerFactory.loggers.length).toBe(1);
    });

    test('Add two Loggers with the same name', (): void => {
        const logger1 = LoggerFactory.getLogger('test.Logger');
        const logger2 = LoggerFactory.getLogger('test.Logger');
        const logger3 = LoggerFactory.getLogger('test.Logger.other');

        expect(LoggerFactory.loggers.length).toBe(2);
    });

    test('Message', (): void => {
        const logger = LoggerFactory.for('test.Logger')
            .level(LogLevel.DEBUG)
            .get();

        // @ts-ignore
        global.console.debug.mockImplementation((message): void => expect(message).toContain('[DEBUG] Servus'));

        logger.debug('Servus');
    });

    test('NoOp-Logger', (): void => {
        const logger = LoggerFactory.for('test.Logger')
            .on(noop)
            .level(LogLevel.INFO)
            .get();

        logger.debug('Test - Debug');
        logger.info('Test - Info', { name: 'Mike Mitterer' });
        logger.warn('Test - Warn', 'Mike');
        logger.error('Test - Error');

        expect(global.console.debug).toHaveBeenCalledTimes(0);
        expect(global.console.info).toHaveBeenCalledTimes(0);
        expect(global.console.warn).toHaveBeenCalledTimes(0);
        expect(global.console.error).toHaveBeenCalledTimes(0);
    });

    test('Global Log-Level ist by default INFO', (): void => {
        const logger = LoggerFactory.getLogger('test.Logger');

        logger.debug('Test - Debug');
        logger.info('Test - Info', { name: 'Mike Mitterer' });
        logger.warn('Test - Warn', 'Mike');
        logger.error('Test - Error');

        expect(global.console.debug).toHaveBeenCalledTimes(0);
        expect(global.console.info).toHaveBeenCalledTimes(1);
        expect(global.console.warn).toHaveBeenCalledTimes(1);
        expect(global.console.error).toHaveBeenCalledTimes(1);
    });

    test('Change Global Log-Level to INFO', (): void => {
        LoggerFactory.defaultLevel = LogLevel.INFO;
        const logger = LoggerFactory.getLogger('test.Logger');

        logger.debug('Test - Debug');
        logger.info('Test - Info', { name: 'Mike Mitterer' });
        logger.warn('Test - Warn', 'Mike');
        logger.error('Test - Error');

        expect(global.console.debug).toHaveBeenCalledTimes(0);
        expect(global.console.info).toHaveBeenCalledTimes(1);
        expect(global.console.warn).toHaveBeenCalledTimes(1);
        expect(global.console.error).toHaveBeenCalledTimes(1);
    });

    test('Change Log-Level on Logger', (): void => {
        const logger = LoggerFactory.for('test.Logger')
            .level(LogLevel.DEBUG)
            .get();

        logger.debug('Test - Debug');
        logger.info('Test - Info', { name: 'Mike Mitterer' });
        logger.warn('Test - Warn', 'Mike');
        logger.error('Test - Error');

        expect(global.console.debug).toHaveBeenCalledTimes(1);
        expect(global.console.info).toHaveBeenCalledTimes(1);
        expect(global.console.warn).toHaveBeenCalledTimes(1);
        expect(global.console.error).toHaveBeenCalledTimes(1);
    });
});
