import express from 'express';
import puppeteer from 'puppeteer';
import generateStats from './generate_svg.js';

const app = express();

app.get('/', async (req, res) => {    
        const username=req.query.username;
        const url = "https://www.naukri.com/code360/profile/"+username;
        if (!username) {
            const svg = generateStats({
                error: `Please include your profile username in the url`,
            });                
            res.setHeader("Content-Type", "image/svg+xml");
            res.setHeader("Cache-Control", "s-max-age=60, stale-while-revalidate");
            res.send(svg);
        }
        
        (async () => {
            try {                
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                page.setDefaultNavigationTimeout(10 * 60 * 1000)
                await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36')
                await page.goto(url);
                const searchResultSelector = '.problems-solved';
                await page.waitForSelector(searchResultSelector);
                const textSelector = await page.waitForSelector(
                  searchResultSelector
                );
                const data = await textSelector?.evaluate(el => el.textContent);
                const values= data.match(/\d+/g).map(Number);                
                await browser.close();
                const scrapedData = {
                    error: "",
                    username,
                    total: values[0],
                    easy: values[1],
                    moderate: values[2],
                    hard: values[3],
                    ninja: values[4],
                };
                const svg = generateStats(scrapedData);                
                res.setHeader("Content-Type", "image/svg+xml");
                res.setHeader("Cache-Control", "s-max-age=60, stale-while-revalidate");
                res.send(svg);                
            } catch (error) {
                const svg = generateStats({
                    error: `Error fetching data for ${username}: ${error.message}`,
                });   
                res.setHeader("Content-Type", "image/svg+xml");
                res.setHeader("Cache-Control", "s-max-age=60, stale-while-revalidate");             
                res.send(svg);                
            }
          })();   
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
