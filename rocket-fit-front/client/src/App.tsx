import "./App.css";
import MainPage from "./pages/MainPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WorkoutPage from "./pages/WorkoutPage";
import AuthenticationPage from "./pages/AuthenticationPage";
import { useEffect, useState } from "react";
import ChooseWorkoutPage from "./pages/ChooseWorkoutPage";
import Navbar from "./components/Navbar";
import styled from "styled-components";
import WorkoutsPage from "./pages/WorkoutsPage";
import Base from "./components/Base";
import CustomizeWorkout from "./pages/CustomizeWorkout";

const Border = styled.div`
  padding: 1em;
`;

function App() {
  const [trigger, setTrigger] = useState<boolean>(true);

  useEffect(() => {}, [trigger]);

  const handleAuthData = (data: number) => {
    setTrigger(!trigger);
    localStorage.setItem("savedAuthId", JSON.stringify(data));
  };

  const handleLogoutData = (data: number) => {
    setTrigger(!trigger);
    localStorage.setItem("savedAuthId", JSON.stringify(data));
  };

  return (
    <>
      <Border>
        <Router>
          <Navbar sendDataToParent={handleLogoutData} />
          <Routes>
            <Route path="/" Component={Base} />
            <Route
              path="/login"
              element={<AuthenticationPage sendDataToParent={handleAuthData} />}
            />
            <Route
              path="/myworkouts"
              element={
                <ChooseWorkoutPage
                  authId={JSON.parse(
                    localStorage.getItem("savedAuthId") || "{}"
                  )}
                />
              }
            />
            <Route
              path="/main"
              element={
                <MainPage
                  authId={JSON.parse(
                    localStorage.getItem("savedAuthId") || "{}"
                  )}
                />
              }
            />
            <Route path="/workouts" Component={WorkoutsPage} />
            <Route path="customize" Component={CustomizeWorkout} />
            <Route path="/workout" Component={WorkoutPage} />
          </Routes>
        </Router>
      </Border>
    </>
  );
}

export default App;
