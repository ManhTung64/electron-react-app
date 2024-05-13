import { productApi } from "@renderer/apis/product"
import { useState } from "react"

function LikeAction() {
    const [posts, setPosts] = useState(0)
    async function handleChangePosts(e){
        setPosts(e.target.value)
    }
    async function handleLikeFirst(){
        await productApi.like()
    }
    async function handleLikeMany(){
        try{
            console.log(posts)
            await productApi.like(posts)
        }
        catch(e){
            console.log(e)
        }
    }
    return (
        <>
            <button onClick={handleLikeFirst} className="like-btn">Like first post</button>
            <div>
            <button onClick={handleLikeMany} className="unlike-btn">Like posts</button>
            <label>Quantity: <input type="number" value={posts} onChange={(e)=>handleChangePosts(e)} name="quantity"></input></label>
            </div>
            
        </>
    )
}
export default LikeAction