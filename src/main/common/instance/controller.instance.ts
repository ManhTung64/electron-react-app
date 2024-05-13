import { ProductController } from "../../product/product.controller";
import { Puppeteer } from "../../product/puppeteer";

export class ControllerSingleton{
    private static productController:ProductController
    private static puppeteer:Puppeteer

    public static getProductInstance(db?:any){
        if (!this.productController) this.productController = new ProductController(db)
        return this.productController
    }
    public static getPuppeteerInstance(){
        if (!this.puppeteer) this.puppeteer = new Puppeteer()
        return this.puppeteer
    }
}