import { Browser } from 'selenidejs';
import { WebDriver } from 'selenium-webdriver';
import { HttpClient, Executor } from 'selenium-webdriver/http'
const timeout = process.env.DEBUG ? 99999999 : 15000;

export let selenideBrowser: Browser;

export const config = {
    runner: 'local',
    hostname: '0.0.0.0',
    port: 4444,
    path: '/wd/hub',
    specs: [
        'build/test/**/*.spec.js'
    ],
    maxInstances: 1,
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome'
    }],
    logLevel: 'error',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    services: ['selenium-standalone'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
      compilers: [
      ],
        ui: 'bdd',
        timeout: timeout
    },
    before: function () {
        const sessionId = browser['sessionId'];
        const { hostname, port, path } = browser['config'];
        const client = new HttpClient(`http://${hostname}:${port}${path}`);
        const executor = new Executor(client);
        const webdriver = new WebDriver(sessionId as any, executor);

        selenideBrowser = Browser
            .drivedBy(webdriver)
            .timeout(2000)
            .build();
    },
};
