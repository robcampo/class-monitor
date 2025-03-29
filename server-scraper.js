// Server-optimized version of the class availability checker
// To run: node server-scraper.js

const puppeteer = require('puppeteer');

// Configuration
const CHECK_INTERVAL = 60000; // 60 seconds
const URL = 'https://sportirelandcampus.courseprogress.co.uk/onlinejoining/classes-results?filter=%7B%22centre%22:1,%22courseGroupCategory%22:%5B5%5D,%22dayOfWeek%22:%5B0%5D%7D';
const CLASS_NAME = 'Gym Tots';

// Enhanced logging function
function log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = type === 'error' ? '❌ ERROR' : type === 'success' ? '✅ SUCCESS' : 'ℹ️ INFO';
    console.log(`[${timestamp}] ${prefix}: ${message}`);
}

async function checkClassAvailability() {
    log('Starting class availability check');
    let browser = null;

    try {
        browser = await puppeteer.launch({
            headless: "new",
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu'
            ]
        });

        const page = await browser.newPage();
        
        // Set a reasonable timeout
        await page.setDefaultNavigationTimeout(30000);
        
        log('Navigating to booking page');
        await page.goto(URL, { waitUntil: 'networkidle0' });

        const classTextExists = await page.evaluate((className) => {
            return document.body.textContent.includes(className);
        }, CLASS_NAME);

        if (classTextExists) {
            log(`${CLASS_NAME} is now available!`, 'success');
            // TODO: Add your preferred notification method here (email, SMS, etc.)
        } else {
            log(`${CLASS_NAME} is not available yet`);
        }

    } catch (error) {
        log(`Error during check: ${error.message}`, 'error');
        // Log the full error stack in development
        if (process.env.NODE_ENV !== 'production') {
            console.error(error.stack);
        }
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

// Handle process termination gracefully
process.on('SIGTERM', () => {
    log('Received SIGTERM signal. Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    log('Received SIGINT signal. Shutting down gracefully...');
    process.exit(0);
});

// Start the monitoring
log('Starting class availability monitor');
setInterval(checkClassAvailability, CHECK_INTERVAL);

// Run initial check
checkClassAvailability(); 