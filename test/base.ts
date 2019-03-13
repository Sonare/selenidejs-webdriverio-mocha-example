import { Browser } from 'selenidejs';
import { remote } from 'webdriverio'
import { Executor, HttpClient } from 'selenium-webdriver/http';
import { Session, WebDriver } from 'selenium-webdriver';

export let browser: Browser;
let wbrowser: BrowserObject;

beforeAll(async () => {
    const options = {
        capabilities: {browserName: 'chrome'},
        waitforTimeout : 0
    };
    const wbrowser = await remote(options);

    const sessionId = wbrowser.sessionId;
    const capabilities = wbrowser.capabilities;
    const session = new Session(sessionId, capabilities);

    const {hostname, port, path} = wbrowser['config'];
    const client = new HttpClient('http://' + hostname + ':' + port + path)
    const executor = new Executor(client);

    const webdriver = new WebDriver(session, executor);

    browser = Browser
        .drivedBy(webdriver)
        .timeout(2000)
        .build();
});

afterAll(async () => {
    await wbrowser.deleteSession();
});