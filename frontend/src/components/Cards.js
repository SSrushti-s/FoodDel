import React, { useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer'

export default function Cards(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")

    const handleAddToCart = async () => {
        await dispatch({ 
            type: "ADD", 
            id: props.foodItem._id, 
            name: props.foodItem.name, 
            price: props.finalPrice, 
            qty: qty, 
            size: size 
        })
        console.log(data)
    }

    return (
        <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
            <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "160px", objectFit: "fill" }} />
            <div className="card-body">
                <h5 className="card-title">{props.foodItem.name}</h5>
                <div className='container w-100'>
                    <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                        {Array.from(Array(6), (e, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
                    </select>
                    {props.options && Object.keys(props.options).length > 0 && (
                        <select className='m-2 h-100 bg-success rounded' onChange={(e) => setSize(e.target.value)}>
                            {Object.keys(props.options).map((data) => (
                                <option key={data} value={data}>{data}</option>
                            ))}
                        </select>
                    )}
                </div>
                <hr /><button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    )
}