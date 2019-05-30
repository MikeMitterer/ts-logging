# Minimal TS Logging framework 
> [Live-Example]() | [GitHub-Home](https://github.com/MikeMitterer/ts-logging)

Very simple but extendable logger in TypeScript.

For now there are only two loggers define: `ConsoleLogger` and `NoOpLogger` but it
should be easy to define your own logger

## Install

    # NPM
    npm install @mmit/logging
    
    # YARN
    npm add @mmit/logging
        
## Usage

The "default LogLevel" is 'WARN'

The most simplest way to get the logger is:

```typescript
    import { LoggerFactory } from '@mmit/logger';

    const logger = LoggerFactory.get('test.Logger');
    
    // Will not be shown
    logger.debug("Shows message only if debug-level is set!");

    // Will not be shown
    logger.info("Shows message only if info-level is set!");

    // Shows the warning message 
    logger.warn("Shows message only if warn-level is set!");
```

If you need more control:

```typescript
    import { LoggerFactory, LogLevel } from '@mmit/logger';

     const logger = LoggerFactory.for('test.Logger')
                .level(LogLevel.DEBUG)
                .get();
    
    // Will be shown
    logger.debug("Shows message only if debug-level is set!");

    // Will be shown
    logger.info("Shows message only if info-level is set!");

    // Will be shown
    logger.warn("Shows message only if warn-level is set!");
```

If you want to specify your own Log-Channel:

```typescript
    import { LoggerFactory, LogLevel, Channel } from '@mmit/logger';

    class MyCoolLogChannel implements Channel {
        ...
    }

    const myChannel = new MyCoolLogChannel();
    
    const logger = LoggerFactory.for('test.Logger')
                .on(myChannel)
                .level(LogLevel.DEBUG)
                .get();
    
    logger.debug("Shows message only if debug-level is set!");
```    
