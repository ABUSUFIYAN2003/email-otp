import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";

const Contact = () => {
  const form = useRef();

  const generateOTP = (limit) => {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < limit; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };

  const verifyOTP = (e) => {
    e.preventDefault();
    const enteredOTP = form.current.OTP.value;
    if (enteredOTP === OTP) {
      alert("OTP verified successfully");
    } else {
      alert("OTP verification failed. Please try again.");
    }
  };

  const [OTP, setOTP] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    const generatedOTP = generateOTP(4);
    setOTP(generatedOTP);
    
    const to = form.current.to.value;
    
    emailjs
      .sendForm(
        "service_3nyokde",
        "template_h72n6hv",
        form.current,
        "x-skaOLGevGbmgsTV"
      )
      .then(
        (result) => {
          alert("Email sent successfully..!")
          console.log("Email sent successfully");
          console.log("EmailJS Result:", result);

          emailjs
            .send(
              "service_3nyokde",
              "template_h72n6hv",
              {
                to: to,
                OTP: generatedOTP,
              },
              "x-skaOLGevGbmgsTV"
            )
            .then(
              (otpResult) => {
                console.log("OTP sent successfully");
                console.log("OTP EmailJS Result:", otpResult);
              },
              (otpError) => {
                console.log("OTP sending failed");
                console.error("OTP EmailJS Error:", otpError);
              }
            );
        },
        (error) => {
          alert("Email sending failed..!")
          console.log("Email sending failed");
          console.error("EmailJS Error:", error);
        }
      );
  };

  return (
    <StyledContactForm>
      <h2 className="h2">EMAIL OTP VERIFICATION</h2>
      <form ref={form}>
        <label>Enter Your Valid Email</label>
        <input type="email" name="to" required />
        <button onClick={sendEmail}>Send</button>
        <label>Enter Your OTP</label>
        <input type="text" name="OTP" />
        <button onClick={verifyOTP}>Verify</button>
      </form>
    </StyledContactForm>
  );
};

export default Contact;

const StyledContactForm = styled.div`
  border: 2px solid red;
  border-radius: 25px;
  box-shadow: 10px 10px lightblue;
  margin-top: 40px;
  width: 400px;

  .h2 {
    color: black;
    text-align: center;
    padding-top: 50px;
    font-family: "Lucida Console", "Courier New", monospace;
  }

  form {
    padding-top: 10px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 20px;
    font-family: "Lucida Console", "Courier New", monospace;

    input {
      margin-left: 50px;
      width: 70%;
      height: 35px;
      padding: 7px;
      outline: none;
      border: 2px solid green;
      border-radius: 25px;

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    label {
      margin-top: 1rem;
      margin-left: 50px;
      font-weight: bold;
    }

    button {
      
      width: 20%;
      height: 30px;
      margin-left: 200px;
      margin-top: 1rem;
      margin-bottom: 30px;
      cursor: pointer;
      background: rgb(249, 105, 14);
      background-color: #555555;
      border-radius: 12px;
      font-size: 20px;
      color: white;
      border: none;
    }
  }
`;
