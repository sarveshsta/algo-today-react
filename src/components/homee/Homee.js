import "./homee.css";
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

const Homee = () => {
  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits")
      .required("Phone Number is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      email: "",
      phoneNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("vallsld", values);
    },
  });

  return (
    <>
      <div style={{ background: "#FFFFFF" }}>
        <div className="web-home-navbar-section">
          <div className="web-home-navbar-firstdiv">
            <img className="web-home-navbar-img" />
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
              <Link className="linking">Sign in</Link>
            </button>
          </div>
        </div>

        <div className="web-home-content-main">
          <div className="web-home-content-firstdiv">
            <h2 className="homecontent-h2">
              Empower your trades with algorithmic precision
            </h2>
          </div>
          <div className="web-home-content-seconddiv">
            <p className="homecontent-para">
              Navigate the markets with confidence using our algorithmic trading
              platform, where precision meets performance. Empower your
              financial journey with data-driven decisions and seamless
              execution
            </p>
          </div>
          <div className="web-home-content-thirddiv">
            <button className="homecontent-bttn">
              <Link to="" className="linking">
                Sign Up
              </Link>
            </button>
          </div>
          <div className="blue-abso-color"></div>
          <div class="star-container"></div>
        </div>

        <div className="web-home-image-display-content">
          <img
            className="image-display-content"
            src={require("../../assets/icons/Content.png")}
          />
        </div>

        <div className="web-home-pricing-section">
          <div className="pricing-section-heading">
            <h3 className="heading-bestprice">Best Pricing</h3>
          </div>
          <div className="pricing-section-para">
            <p className="para-lorem">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
          <div className="pricing-section-track">
            <progress className="progress-barr" value={0} max={100} />
          </div>
          <div className="pricing-section-mainprice">
            <div className="pricing-gold">
              <div className="pricing-section">
                <div className="pricing-h5-div">
                  <h5 className="pricing-h5">Gold</h5>
                </div>
                <div className="pricing-h4-div">
                  <h4 className="pricing-h4">
                    ₹19<span className="pricing-span"> /month</span>
                  </h4>
                </div>
                <div className="pricing-para-div">
                  <p className="pricing-para">
                    All the basic features to boost your freelance career
                  </p>
                </div>
              </div>
              <div className="pricing-super-list-div">
                <div className="pricing-orderlist-div">
                  <ol className="pricing-orderlist">
                    <li className="pricing-li">
                      Full Access to Expert Strategy
                    </li>
                    <li className="pricing-li">Make your Own strategy</li>
                    <li className="pricing-li">Unlimited Trade</li>
                    <li className="pricing-li">High Security</li>
                    <li className="pricing-li">Free 50 algo coins</li>
                  </ol>
                </div>
                <div className="pricing-button-div">
                  <button className="pricing-btnn" type="button">
                    {" "}
                    Get 14 Days Free Trial
                  </button>
                </div>
              </div>
            </div>
            <div className="pricing-silver">
              <div className="pricing-section">
                <div className="pricing-h5-div">
                  <h5 className="pricing-h5">Silver</h5>
                </div>
                <div className="pricing-h4-div">
                  <h4 className="pricing-h4">
                    ₹49<span className="pricing-span"> /month</span>
                  </h4>
                </div>
                <div className="pricing-para-div">
                  <p className="pricing-para">
                    All the basic features to boost your freelance career
                  </p>
                </div>
              </div>
              <div className="pricing-super-list-div">
                <div className="pricing-orderlist-div">
                  <ol className="pricing-orderlist">
                    <li className="pricing-li">
                      Full Access to Expert Strategy
                    </li>
                    <li className="pricing-li">Make your Own strategy</li>
                    <li className="pricing-li">Unlimited Trade</li>
                    <li className="pricing-li">High Security</li>
                    <li className="pricing-li">Free 50 algo coins</li>
                  </ol>
                </div>
                <div className="pricing-button-div">
                  <button className="pricing-btnn" type="button">
                    {" "}
                    Get 14 Days Free Trial
                  </button>
                </div>
              </div>
            </div>
            <div className="pricing-platinum">
              <div className="pricing-section">
                <div className="pricing-h5-div">
                  <h5 className="pricing-h5">Platinum</h5>
                </div>
                <div className="pricing-h4-div">
                  <h4 className="pricing-h4">
                    ₹99<span className="pricing-span"> /month</span>
                  </h4>
                </div>
                <div className="pricing-para-div">
                  <p className="pricing-para">
                    All the basic features to boost your freelance career
                  </p>
                </div>
              </div>
              <div className="pricing-super-list-div">
                <div className="pricing-orderlist-div">
                  <ol className="pricing-orderlist">
                    <li className="pricing-li">
                      Full Access to Expert Strategy
                    </li>
                    <li className="pricing-li">Make your Own strategy</li>
                    <li className="pricing-li">Unlimited Trade</li>
                    <li className="pricing-li">High Security</li>
                    <li className="pricing-li">Free 50 algo coins</li>
                  </ol>
                </div>
                <div className="pricing-button-div">
                  <button className="pricing-btnn" type="button">
                    {" "}
                    Get 14 Days Free Trial
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="web-home-form-section">
          <div className="form-firstdiv">
            <h3 className="form-firstdiv-h3">Get in touch</h3>
            <p className="form-firstdiv-para">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
          <div className="form-seconddiv-mainform">
            <div className="form-formdiv">
              <form className="formis-form">
                <div className="formdiv-h3">
                  <h3 className="h33">Send a message</h3>
                </div>
                <div className="form-inputs-main">
                  <div className="form-firstinputs">
                    <label className="form-inputss-label">First Name</label>
                    <input className="inputsss" type="text" name="name" />
                  </div>
                  <div className="form-firstinputs">
                    <label className="form-inputss-label">Last Name</label>
                    <input className="inputsss" type="text" name="lastname" />
                  </div>
                </div>
                <div className="form-inputs-main">
                  <div className="form-firstinputs">
                    <label className="form-inputss-label">Phone</label>
                    <input className="inputsss" type="number" name="phoneNumber" />
                  </div>
                  <div className="form-firstinputs">
                    <label className="form-inputss-label">Email</label>
                    <input className="inputsss" type="email" name="email" />
                  </div>
                </div>
                <div>
                  <textarea />
                </div>
                <div className="batannn">
                  <button>Submit</button>
                </div>
              </form>
            </div>
            <div className="mapp-div">
              <div>
                <h3>Contact info</h3>
              </div>
              <div>
                <img />
                <h4>+91 12345 6789</h4>
              </div>
              <div>
                <img />
                <h4>+91 12345 6789</h4>
              </div>
              <div>
                <img />
                <img />
                <img />
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homee;
