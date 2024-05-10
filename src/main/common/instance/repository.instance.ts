import ProductRepository from "../../product/repositories/product.repository"

export class RepositorySingleton{
    private static productRepository:ProductRepository

    public static getProductInstance(db:any){
        if (!this.productRepository) this.productRepository = new ProductRepository(db)
        return this.productRepository
    }
}