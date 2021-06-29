# Minimal TS Logging framework 
> [Live-Example]() | [GitHub-Home](https://github.com/MikeMitterer/ts-logging)

Very simple but extendable logger in TypeScript.

For now there are only two loggers define: `ConsoleLogger` and `NoOpLogger` but it
should be easy to define your own logger

## Install

    # NPM
    npm install @mmit/logging
    
    # YARN
    yarn add @mmit/logging
        
## Usage

The "default LogLevel" is 'INFO'

The most simplest way to get the logger is:

```typescript
    import { LoggerFactory } from '@mmit/logging';

    const logger = LoggerFactory.getLogger('test.Logger');
    
    // Will not be shown
    logger.debug("Shows message only if debug-level is set!");

    // Will not be shown
    logger.info("Shows message only if info-level is set!");

    // Shows the warning message 
    logger.warn("Shows message only if warn-level is set!");
```

If you need more control:

```typescript
    import { LoggerFactory, LogLevel } from '@mmit/logging';

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

## Output Example
```bash
    console.info node_modules/@mmit/logging/lib/channels/ConsoleLogger.js:23
      15:42:42.998 [INFO] Connecting to : wss://mobiad.int.mikemitterer.at:8060/message | ...st.integration.services.WebSocket
    console.info node_modules/@mmit/logging/lib/channels/ConsoleLogger.js:20
      15:42:43.148 [INFO] onOpenEvent-Payload:                               | ...st.integration.services.WebSocket
      "{\"event\":\"mm.services.websocket.onOpenEvent\"}"
    console.info node_modules/@mmit/logging/lib/channels/ConsoleLogger.js:20
      15:42:43.148 [INFO] Event:                                             | ...st.integration.services.WebSocket
      {
          "event": "showresourceevent",
          "data": {
              "resourcetype": "Job",
              "resourceid": "25ee12ff-1dc2-40dd-afc6-4a2901491e72",
              "url": "http://www.mikemitterer.at/images/mobiad.jpg"
          }
      }
    console.info node_modules/@mmit/logging/lib/channels/ConsoleLogger.js:20
      15:42:43.288 [INFO] onJsonEvent-Payload:                               | ...st.integration.services.WebSocket
```
