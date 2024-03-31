import React from 'react'
import { Link } from 'react-router-dom'

const Mainnav = () => {
  return (
    <>
        <div className="web-home-navbar-section">
          <div className="web-home-navbar-firstdiv">
            <img className="web-home-navbar-img" src={require("../../assets/icons/upscaler-1.png")} alt='AlgoToday Logo'/>
            <h2 className="web-home-navbar-h2">Algo Today</h2>
          </div>
          <div className="web-home-navbar-seconddiv">
            <ul className="web-home-navbar-ul">
              <li className="web-home-navbar-li">
                <Link className="linking">Home</Link>
              </li>
              <li className="web-home-navbar-li">
                <Link className="linking">Services</Link>
              </li>
              <li className="web-home-navbar-li">
                <Link className="linking">Contact Us</Link>
              </li>
              <li className="web-home-navbar-li">
                <Link className="linking">About Us</Link>
              </li>
            </ul>
          </div>
          <div className="web-home-navbar-butoon">
            <button className="navbaarr-butoon" type="button">
              <Link to="/login" className="linking">Sign in</Link>
            </button>
          </div>
        </div>
    </>
  )
}

export default Mainnav