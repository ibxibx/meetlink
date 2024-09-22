import puppeteer from "puppeteer";

describe("show/hide an event details", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250,
      devtools: true,
    });
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    await page.waitForSelector(".event", { timeout: 30000 });
  });

  afterAll(() => browser.close());

  test("An event element is collapsed by default", async () => {
    const eventDetails = await page.$(".event .event-details");
    expect(eventDetails).toBeNull();
  });

  test("User can expand an event to see its details", async () => {
    await page.waitForSelector(".event", { timeout: 30000 });
    const event = await page.$(".event");
    const button = await event.$(".details-btn");
    await button.click();

    const eventDetails = await page.$(".event .event-details");
    expect(eventDetails).toBeDefined();
  });

  test("User can collapse an event to hide details", async () => {
    const event = await page.$(".event");
    const button = await event.$(".details-btn");
    await button.click();

    const eventDetails = await page.$(".event .event-details");
    expect(eventDetails).toBeNull();
  });
});