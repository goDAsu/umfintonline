import { useState } from "react";
import LoginForm from "./components/LoginForm";
import HomePage from "./components/Home";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <HomePage username={username} />
      )}
    </div>
  );
};

export default App;
