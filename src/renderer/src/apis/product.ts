export const productApi = {
    createNew: async (data) => await window.api.product.createNewProduct(data),
    getProducts: async() => await window.api.product.getAllProducts(),
    deleteProduct: async(id:number) => await window.api.product.deleteProduct(id),
    updateProduct: async(product:any) => await window.api.product.updateProduct(product),
    exportFile: async(isExcel:boolean = true) => await window.api.product.exportFile(isExcel),
    search: async(keyword:string) => await window.api.product.search(keyword)
}