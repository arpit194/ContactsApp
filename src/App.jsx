import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Index from "./pages/index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import AddContact from "./pages/AddContact";
import Contacts from "./pages/Contacts";

function App() {
  const token = useSelector((state) => state.auth.token);
  return (
    <div className="limited">
      <BrowserRouter>
        <Navigation />
        <Routes>
          {!token && (
            <>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}
          {token && (
            <>
              <Route path="/" element={<Contacts />} />
              <Route path="/addContact" element={<AddContact />} />
              <Route path="/*" element={<>Not Found</>} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
