import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/navbar/Navbar";
import HorizontalNav from "../components/navbar/HorizontalNav";
import { ErrorMessage, Form, Formik, Field } from "formik";
import * as yup from "yup";

const Wallet = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvvNumber, setCvvNumber] = useState("");
  const [depositing, setDepositing] = useState("");

  const initialValues = {
    cardNumber: "",
    cardHolderName: "",
    expiry: "",
    cvvNumber: "",
    depositing: 0,
  };

  const validationSchema = yup.object({
    cardNumber: yup.string().required("Card number is required"),
    cardHolderName: yup.string().required("Card holder name is required"),
    expiry: yup.string().required("Expiry date is required"),
    cvvNumber: yup.string().required("CVV number is required"),
    depositing: yup.number().required("Depositing amount is required"),
  });

  const handleSubmit = () => {};

  return (
    <>
      <Wrapper>
        <HorizontalNav />
        <Navbar />
        <div id="wallet-container" className="container">
          <div className="row" id="container-div1-1">
            <div className="container-div1-1-h2">
              <h2>Deposit & Earn Coins</h2>
            </div>
            <div className="container-div1-1-para">
              <p>
                Deposit ₹1, get 2 coins - a brief, limited-time offer to
                kickstart your Algoo journey!
              </p>
            </div>
            <div className="container-div1-1-form">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, values }) => (
                <Form className="container mt-4">
                  <div className="row">
                    <div className="col-md-6">
                      <Field
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number"
                        className="form-control mb-3"
                      />
                      <ErrorMessage
                        name="cardNumber"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="col-md-6">
                      <Field
                        type="text"
                        name="cardHolderName"
                        placeholder="Card Holder Name"
                        className="form-control mb-3"
                      />
                      <ErrorMessage
                        name="cardHolderName"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <Field
                        type="text"
                        name="expiry"
                        placeholder="Expiry (MM/YY)"
                        className="form-control mb-3"
                      />
                      <ErrorMessage
                        name="expiry"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="col-md-6">
                      <Field
                        type="text"
                        name="cvvNumber"
                        placeholder="CVV"
                        className="form-control mb-3"
                      />
                      <ErrorMessage
                        name="cvvNumber"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>

                  <Field
                    type="number"
                    name="depositing"
                    placeholder="Depositing Amount"
                    className="form-control mb-3"
                  />
                  <ErrorMessage
                    name="depositing"
                    component="div"
                    className="text-danger"
                  />

                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Depositing..." : "Deposit"}
                  </button>
                  <button type="button" className="btn btn-secondary btn-block">
                    Activate Spin
                  </button>
                </Form>
              )}
            </Formik>
            </div>
          </div>
          <div className="row" id="container-div2-2">
            
          </div>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  #wallet-container {
    border: 2px solid;
    margin-left: 17%;
    width: -webkit-fill-available;
    display: flex;
    height: 89vh;
  }
  ,
  .container-div1-1-h2 {
    border: 2px solid;
    display: inline;
    height: max-content;
  }
  ,
  .container-div1-1-para {
    border: 2px solid;
    display: inline;
    height: max-content;
  },
  
  #container-div1-1 {
    width: -webkit-fill-available;
    margin: 0;
    text-align: center;
    border-radius: 1.875rem;
    background: #FFF;
    box-shadow: 0px 43px 95px 0px rgba(41, 41, 41, 0.10), 0px 173px 173px 0px rgba(41, 41, 41, 0.09), 0px 388px 233px 0px rgba(41, 41, 41, 0.05), 1px 690px 276px 0px rgba(41, 41, 41, 0.01), 1px 1078px 302px 0px rgba(41, 41, 41, 0.00);
    padding:4px
},
  #container-div2-2 {
    width: -webkit-fill-available;
    margin: 0;
},
`;

export default Wallet;
