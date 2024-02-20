import './shape.css'
import React from 'react'

const Shape = () => {
    return (
        <>
            <div className="orange"></div>
            <div className='shape-img2-green' >
                <img
                    className="green"
                    src={require("../../assets/icons/Ellipse 28.png")}
                />
            </div>
            <div className='shape-img3-blue' >
                <img
                    className="blue"
                    src={require("../../assets/icons/Ellipse 29.png")}
                />
            </div>
        </>
    )
}

export default Shape
