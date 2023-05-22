import React, { useState } from "react";
import { db } from "../firbase.config";
import logo from "../Assets/umflogo.jpg";
const Form = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [state, setState] = useState("");
  const [nation, setNation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [category, setCategory] = useState("");
  const [position, setPosition] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save the form data to the database using Firestore
    db.collection("users")
      .add({
        firstName,
        middleName,
        lastName,
        state,
        nation,
        phoneNumber,
        category,
        position,
        amount,
      })
      .then(() => {
        // Clear form fields after successful submission
        setFirstName("");
        setMiddleName("");
        setLastName("");
        setState("");
        setNation("");
        setPhoneNumber("");
        setCategory("");
        setPosition("");
        setAmount("");

        console.log("Form submitted successfully!");
        alert("Form submitted successfully!");
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert("An Error Ocurred pls try again");
      });
  };

  return (
    <div className="text-center w-[99%] mb-10 pt-[24%] md:pt-[15%] ">
      <div className="mb-20">
        <h1 className="font-bold text-3xl ">UMF Authentication Form</h1>
        <img src={logo} alt="logo" className="w-20 ml-[47%]" />
      </div>
      <form
        className="w-fit rounded-lg drop-shadow-2xl shadow-2xl grid grid-flow-row ml-[25%] bg-gray-200 p-10 gap-10 text-center"
        onSubmit={handleSubmit}
      >
        <h3 className="font-bankGothic text-xl text-red-500">ADD NEW</h3>
        <div className="flex gap-20">
          <input
            className="text-center font-bankGothic text-2xl outline-red-400 h-16 rounded-2xl"
            placeholder="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            className="text-center font-bankGothic text-2xl outline-red-400 h-16 rounded-2xl"
            placeholder="Middle Name"
            type="text"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
        </div>
        <div className="flex gap-20">
          <input
            className="text-center font-bankGothic text-2xl outline-red-400 h-16 rounded-2xl"
            placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            className="text-center font-bankGothic text-2xl outline-red-400 h-16 rounded-2xl"
            placeholder="State"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className="flex gap-20">
          <input
            className="text-center font-bankGothic text-2xl outline-red-400 h-16 rounded-2xl"
            placeholder="Nation"
            type="text"
            value={nation}
            onChange={(e) => setNation(e.target.value)}
          />

          <input
            className="text-center font-bankGothic text-2xl outline-red-400 h-16 rounded-2xl"
            placeholder=" Phone Number"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="flex gap-20">
          <input
            className="text-center font-bankGothic text-2xl outline-red-400 h-16 rounded-2xl"
            placeholder="Category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            className="text-center font-bankGothic text-2xl outline-red-400 h-16 rounded-2xl"
            placeholder="Position"
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
        <div className="flex gap-20">
          <input
            className="text-center font-bankGothic text-2xl outline-red-400 h-16 rounded-2xl"
            placeholder="Amount"
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button
            className="text-center bg-[#600489] hover:bg-red-400 text-white font-bankGothic text-2xl duration-700 outline-red-400 h-16 rounded-2xl w-[50%]"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
