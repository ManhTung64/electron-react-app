import { parentPort, MessagePort } from 'worker_threads'
import { ControllerSingleton } from './common/instance/controller.instance'
import { LoginData } from './product/product.controller'
import { Puppeteer } from './product/puppeteer'

const port:MessagePort | null = parentPort
if (!port) throw new Error('Port error')

port.on('message', (data:LoginData) => {
    ControllerSingleton.getPuppeteerInstance().login(data, false)
})
