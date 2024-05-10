import { ipcRenderer } from "electron"
import { CreateNewProductReqDto } from "../product/dtos/productReq.dto"
import { CreateNewProductResDto } from "../product/dtos/productRes.dto"

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
      }

}