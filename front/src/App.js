import {Routes, Route, BrowserRouter} from "react-router-dom";
import Navbar from "./components/Navbar";
import  Home from "./pages/Home";
import  AddUser from "./pages/AddUser";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <div>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/add" element={<AddUser/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
