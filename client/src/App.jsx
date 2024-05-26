import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./App.css";

export default function App() {
 
    const accessToken =  new URLSearchParams(window.location.search).get("access_token");


      //window.history.pushState({}, null, "/")
      localStorage.setItem("accessToken", accessToken);

  return (
    <>
      <div className="purple-ellipse"></div>
      <div className="red-ellipse"></div>
      {accessToken ? <Dashboard /> : <Login />}
    </>
  );
}
