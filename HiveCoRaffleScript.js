const puppeteer = require('puppeteer');

(async () => {

    let counter = 1000; // Change this number for how many times you want to enter the raffle 

    while (counter--) {

        const browser = await puppeteer.launch({ devtools: true, args: ['--proxy-server=47.83.26.133:6480'] }); // enter your proxy here in IP:Port format if you do not want to use a proxy remove the args: ['--proxy-server=47.83.28.11:6239']
        const page = await browser.newPage();

        //If your proxies utilize User:Pass authentication then replace the fields with your info
        //If your proxies utilize IP authentication then leave commented out 
        /*
        await page.authenticate({
            username: 'username',
            password: 'password',
         });
        */

        await page.goto('https://app.hive.co/contests/contest/14662/spotlight/?r=46339862') // replace URL with the raffle URL you want to automate
        await page.setViewport({ width: 1536, height: 1550 })

        //
        // Selecting link that does not require Facebook and allows manual raffle entry
        console.log('Starting');
        await page.waitForTimeout(5000);
        await page.waitForSelector('.main-content > .contest-wrapper > .contest-section > #step1 > .no-facebook-link')
        await page.click('.main-content > .contest-wrapper > .contest-section > #step1 > .no-facebook-link')
        await page.waitForTimeout(5000);
        //
        //


        //
        //Creating a unique random first name by appending a random combination of characters to original name
        console.log('Entering Info');
        await page.waitForSelector('#firstName')
        await page.click('#firstName')
        let random_firstname = ''
        var characters = 'aeoklmthcnstazga' // To create more unique combinations add more characters here
        for (var i, i = 0; i < characters.length; i++) {
            random_firstname += characters.charAt(Math.floor(Math.random() * characters.length))
        }
        await page.type('#firstName', 'Ben' + random_firstname)
        //
        //


        //
        //Creating a unique random last name by appending a random combination of characters to original name
        await page.waitForSelector('#lastName');
        await page.click('#lastName');
        let random_lastname = ''
        var characters = 'acmnthlciesgastza' // To create more unique combinations add more characters here
        for (var i, i = 0; i < characters.length; i++) {
            random_lastname += characters.charAt(Math.floor(Math.random() * characters.length))
        }
        await page.type('#lastName', 'Ten' + random_lastname);
        //
        //


        //
        //Creating a unique random email by appending a random combination of characters to catch all email (use a catch all)
        await page.waitForSelector('#email');
        await page.click('#email');
        let random_string = ''
        var characters = 'asdfgqwertyjklxn123456789'
        for (var i, i = 0; i < characters.length; i++) {
            random_string += characters.charAt(Math.floor(Math.random() * characters.length))
        }
        await page.type('#email', random_string + '@examplecatchall.com'); // replace the catchall domain to yours to receive confirmation emails
        //
        //


        //
        // Entering the city to enter the raffle for
        await page.waitForSelector('#city');
        await page.click('#city');
        await page.type('#city', 'Washington, District of Columbia, United States'); // fill out the raffle form normally to see the format for your city and replace
        //
        //


        //
        //Submitting the form and waiting 
        await page.waitForSelector('#bigContinueBtn');
        await page.click('#bigContinueBtn');
        console.log('Submitted Info');
        await page.waitForTimeout(5000);
        console.log('Finishing');
        await browser.close();

    }

})();