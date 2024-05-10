import { productApi } from "@renderer/apis/product";
import { useEffect, useState } from "react";

function CreateForm({updateProduct, setUpdateProduct}) {

    const [createProductForm, setCreateProductForm] = useState({
        name: "",
        description: "",
        price: 0
    })
    const [updating, setUpdating] = useState(false)
    async function handleSubmit(){
        try{
            // await productApi.createNew(createProductForm)
        }catch(error){
            alert("Error")
        }
    }
    function handleChange(event, type){
        const value = event.target.value
        setCreateProductForm((pre)=>({...pre, [type]:value}))
    }
    async function handleUpdate(){
        try{
            await productApi.updateProduct(createProductForm)
            setUpdateProduct(null)
        }catch(error){
            alert("Update error")
        }
    }
    useEffect(()=>{
        if (updateProduct && !updating) {
            setCreateProductForm(updateProduct)
            setUpdateProduct(null)
            setUpdating(true)
        }
    },[updateProduct])
    return (
        <>
        <div>
            <form onSubmit={()=> updating ? handleUpdate(): handleSubmit()}>
                <div>
                    <label>
                        Name:
                        <input type="text" value={updateProduct ? updateProduct.name: createProductForm.name} onChange={(event)=>{handleChange(event,"name")}} />
                    </label>
                </div>
                <div>
                    <label>
                        Description:
                        <input type="text" value={updateProduct ? updateProduct.description: createProductForm.description} onChange={(event)=>{handleChange(event, "description")}} />
                    </label>
                </div>
                <div>
                    <label>
                        Price:
                        <input type="number" value={updateProduct ? updateProduct.price: createProductForm.price} onChange={(event)=>{handleChange(event, "price")}} />
                    </label>
                </div>
                <input type="submit" value={updating ? "Update":"Add"}></input>
            </form>
        </div>
        </>
    );
}

export default CreateForm;