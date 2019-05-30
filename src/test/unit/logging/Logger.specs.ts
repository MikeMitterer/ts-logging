import 'jest-extended';
import { LoggerFactory, noop } from '../../../main/logging/LoggerFactory';
import { LogLevel } from '../../../main/logging/LogLevel';

describe('Logger', () => {
    beforeEach(() => {
        // Mock the console object
        // @ts-ignore
        global.console = {
            debug: jest.fn(),
            info: jest.fn(),
            warn: jest.fn(),
            error: jest.fn(),
        };
        LoggerFactory.loggers.length = 0;
        LoggerFactory.defaultLevel = LogLevel.WARN;
    });

    test('Log something', () => {
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

    test('Add two Loggers with the same name', () => {
        const logger1 = LoggerFactory.get('test.Logger');
        const logger2 = LoggerFactory.get('test.Logger');
        const logger3 = LoggerFactory.get('test.Logger.other');

        expect(LoggerFactory.loggers.length).toBe(2);
    });

    test('Message', () => {
        const logger = LoggerFactory.for('test.Logger')
            .level(LogLevel.DEBUG)
            .get();

        // @ts-ignore
        global.console.debug.mockImplementation((message) => expect(message).toContain('[DEBUG] Servus'));

        logger.debug('Servus');
    });

    test('NoOp-Logger', () => {
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

    test('Global Log-Level ist by default WARN', () => {
        const logger = LoggerFactory.get('test.Logger');

        logger.debug('Test - Debug');
        logger.info('Test - Info', { name: 'Mike Mitterer' });
        logger.warn('Test - Warn', 'Mike');
        logger.error('Test - Error');

        expect(global.console.debug).toHaveBeenCalledTimes(0);
        expect(global.console.info).toHaveBeenCalledTimes(0);
        expect(global.console.warn).toHaveBeenCalledTimes(1);
        expect(global.console.error).toHaveBeenCalledTimes(1);
    });

    test('Change Global Log-Level to INFO', () => {
        LoggerFactory.defaultLevel = LogLevel.INFO;
        const logger = LoggerFactory.get('test.Logger');

        logger.debug('Test - Debug');
        logger.info('Test - Info', { name: 'Mike Mitterer' });
        logger.warn('Test - Warn', 'Mike');
        logger.error('Test - Error');

        expect(global.console.debug).toHaveBeenCalledTimes(0);
        expect(global.console.info).toHaveBeenCalledTimes(1);
        expect(global.console.warn).toHaveBeenCalledTimes(1);
        expect(global.console.error).toHaveBeenCalledTimes(1);
    });

    test('Change Log-Level on Logger', () => {
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
