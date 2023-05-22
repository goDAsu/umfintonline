import React, { useEffect, useState } from "react";
import logo from "../Assets/umflogo.jpg";
import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
// import { db } from "../firbase.config";

const Nav = () => {
  const [totalPeople, setTotalPeople] = useState(0);
  //
  const [nav, setNav] = useState(true);

  const handleNav = () => {
    setNav(!nav);
  };
  //
  useEffect(() => {
    const fetchTotalRegisteredPeople = async () => {
      try {
        const collectionRef = firebase.firestore().collection("users");
        const querySnapshot = await collectionRef.get();
        const totalCount = querySnapshot.docs.length;
        setTotalPeople(totalCount);
      } catch (error) {
        console.error("Error fetching total registered people:", error);
      }
    };

    fetchTotalRegisteredPeople();
  }, []);

  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        const collectionRef = firebase.firestore().collection("users");
        const querySnapshot = await collectionRef.get();

        let sum = 0;
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const amount = data.amount || 0;
          sum += Number(amount);
        });

        setTotalAmount(sum);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching total amount:", error);
      }
    };

    fetchTotalAmount();
  }, []);

  const formattedTotalAmount = totalAmount.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
  });

  return (
    <div className="bg-white shadow-2xl drop-shadow-2xl z-20 fixed w-screen">
      <div className="flex gap-[30%] p-10">
        <img
          src={logo}
          alt=""
          className="md:w-28 w-16 h-16 md:h-28 animate-bounce"
        />
        <div onClick={handleNav} className="block md:hidden">
          {!nav ? (
            <AiOutlineClose
              size={30}
              className="pointer-corsor md:hidden flex mt-3 ml-20 text-red-500 border-2 border-red-500 p-0.5 rounded-full z-50"
            />
          ) : (
            <AiOutlineMenu
              size={30}
              className="pointer-corsor md:hidden flex mt-3 ml-20 text-black z-50"
            />
          )}
        </div>
        <ul className="md:flex gap-16 hidden mt-9">
          <Link
            to={"*"}
            className="font-bankGothic text-gray-500 text-2xl hover:text-gray-900"
          >
            Home
          </Link>
          <Link
            to={"/Form"}
            className="font-bankGothic text-gray-500 text-2xl hover:text-gray-900"
          >
            Regiter
          </Link>
          <Link
            to={"/Members"}
            className="font-bankGothic text-gray-500 text-2xl hover:text-gray-900"
          >
            View Registered
          </Link>
          <h1 className="font-extralight text-red-600">
            {totalPeople} MEN Registered
          </h1>
          <p>
            {" "}
            {isLoading ? (
              <h1>Loading...</h1>
            ) : (
              <h1 className="text-green-500">
                Amount Paid: {formattedTotalAmount}
                {totalAmount !== 0 && " NGN"}
              </h1>
            )}
          </p>
        </ul>

        {/*  */}
        <ul
          className={
            !nav
              ? "md:hidden fixed p-5 left-0 top-0 flex-col bg-white border-2 border-gray-300 rounded-lg drop-shadow-2xl shadow-black ml-5 w-80 mt-20 h-96 ease-in-out duration-500 md:ml-[7%]"
              : "fixed left-[-110%]"
          }
        >
          <Link
            to={"*"}
            className="font-bankGothic text-gray-500 text-2xl hover:text-gray-900"
          >
            Home
          </Link>{" "}
          <hr />
          <br />
          <Link
            to={"/Form"}
            className="font-bankGothic text-gray-500 text-2xl hover:text-gray-900"
          >
            Regiter
          </Link>
          <hr />
          <Link
            to={"/Members"}
            className="font-bankGothic mb-10 text-gray-500 text-2xl hover:text-gray-900"
          >
            View Registered
          </Link>
          <hr />
          <h1 className="font-extralight mb-6 text-red-600">
            {totalPeople} MEN Registered
          </h1>
          <hr />
          <p>
            {" "}
            {isLoading ? (
              <h1>Loading...</h1>
            ) : (
              <h1 className="text-green-500">
                Amount Paid: {formattedTotalAmount}
                {totalAmount !== 0 && " NGN"}
              </h1>
            )}
          </p>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
