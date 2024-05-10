import { productApi } from "@renderer/apis/product";
import { useEffect, useState } from "react";
import Form from './createForm'

function ListProduct() {

    const [listProduct, setListProduct] = useState([])
    const [updateProduct, setUpdateProduct] = useState(null)
    async function getProducts() {
        try {
            const result = await productApi.getProducts()
            console.log(result)
            setListProduct(result)
        } catch (error) {
            console.log(error)
        }

    }
    async function handleDelete(id: number) {
        try {
            const isSucessful = await productApi.deleteProduct(id)
            if (isSucessful) {
                const updateData = listProduct.filter((product: any) => { return product.id != id })
                setListProduct(updateData)
            }
        } catch (error) {
            alert("Delete error")
        }
    }
    async function handleEdit(product: any) {
        setUpdateProduct(product)
    }
    async function handleExportExcelFile() {
        await productApi.exportFile()
    }
    async function handleExportTextFile() {
        await productApi.exportFile(false)
    }
    useEffect(() => {
        new Promise(() => getProducts())
    }, [setListProduct])
    return (
        <>
            <div className="product-table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listProduct && listProduct.length > 0 && listProduct.map((product: any) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td><a onClick={() => handleEdit(product)}>Edit</a></td>
                                <td><a onClick={() => handleDelete(product.id)}>Delete</a></td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
            <div>
                <input type="button" onClick={() => handleExportExcelFile()} value="Export to excel"></input>
                <input type="button" onClick={() => handleExportTextFile()} value="Export to txt file"></input>
            </div>
            <div>
                <Form updateProduct={updateProduct} setUpdateProduct={setUpdateProduct}></Form>
            </div>
        </>
    );
}

export default ListProduct;