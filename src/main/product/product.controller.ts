import { BrowserWindow, IpcMainInvokeEvent, dialog, ipcMain } from 'electron';
import ProductRepository from './repositories/product.repository';
import { CreateNewProductReqDto } from '../../preload/product/dtos/productReq.dto';
import { CreateNewProductResDto } from '../../preload/product/dtos/productRes.dto';
import { RepositorySingleton } from '../common/instance/repository.instance';
import { writeFile } from 'fs-extra'
import { utils } from 'xlsx'
import { Puppeteer } from './puppeteer';
import { Worker } from 'worker_threads'
import createWorker from '../worker?nodeWorker'

const XLSX = require('xlsx')


export class ProductController {
    private readonly productRepository: ProductRepository;
    private pupp:Puppeteer;

    constructor(db: any) {
        this.productRepository = RepositorySingleton.getProductInstance(db)
        this.pupp = new Puppeteer()
        // Register IPC handlers

        ipcMain.handle('getAllProducts', async () => {
            const products = await this.productRepository.getProducts();
            if (products) return products
            else throw new Error("Get error");
        });

        ipcMain.handle('updateProduct', async (event, data: CreateNewProductReqDto) => {
            const updatedProduct = await this.productRepository.update(data);
            if (updatedProduct) return updatedProduct
            else throw new Error('Update error');
        });

        ipcMain.handle('deleteProduct', async (event, id: number): Promise<boolean> => {
            if (!await this.showConfirmMessage(null)) return false
            const deleteProduct = await this.productRepository.delete(id);
            if (deleteProduct) return true
            else return false
        });
        ipcMain.handle('exportfile', async (event, isExcel: boolean) => {
            const data = await this.productRepository.getProducts()
            console.log(isExcel)
            dialog.showSaveDialog({
                title: 'Save File',
                defaultPath: !isExcel ? 'products.txt' : 'products.xlsx',
                filters: [{
                    name: 'Excel file',
                    extensions: [isExcel ? 'xlsx' : 'txt']
                }]
            }).then(result => {
                if (!result.canceled && result.filePath) {
                    isExcel ? this.exportExcelFile(data, result.filePath)
                        : this.exportTextFile(data, result.filePath)
                }
            })
        })
        ipcMain.handle('search', async (event, keyword: string) => {
            return await this.searchProduct(keyword)
        })
        ipcMain.handle('createnew', async (event, data: []) => {
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    await this.productRepository.addNew(data[i])
                }
            }
        })
        ipcMain.handle('loginWithFb', async (event: IpcMainInvokeEvent, data: LoginData[]) => {
            // const worker: Worker = createWorker({ workerData: 'worker' })
            // worker.postMessage(data[1])
            
            await this.pupp.login(data[0], true)
        })
        ipcMain.handle('like',async(event, data?:number)=>{
            console.log(data)
            if (!data) await this.pupp.like()
                else await this.pupp.likePosts(data)
        })
    }
    private exportExcelFile = (data: Array<any>, filePath: string) => {
        try {
            const workbook = utils.book_new();
            const worksheet = utils.json_to_sheet(data);
            utils.book_append_sheet(workbook, worksheet, 'Products');

            XLSX.writeFile(workbook, filePath);
        } catch (error) {
            console.log(error)
        }
    }
    private exportTextFile = (data: Array<any>, filePath: string) => {
        try {
            let newFile = ""
            data.map((row) => {
                newFile += `Product name: ${row.name}, description: ${row.description}, price: ${row.price}\n`
            })
            writeFile(filePath, newFile)
        } catch (error) {
            console.log(error)
        }
    }
    private showConfirmMessage = async (browserWindow:any) => {
        const response = dialog.showMessageBoxSync(browserWindow, ({
            title: 'Confirm',
            message: "Confirm delete",
            detail: "Are you sure to delete ?",
            buttons: ['Yes', "No"]
        }))
        const yes: number = 0
        return response === yes
    }
    public searchProduct = async (keyword) => {
        await this.pupp.searchInLazada(keyword)
        return this.pupp.product_data
    }
}

export class LoginData {
    username: string;
    password: string;
    faCode: string;
    constructor(username: string, password: string, faCode: string) {
        this.username = username
        this.password = password
        this.faCode = faCode
    }
}