// Styles für die gesamte Web-App
import { LoggerFactory } from '../main/logging/LoggerFactory';
import '../site/styles/main.scss';
import { main } from './app';

function everythingIsReady(): void {
    const logger = LoggerFactory.getLogger('done');

    logger.info(`everythingIsReady!`);

    // noinspection JSIgnoredPromiseFromCall
    main();
}

function domIsReady(): void {
    const logger = LoggerFactory.getLogger('done');

    logger.info(`domIsReady!`);
}

if (typeof window !== 'undefined') {
    // Mehr: https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState
    const domIsReadyState = setInterval((): void => {
        if (/interactive/.test(document.readyState)) {
            clearInterval(domIsReadyState);
            domIsReady(); // this is the function that gets called when everything is loaded
        }
    }, 10);

    const everythingLoadedState = setInterval((): void => {
        if (/loaded|complete/.test(document.readyState)) {
            clearInterval(everythingLoadedState);
            everythingIsReady(); // this is the function that gets called when everything is loaded
        }
    }, 10);
}
