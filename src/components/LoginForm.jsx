import { useState } from "react";
import logo from "../Assets/umflogo.jpg";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const defaultUsername = "bcsumfintauth";
    const defaultPassword = "Goodman@#$1%%//";

    // Perform validation with default username and password
    if (username === defaultUsername && password === defaultPassword) {
      // Call the onLogin function to notify the parent component
      // Pass the authenticated user information if needed
      onLogin(username);
    } else {
      // Display an error message or handle authentication failure
      console.log("Invalid username or password");
      alert("invalid user name or password! try again");
    }
  };

  return (
    <div className="">
      <div className="text-center relative">
        <img src={logo} alt="logo" className="md:ml-[45%] ml-[27%]" />
        <h1 className="font-bold text-2xl">
          Brotherhood of the Cross and Star{" "}
        </h1>
        <h1 className="text-2xl">UNIVERSAL MEN FELLOWSHIP</h1>
      </div>
      <div className="bg-gray-200 text-center md:w-[50%] self-center shadow-2xl drop-shadow-2xl mt-20 p-10 md:ml-[25%] hover:bg-gray-300 duration-500">
        {/* <i>login</i> */}
        <form onSubmit={handleLogin} className="grid grid-flow-row gap-10">
          {/* <img
            // src={logo}
            alt=""
            className="self-center w-32 ml-[40%] rounded-full"
          /> */}
          <p className="text-xl">Online Accreditation Portal</p>
          <label className="text-[#f8c81b] font-bold text-2xl p-1">
            {/* Username: */}
            <input
              placeholder="User Name"
              className="text-gray-600 text-center border-2 border-gray-300 rounded-md"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label className="text-[#f8c81b] font-bold text-2xl p-1">
            {/* Password: */}
            <input
              placeholder="Password"
              className="text-gray-600 text-center border-2 border-gray-300 rounded-md"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className="bg-[#600489] font-bankGothic duration-500 w-44 md:ml-[40%] ml-[20%] text-white rounded-full hover:bg-[#f8c81b] text-2xl p-1"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
