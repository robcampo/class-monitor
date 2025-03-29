// To run: node scraper.js

const puppeteer = require('puppeteer');
const notifier = require('node-notifier');

async function checkClassAvailability() {
    console.log('Checking class availability. ', new Date().toLocaleString());

    try {
        const browser = await puppeteer.launch({headless: "new"});
        const page = await browser.newPage();
        // Sunday
        await page.goto('https://sportirelandcampus.courseprogress.co.uk/onlinejoining/classes-results?filter=%7B%22centre%22:1,%22courseGroupCategory%22:%5B5%5D,%22dayOfWeek%22:%5B0%5D%7D', { waitUntil: 'networkidle0' });
        
        // Wait for additional time if necessary (e.g., 3 seconds)
        //await page.waitForTimeout(5000);
        // Wait for additional time if necessary (e.g., 3 seconds)
        //await new Promise(r => setTimeout(r, 5000));

        const classTextExists = await page.evaluate(() => {
            return document.body.textContent.includes('Gym Tots');
        });

        if (classTextExists) {
            console.log('Yes: Class IS available!');
            notifier.notify({
                title: 'Class Availability Alert',
                message: 'Gym Tots is now available!',
                sound: true,
            });
        } else {
            console.log('No: Class is NOT available yet.');
        }

        await browser.close();
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Schedule the function to run every 60 seconds
const interval = 60000; 
setInterval(checkClassAvailability, interval);

// Optionally, you can also run the function once immediately upon starting the script:
checkClassAvailability();