import * as qu from 'qunit';
import { LoggerFactory } from '../main/logging/LoggerFactory';
import { LogLevel } from '../main/logging/LogLevel';
import lambi from '../site/images/lambi.png';
import { testQUnit } from './test/qunit.test';

const query = (selector: string): HTMLElement => document.querySelector(selector) as HTMLElement;

// /**
//  * Start wird manuell durchgeführt - sonst kommt es immer wieder
//  * zu Problemen bei async-Calls!
//  *
//  * Weitere Infos:
//  *      https://api.qunitjs.com/config/QUnit.config
//  *
//  *      # Führt die Tests auf der cmdline mit puppeteer aus
//  *      yarn test:e2e -
//  */
// @ts-ignore
// window.QUnit = { config: { autostart: false /* noglobals: true */ } };

// Retrieve a logger (you can decide to use it per class and/or module or just
// export it in the config above etc. Your loggers - your choice!).
// This logger will fall in the first LogGroupRule from above.
LoggerFactory.defaultLevel = LogLevel.INFO;
const logger = LoggerFactory.getLogger('main');

export function main(): void {
    // const test = QUnit.test;
    // const describe = QUnit.module;

    query('#tstest').onclick = (event: MouseEvent): void => {
        alert(`Hi Mike, event '${event.type}' occurred!!`);
    };

    const divs = Array.from(document.getElementsByTagName('div'));

    divs.forEach((div: HTMLDivElement): void => {
        div.addEventListener('click', (evt: MouseEvent): void => {
            evt = new MouseEvent('aaa');
            logger.info(JSON.stringify(evt));
        });
    });

    logger.debug(`Lambi: ${JSON.stringify(lambi)}`);
    const img = query('#frontImg') as HTMLImageElement;
    img.src = lambi;

    const body = query('body') as HTMLBodyElement;
    body.classList.remove('loading');
    body.classList.add('loaded');

    qu.config.testTimeout = 30000;

    qu.test('add two numbers', (assert): void => {
        assert.equal(1 + 1, 2);
    });

    testQUnit();

    qu.start();

    // logger.info(`Done!!!! ${os.platform()}`);
    logger.info(`Done!!!1`);
}
