import { ProductController } from "../../product/product.controller";

export class ControllerSingleton{
    private static productController:ProductController

    public static getProductInstance(db:any){
        if (!this.productController) this.productController = new ProductController(db)
        return this.productController
    }
}