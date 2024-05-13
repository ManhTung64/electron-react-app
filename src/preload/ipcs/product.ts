import { ipcRenderer } from "electron"
import { CreateNewProductReqDto } from "../product/dtos/productReq.dto"
import { CreateNewProductResDto } from "../product/dtos/productRes.dto"
import { LoginData } from "../../main/product/product.controller"

export const ipcProduct = {
    createNewProduct: async (data) => {
        return await ipcRenderer.invoke('createnew', data)
      },
      getAllProducts: async ()=>{
        return await ipcRenderer.invoke('getAllProducts')
      },
      deleteProduct: async (id:number)=>{
        return await ipcRenderer.invoke('deleteProduct', id)
      },
      updateProduct: async (product:any)=>{
        return await ipcRenderer.invoke('updateProduct',product)
      },
      exportFile: async (isExcel:boolean)=>{
        return await ipcRenderer.invoke('exportfile', isExcel)
      },
      search:        async (keyword:string)=>{
        return await ipcRenderer.invoke('search', keyword)
      },
      loginWithFb:        async (data:LoginData[]):Promise<void>=>{
        return await ipcRenderer.invoke('loginWithFb', data)
      },
      like:          async(posts?:number):Promise<void>=>{
        return await ipcRenderer.invoke('like', posts)
      }


}