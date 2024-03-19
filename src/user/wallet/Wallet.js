import "./wallet.css";
import * as yup from "yup";
import styled from "styled-components";
import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { ErrorMessage, Form, Formik, Field } from "formik";
import HorizontalNav from "../../components/navbar/HorizontalNav";

const Wallet = () => {
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [depositing, setDepositing] = useState("");
  const [cvvNumber, setCvvNumber] = useState("");
  const [expiry, setExpiry] = useState("");

  const initialValues = {
    cardHolderName: "",
    cardNumber: "",
    cvvNumber: "",
    depositing: 0,
    expiry: "",
  };

  const validationSchema = yup.object({
    cardNumber: yup
      .string()
      .matches(/^[0-9]{16}$/, "Enter a valid card Number")
      .required("Card number is required"),
    expiry: yup.string().required("Expiry date is required"),
    cvvNumber: yup.string().required("CVV number is required"),
    depositing: yup.number().required("Depositing amount is required"),
    cardHolderName: yup.string().required("Card holder name is required"),
  });

  const handleSubmit = () => {};
  return (
    <>
      <div>
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

            {/*-----------------------Form Started---------------------------------*/}
            <div className="container-div1-1-form">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, values }) => (
                  <Form id="wallet-form" className="container">
                    <div id="wallet-form-firstrow" className="row">
                      <div id="firstrow-firstdiv" className="col-md-6">
                        <Field
                          id="firstrow-firstdiv-input"
                          type="text"
                          name="cardNumber"
                          placeholder="Card Number"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="cardNumber"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div id="firstrow-seconddiv" className="col-md-6">
                        <Field
                          id="firstrow-seconddiv-input"
                          type="text"
                          name="cardHolderName"
                          placeholder="Card Holder Name"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="cardHolderName"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>

                    <div id="wallet-form-secondrow" className="row">
                      <div id="secondrow-firstdiv" className="col-md-6">
                        <Field
                          id="secondrow-firstdiv-input"
                          type="text"
                          name="expiry"
                          placeholder="Expiry (MM/YY)"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="expiry"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div id="secondrow-seconddiv" className="col-md-6">
                        <Field
                          id="secondrow-seconddiv-input"
                          type="text"
                          name="cvvNumber"
                          placeholder="CVV"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="cvvNumber"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>

                    <div id="wallet-form-thirdrow" className="row">
                      <div id="thirdrow-firstdiv" className="col-md-6">
                        <Field
                          id="thirdrow-firstdiv-input"
                          type="number"
                          name="depositing"
                          placeholder="Depositing Amount"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="depositing"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>

                    <div
                      id="form-depositbtn-div"
                      className="container mt-3 p-0 rounded-full border-2 border-3498-db bg-3498-db"
                    >
                      <button
                        id="form-depositbtn"
                        type="submit"
                        className="btn btn-primary btn-block w-fill-available rounded-full border-2 border-3498-db bg-3498-db"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Depositing..." : "Deposit"}
                      </button>
                    </div>

                    <div
                      id="form-activebtn-div"
                      className="container mt-3 rounded-full border-2 border-3498-db"
                    >
                      <button
                        id="form-activebtn"
                        type="button"
                        className="btn btn-secondary w-fill-available btn-block rounded-full border-none bg-white text-3498-db text-center font-normal font-semibold"
                      >
                        Activate Spin
                      </button>
                    </div>

                    <div className="container mt-1">
                      <p>
                        "Boost your deposited amount effortlessly by activating
                        the spin feature—a simple yet effective way to multiply
                        your funds and add excitement to your financial
                        experience."
                      </p>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div className="row" id="container-div2-2">
            <div
              id="div2-container"
              className="container d-flex rounded-3 border border-warning bg-gradient"
              style={{
                background:
                  "linear-gradient(161deg, rgba(255, 255, 229, 0.10) 2.1%, rgba(255, 199, 79, 0.10) 80.81%)",
                height: "fit-content",
              }}
            >
              <div id="div2-subcontainer" className="container">
                <h2 id="div2-h2">Total Coins</h2>
              </div>
              <div className="container d-flex" id="div3-container">
                <div id="div3-subcontainer" className="row w-fit">
                  <h4 id="div3-h4">img</h4>
                </div>
                <div id="div4-subcontainer" className="row">
                  <h4 id="div4-h4">500</h4>
                </div>
              </div>
            </div>
            <div
              id="container-div3-3"
              className="row"
              style={{ margin: "0px" }}
            >
              <h2> Spin & Multiply </h2>
              <p>
                {" "}
                "Simply click on the 'Activate Spin' button, deposit a small
                amount, and unlock the feature to start multiplying your funds
                with ease."{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default React.memo(Wallet);
