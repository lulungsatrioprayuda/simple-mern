import NotePage from "../pages/NotePage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RequireAuth from "./RequireAuth";
import SignupPage from "../pages/SignupPage";
import LogoutPage from "../pages/LogoutPage";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
            <li>
              <Link to={"/signup"}>Signup</Link>
            </li>
            <li>
              <Link to={"/logout"}>Log out</Link>
            </li>
          </ul>
          <Routes>
            <Route
              index
              element={
                <RequireAuth>
                  <NotePage />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/logout" element={<LogoutPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
