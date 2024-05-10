import { productApi } from "@renderer/apis/product"
import { useEffect, useState } from "react"

function SearchForm() {
    const [keyWord, setKeyword] = useState('')
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    function handleChange(e) {
        setKeyword(e.target.value)
    }
    function eventEnter(e) {
        if (e.key === 'Enter') submitInput()
    }
    async function submitInput() {
        setLoading(true)
        const data = await productApi.search(keyWord)
        setData(data.map((product)=>{return {...product, checked:false}}))
        setLoading(false)
    }
    function handleCheck(product){
        const update:any = data.map((pro:any)=>{
            if (pro.itemId == product.itemId) return {...pro, checked: !pro.checked}
            else return pro
        })
        setData(update)
    }
    async function handleSave(){
        await productApi.createNew(data.filter((pro:any)=>{return pro.checked}))
        const updateData:any = data.filter((pro:any)=>{return !pro.checked})
        setData(updateData)
    }
    function handleClear(){
        setData([])
    }
    useEffect(()=>{

    },[setData])
    return (
        <>
            <div>
                <h1>{loading?"Loading . . .":""}</h1>
                <input onChange={(e) => handleChange(e)}
                    onKeyPress={(e) => eventEnter(e)}
                    type="text" placeholder="Search" />
                <button onClick={submitInput}>Search</button>
                <input type="button" value="Clear" onClick={handleClear}></input>
                    <input type="button" value="Save" onClick={handleSave}></input>
            </div>
            <div className="scrollable">
                <table>
                    <tr>
                        <th></th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Vote</th>
                        <th>Review</th>
                        <th>Discount</th>
                        <th>Seller</th>
                    </tr>
                    {data && data.length > 0 && data.map((product: any) => (
                        <tr>
                            <td><input type="checkbox" checked={product.checked} onChange={()=>handleCheck(product)}></input></td>
                            <td><a href={"https:" + product.itemUrl}>
                                <span>{product.name} </span>
                            </a>
                            </td>
                            <td>{product.priceShow}</td>
                            <td>{product.ratingScore?product.ratingScore:0}</td>
                            <td>{product.review?product.review:0}</td>
                            <td>{product.discount??"0%"}</td>
                            <td>{product.sellerName}</td>
                        </tr>
                    ))
                    }
                </table>
                
            </div>
            <div>
                    
                </div>
        </>
    )
}
export default SearchForm