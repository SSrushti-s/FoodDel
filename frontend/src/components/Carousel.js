import React from 'react'
import { useState } from 'react'

export default function Carousel({search, setSearch }) {

    return (
        <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
                <div className="carousel-inner" id='carousel'>
                    <div className="carousel-caption" style={{zIndex:"10"}}>
                        <form className="d-flex w-100">
                            <input
                                className="form-control me-2 w-100"
                                type="search"
                                placeholder="Search Food..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button className="btn btn-success">
                                Search
                            </button>
                        </form>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-ride="carousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
            </div>
        </div>
    )
}