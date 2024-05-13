import { generateToken } from "node-2fa";
import { Browser, BrowserContext, ElementHandle, launch, Page } from "puppeteer";
import { LoginData } from "./product.controller";

export class Puppeteer {
    public page;
    public product_data;
    constructor() {
    }
    public async contr() {
        const browser: Browser = await launch(
            {
                headless: false,
                slowMo: 100

            })
        const context: BrowserContext = browser.defaultBrowserContext();

        // Override notification permissions for Facebook
        await context.overridePermissions('https://www.facebook.com', ['notifications']);
        this.page = await browser.newPage()
        // this.page.on('response', async (response) => {
        //     if (response.url().includes('lazada.vn/catalog')) {
        //         console.log(response.url())
        //         const jsonData = await response.json()
        //         this.product_data = jsonData.mods.listItems
        //     }
        // })
    }
    public async searchInLazada(keyword: any) {
        try {

            await this.page.goto('https://lazada.vn')
            await this.page.waitForNetworkIdle()
            await this.page.type('input[name="q"]', keyword)
            await this.page.click('.search-box__button--1oH7')
            await this.page.waitForNetworkIdle()

        } catch (error) {
            console.log(error)
        }
    }
    public async login(loginData: LoginData, isLike: boolean): Promise<boolean> {
        try {
            await this.contr()
            await this.page.goto('https://www.facebook.com/')
            await this.page.waitForNetworkIdle()
            await this.page.type('input[name="email"]', loginData.username)
            await this.page.type('input[name="pass"]', loginData.password)
            await this.page.click('button[name="login"]')
            await this.page.waitForNetworkIdle()
            const decodeFa = this.processTwoFa(loginData.faCode)
            await this.page.type('input[name="approvals_code"]', decodeFa)
            await this.page.click('button[type="submit"]')
            await this.page.waitForNetworkIdle()
            const next: ElementHandle = await this.page.$('text/Continue')
            if (next) next.click()
            await this.page.waitForNetworkIdle()
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
    public async like(): Promise<void> {
        try {
            console.log('like')
            // const link = await this.page.waitForSelector('::-p-xpath(/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div[2]/div/div/div/div[3]/div/div[4]/div/div[2]/div[1]/div/div/div/div/div/div/div/div/div/div/div/div/div/div[13]/div/div/div[2]/div/div[2]/div/div[2]/span/span/span[2]/span/a)')
            // await link.click()
            // console.log(this.page.url())
            // await this.page.waitForNetworkIdle()
            // const like = await this.page.waitForSelector('::-p-xpath(/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div/div/div/div/div/div/div/div/div/div/div/div[13]/div/div/div[4]/div/div/div[1]/div/div/div/div[1]/div[1]/div[1])')
            const like: ElementHandle = await this.page.$('text/Like')
            // await this.page.waitForSelector('::-p-text(Like)')
            await like.click()
        }
        catch (error) {
            console.log(error)
        }
    }
    public async likePosts(posts: number): Promise<void> {
        try {
            console.log('like many')

            
            let realPost: ElementHandle[] = await this.page.$$('text/Like')
            while (realPost.length < posts) {
                await this.scrollWindow().then(async()=>{
                    realPost = await this.page.$$('text/Like')
                })
            }
            for (let i = 0; i < posts; i++) {
                await realPost[i].click()
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    public async loveState(){
        const hover = await this.page.waitForSelector('::-p-xpath(/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div[2]/div/div/div/div[3]/div/div[3]/div/div[2]/div[1]/div/div/div/div/div/div/div/div/div/div/div/div/div/div[13]/div/div/div[4]/div/div/div[1]/div/div[2]/div/div[1]/div[1]/div[1])')
            await hover.hover()
            await this.page.waitForSelector('[aria-label="Love"]');
            await this.page.click('[aria-label="Love"]');
    }
    private async scrollWindow() {
        const dimensions = await this.page.evaluate(() => {
            return {
                width: document.documentElement.scrollWidth,
                height: document.documentElement.scrollHeight,
            };
        });

        // Kéo scroll đến cuối của trang
        await this.page.evaluate((dimensions) => {
            window.scrollTo(0, dimensions.height);
        }, dimensions);

    }
    public async comment(): Promise<void> {
        try {
            console.log('comment')
            const link: ElementHandle = await this.page.waitForSelector('::-p-xpath(/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div[2]/div/div/div/div[3]/div/div[3]/div/div[2]/div[1]/div/div/div/div/div/div/div/div/div/div/div/div/div/div[13]/div/div/div[2]/div/div[2]/div/div[2]/span/span)')
            await link.click()
            await this.page.waitForNavigation()
            try {
                const comment: ElementHandle = await this.page.waitForSelector('::-p-xpath(/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div/div/div/div/div/div/div/div/div/div/div/div[13]/div/div/div[4]/div/div/div[1]/div/div[2]/div/div[2]/div)')
                await comment.click()
            } catch (e) {
                const textSelector: ElementHandle = await this.page.waitForSelector('::-p-text(Comment)')
                await textSelector.click()
            }

            await this.page.keyboard.type('<3')
            await this.page.keyboard.press('Enter')
        } catch (error) {
            console.log(error)
        }
    }
    private processTwoFa(faCode: string): string | undefined {
        try {
            return generateToken(faCode)?.token
        } catch (error) {
            console.log(error)
            return undefined
        }
    }
}