import React, { useEffect, useState } from "react";
import { db } from "../firbase.config";
import logo from "../Assets/umflogo.jpg";
import { FaTrash } from "react-icons/fa";
const Members = () => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchUserDataFromFirestore = async () => {
      try {
        const querySnapshot = await db.collection("users").get();
        const userData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data from Firestore:", error);
      }
    };

    fetchUserDataFromFirestore();
  }, []);

  //   const handleEdit = (user) => {
  //     // Implement your logic for editing the user data
  //     console.log("Editing user:", user);
  //   };

  const handleDelete = async (userId) => {
    try {
      await db.collection("users").doc(userId).delete();
      // Update the userData state to remove the deleted user
      setUserData((prevData) => prevData.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleDeleteClick = (userId) => {
    handleDelete(userId);
  };

  return (
    <div className="pt-[15%] ml-[1%]">
      <div className="grid grid-cols-3 gap-4">
        {userData.map((user) => (
          <div
            key={user.id}
            className="grid grid-cols-3 pt-24 gap-10 relative bg-gray-200 p-2 rounded-2xl shadow-2xl"
          >
            <img
              src={logo}
              alt="img"
              className="w-24 rounded-full mt-2 ml-[40%] absolute "
            />
            <p className="font-bold text-xl  ml-2 border-gray-500 ">
              <b className="mr-3 text-gray-500">Name :</b> {user.firstName}{" "}
              {user.middleName} {user.lastName}
            </p>
            <p className="font-bold text-xl  ml-2 border-gray-500 ">
              <b className="mr-3 text-gray-500">State : </b>
              {user.state}
            </p>
            <p className="font-bold text-xl  ml-2 border-gray-500 ">
              <b className="mr-3 text-gray-500"> Nation:</b>
              {user.nation}
            </p>
            <p className="font-bold text-xl  ml-2 border-gray-500 ">
              <b className="mr-3 text-gray-500"> Phone No:</b>
              {user.phoneNumber}
            </p>
            <p className="font-bold text-xl  ml-2 border-gray-500 ">
              <b className="mr-3 text-gray-500">Category:</b>
              {user.category}
            </p>
            <p className="font-bold text-xl  ml-2 border-gray-500 ">
              <b className="mr-3 text-gray-500"> Position: </b>
              {user.position}
            </p>
            <p className="font-bold text-xl  ml-2 border-gray-500 ">
              <b className="mr-3 text-gray-500">Amount:</b>
              {user.amount}
            </p>
            <p className="font-bold text-xl  ml-2 border-gray-500 ">
              <b className="mr-3 text-gray-500">User_ID:</b> {user.id}
            </p>{" "}
            <br />
            {/* <button onClick={() => handleEdit(user)}>Edit</button> */}
            <button
              className="text-red-300 duration-700 hover:text-red-600"
              onClick={() => handleDeleteClick(user.id)}
            >
              <FaTrash size={30} />
            </button>
            {/* Render other fields as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Members;
