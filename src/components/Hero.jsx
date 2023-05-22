import React, { useEffect, useRef, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import bcslogo from "../Assets/BCS_logo-removebg-preview.png";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import slide1 from "../Assets/umfweekbanner.jpg";
import slide2 from "../Assets/umfweekfotball.jpg";
import slide3 from "../Assets/umflogo.jpg";
import XLSX from "node-xlsx";
<script
  src="https://platform.linkedin.com/badges/js/profile.js"
  async
  defer
  type="text/javascript"
></script>;
const Hero = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPeople, setTotalPeople] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      const firestore = firebase.firestore();
      const usersCollection = firestore.collection("users");
      const querySnapshot = await usersCollection.get();
      const fetchedUsers = querySnapshot.docs.map((doc) => doc.data());
      setUsers(fetchedUsers);
    };

    fetchUsersData();
  }, []);

  const exportToExcel = () => {
    const data = users.map((user) => ({
      First_Name: user.firstName,
      Middle_Name: user.middleName,
      Last_Name: user.lastName,
      State: user.state,
      Nation: user.nation,
      Phone_No: user.phoneNumber,
      Category: user.category,
      Position: user.position,
      Amount: user.amount,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registered People");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const filename = "registered_people.xlsx";
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
    }
  };

  const handleSlideChange = (e) => {
    // Handle slide change event
    console.log(e.slide);
  };

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
    <div className="pt-[15%] text-center pl-10 pr-10">
      <div className="text-center">
        <img src={bcslogo} alt="bcs" className="ml-[50%]" />
        <h1 className="font-bold text-4xl">
          Universal Men Fellowship Online Accreditation Platform
        </h1>
        <AliceCarousel
          autoPlay
          mouseTracking
          autoPlayInterval={6000}
          items={[
            <img
              src={slide1}
              alt="Image 1"
              className="w-[70%] mt-10 h-[590px] ml-[15%]"
            />,
            <img
              src={slide2}
              alt="Image 2"
              className="w-[50%] mt-10 ml-[26%] h-[590px]"
            />,
            <img
              src={slide3}
              alt="Image 3"
              className="w-[30%] mt-10 ml-[36%]"
            />,

            <img
              src={slide1}
              alt="Image"
              className="w-[70%] mt-10 h-[590px] ml-[15%]"
            />,
          ]}
          onSlideChanged={handleSlideChange}
        />
      </div>
      <div className="flex gap-20 ml-[20%] mb-20">
        <div className="w-[520px] bg-gray-200 h-96 text-center hover:bg-gray-300 hover:scale-105 duration-700 rounded-3xl shadow-2xl drop-shadow-2xl">
          {isLoading ? (
            <h1 className="text-red-400 mt-[33%] text-3xl animate-pulse">
              Loading...
            </h1>
          ) : (
            <h1 className="text-3xl font-bold mt-[33%] text-green-500">
              Total Amount: {formattedTotalAmount}
              {totalAmount !== 0 && " NGN"}
            </h1>
          )}
        </div>
        {/* Other components or content */}
        <div className="w-[520px] bg-gray-200 h-96 text-center hover:bg-gray-300 hover:scale-105 duration-700 rounded-3xl shadow-2xl drop-shadow-2xl">
          {" "}
          <h1 className="text-3xl font-bold mt-[33%] text-[#600489]">
            {totalPeople} Men Registered
          </h1>
          <button onClick={exportToExcel}>Export to Excel</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
