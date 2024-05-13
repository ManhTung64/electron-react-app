import { ElectronAPI } from '@electron-toolkit/preload'
import { LoginData } from "../main/product/product.controller"

declare global {
  interface Window {
    electron: ElectronAPI
    api: ApiApp
  }

 export declare interface ApiApp {
    product: IpcRendererProduct
  }

  export declare interface IpcRendererProduct {
    createNewProduct(payload: []),
    getAllProducts  (),
    deleteProduct   (payload:number),
    updateProduct   (payload:any),
    exportFile      (isExcel:boolean),
    search          (search:string),
    loginWithFb     (data:LoginData[]),
    like            (posts?:number)
  }
}
