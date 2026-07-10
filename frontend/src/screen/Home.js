import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Cards'
import Carousel from '../components/Carousel'

export default function Home() {
    const [foodCat, setFoodCat] = useState([]); // defining a state variable for food category
    const [foodItem, setFoodItem] = useState([]); // for food item
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);


    const loadData = async () => { //we use async because network requests take time, it is designed to reach out over the internet to your backend API
        try{
            const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
            let response = await fetch(`${API_BASE}/api/foodData`, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
            response = await response.json(); //The raw response from the server is just text; this line parses that text into a JavaScript Array so React can actually read and manipulate the food objects.
            setFoodItem(response[0]); // Array of food items
            setFoodCat(response[1] || []);  // Array of categories
        }
        catch(error){
            console.error('Error fetching food data:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { loadData() }, []) //[] means Runs only once when page loads
    return (
        <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#0f172a', color: 'white' }}>
            <Navbar />
            <Carousel search={search} setSearch={setSearch} />

            <div className="container flex-grow-1 px-4 bg-dark-600 animate-fade-in" style={{ marginTop: '20px', borderRadius: '8px', padding: '20px' }}>
        {loading ? (
          <div className="d-flex flex-column align-items-center justify-content-center my-5 py-5">
            <div className="spinner-border text-success mb-3" style={{ width: '3rem', height: '3rem' }} role="status"></div>
            <p className="text-muted">Loading delicious foods...</p>
          </div>
        ) : foodCat?.length > 0 ? (
          foodCat.map((category) => {
            const filteredItems = foodItem?.filter(
              (item) =>
                item.CategoryName === category.CategoryName &&
                item.name.toLowerCase().includes(search.toLowerCase())
            );

            if (filteredItems.length === 0 && search) {
              return null; // Skip showing category if search yields no results
            }

            return (
              <div key={category._id} className="mb-5 animate-fade-in">
                <div className="d-flex align-items-center mb-3">
                  <div style={{
                    width: '6px',
                    height: '28px',
                    backgroundColor: 'var(--primary)',
                    borderRadius: '3px',
                    marginRight: '12px'
                  }}></div>
                  <h3 className="mb-0 font-weight-bold text-white" style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                    {category.CategoryName}
                  </h3>
                  <span className="badge bg-secondary-custom ms-3" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {filteredItems.length} items
                  </span>
                </div>
                
                <hr className="mb-4" style={{ margin: '0', opacity: 0.1 }} />
                
                <div className="row g-4">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <div key={item._id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch">
                        <Card
                          foodItem={item}
                          options={item.options?.length > 0 ? item.options[0] : {}}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="col-12 py-3 text-muted">
                      No dishes available in this category.
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center my-5 py-5 glass-panel rounded-4">
            <h4 className="text-white">No food items found</h4>
            <p className="text-muted">Database might be empty. Try running the database seed script!</p>
          </div>
        )}
      </div>
            <Footer />
        </div>
    )
}