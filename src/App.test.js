const puppeteer = require("puppeteer");
const faker = require("faker");
const devices = require("puppeteer/DeviceDescriptors");
const iPhone = devices["iPhone 6"];

const user = {
  email: faker.internet.email(),
  password: "test",
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName()
};

const isDebugging = () => {
  const debugging_mode = {
    headless: false,
    slowMo: 250,
    devtools: true
  };
  return process.env.NODE_ENV === "debug" ? debugging_mode : {};
};

let browser;
let page;
let logs = [];
let errors = [];
beforeAll(async () => {
  browser = await puppeteer.launch(isDebugging());
  page = await browser.newPage();
  page.on("console", c => {
    console.log(c);
    logs.push(c);
  });
  page.on("pageerror", c => {
    console.log(c);
    errors.push(e.text);
  });

  await page.goto("http://localhost:3000");
  await page.emulate(iPhone);
});

describe("on page load", () => {
  test(
    "h1 loads correctly",
    async () => {
      const html = await page.$eval('[data-testid="h1"]', e => e.innerHTML);

      expect(html).toBe("Welcome to React");
    },
    16000
  );

  test("nav loads correctly", async () => {
    const navbar = await page.$eval(
      '[data-testid="navbar"]',
      el => (el ? true : false)
    );
    const listItems = await page.$$('[data-testid="nav-li"]');

    expect(navbar).toBe(true);
    expect(listItems.length).toBe(4);
  });

  describe("login form", () => {
    test(
      "fills out form and submits",
      async () => {
        await page.setCookie({ name: "JWT", value: "kjsdfjhkj" });

        const firstName = await page.$('[data-testid="firstName"]');
        const lastName = await page.$('[data-testid="lastName"]');
        const email = await page.$('[data-testid="email"]');
        const password = await page.$('[data-testid="password"]');
        const submit = await page.$('[data-testid="submit"]');

        await firstName.tap();
        await page.type('[data-testid="firstName"]', user.firstName);

        await lastName.tap();
        await page.type('[data-testid="lastName"]', user.lastName);

        await email.tap();
        await page.type('[data-testid="email"]', user.email);

        await password.tap();
        await page.type('[data-testid="password"]', user.password);

        await submit.tap();

        await page.waitForSelector('[data-testid="success"]');
      },
      16000
    );
    test("sets firstName cookie", async () => {
      const cookies = await page.cookies();
      const firstNameCookie = cookies.find(
        c => c.name === "firstName" && c.value === user.firstName
      );
      console.log(firstNameCookie);
      expect(firstNameCookie).not.toBeUndefined();
    });

    test("does not have any console logs", () => { 
      const newLogs = logs.filter( 
       
        s => 
          (s._type !== 'info' && (s._text.match( /failed: WebSocket is closed before the connection is established./)==0))
         
      );
      expect(newLogs.length).toBe(0);
    });

    test("does not have any exceptions logs", () => {
      expect(errors.length).toBe(0);
    });
  });
});

afterAll(() => {
 
  if (isDebugging()) {
    browser.close();
  }
});
