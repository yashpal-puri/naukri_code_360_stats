import express from 'express';
import puppeteer from 'puppeteer';
import generateStatsJpeg from './generate_jpg.js';
import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
})

const app = express();

app.get('/', async (req, res) => {    
        const username=req.query.username;
        const url = "https://www.naukri.com/code360/profile/"+username;
        let img;
        if (!username) {
            img = generateStatsJpeg({
                error: `Please include your profile username in the url`,
            });                
            res.setHeader("Content-Type", "image/jpeg");
            return res.send(img);
        }
        
        (async () => {
            let browser;
            try {                
                browser = await puppeteer.launch({
                    args: [
                        "--disable-setuid-sandbox",
                        "--no-sandbox",
                        "--single-process",
                        "--no-zygote",
                    ],
                    executablePath: process.env.NODE_ENV === 'production' ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath(),
                });
                const page = await browser.newPage();
                page.setDefaultNavigationTimeout(10 * 60 * 1000);
                await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36')
                await page.goto(url);
                const searchResultSelector = '.problems-solved';
                await page.waitForSelector(searchResultSelector);
                const textSelector = await page.waitForSelector(
                  searchResultSelector
                );
                const data = await textSelector?.evaluate(el => el.textContent);
                const values= data.match(/\d+/g).map(Number);                
                const scrapedData = {
                    error: "",
                    username,
                    total: values[0],
                    easy: values[1],
                    moderate: values[2],
                    hard: values[3],
                    ninja: values[4],
                };
                img = generateStatsJpeg(scrapedData);              
                               
            } catch (error) {
                img = generateStatsJpeg({
                    error: `Error fetching data for ${username}: ${error.message}`,
                });                           
            }
            finally{
                await browser.close();
                res.setHeader("Content-Type", "image/jpeg");
                return res.send(img);   
            }
          })();   
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
