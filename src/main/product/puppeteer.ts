import { launch, Page } from "puppeteer";

export class Puppeteer{
    public page;
    public product_data;
    constructor(){
        new Promise(()=> this.contr())
    }
    public async contr(){
        const browser = await launch({headless:false})
        this.page = await browser.newPage()
        this.page.on('response',async (response)=>{
            if (response.url().includes('lazada.vn/catalog')){
                console.log(response.url())
                const jsonData = await response.json()
                this.product_data = jsonData.mods.listItems
            }
        })
    }
    // public static async getBrowser(){
    //     const browser = await launch({
    //         headless: false
    //     })
    //     return browser
    // }
    // public static async getPage(browser: any){
    //     const page = await browser.newPage()
    //     return page
    // }
    
    public async searchInLazada(keyword:any){
        try{

            await this.page.goto('https://lazada.vn')
            await this.page.waitForNetworkIdle()
            await this.page.type('input[name="q"]', keyword)
            await this.page.click('.search-box__button--1oH7')
            await this.page.waitForNetworkIdle()
            
        }catch(error){
            console.log(error)
        }
    }
}