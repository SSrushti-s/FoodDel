import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Cards'
import Carousel from '../components/Carousel'

export default function Home() {
    const [foodCat, setFoodCat] = useState([]); // defining a state variable for food category
    const [foodItem, setFoodItem] = useState([]); // for food item
    const [search, setSearch] = useState("");

    const loadData = async () => { //we use async because network requests take time, it is designed to reach out over the internet to your backend API
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        });
        response = await response.json(); //The raw response from the server is just text; this line parses that text into a JavaScript Array so React can actually read and manipulate the food objects.
        setFoodItem(response[0]); // Array of food items
        setFoodCat(response[1] || []);  // Array of categories
    }

    useEffect(() => { loadData() }, []) //[] means Runs only once when page loads
    return (
        <div>
            <Navbar />
            <Carousel search={search} setSearch={setSearch} />
            <div className='container'>
            {
                // Use Optional Chaining (?.) as an extra safety layer
                foodCat?.length > 0 
                ? foodCat.map((data) => (
                    <div key={data._id} className='row mb-3'>
                        <div className="fs-3 m-3">{data.CategoryName}</div>
                        <hr />
                        {
                            foodItem?.length > 0 
                            ? foodItem.filter( (item) =>
                                                    item.CategoryName === data.CategoryName &&
                                                    item.name.toLowerCase().includes(search.toLowerCase())
                                    ).map(filterItems => (
                                    <div key={filterItems._id} className="col-12 col-md-6 col-lg-3" style={{"marginRight":"10px"}}>
                                        <Card 
                                            foodItem={filterItems} 
                                            // Handle cases where options might be missing/empty
                                            options={filterItems.options?.length > 0 ? filterItems.options[0] : {}} 
                                        />
                                
                                    </div>
                                )) 
                    
                            : <div key="no-data"> No Such Data Found </div>
                        }
                    </div>
                ))
                : <div className="text-center m-5">Loading data or no categories found...</div>
            }
            </div>
            <Footer />
        </div>
    )
}