const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Load the page
    await page.goto('file:///workspace/amharic_search.html');

    // Wait for content to load
    await page.waitForTimeout(2000);

    // Check if main elements exist
    const title = await page.title();
    console.log('Page title:', title);

    const searchBox = await page.$('#searchInput');
    console.log('Search box exists:', !!searchBox);

    const sentencesList = await page.$('#sentencesList');
    console.log('Sentences list exists:', !!sentencesList);

    const items = await page.$$('.sentence-item');
    console.log('Number of sentence items:', items.length);

    // Check console for errors
    const errors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') {
            errors.push(msg.text());
        }
    });

    // Get page content
    const bodyText = await page.evaluate(() => document.body.innerText.substring(0, 500));
    console.log('Page content preview:', bodyText.substring(0, 200));

    await page.waitForTimeout(1000);

    if (errors.length > 0) {
        console.log('Console errors:', errors);
    } else {
        console.log('No console errors detected');
    }

    await browser.close();
})();
