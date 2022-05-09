import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/home";
import Auth from './pages/auth';
import Admin from './pages/admin';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/auth" element={<Auth/>} />
        <Route path="/admin" element={<Admin/>} />
      </Routes>
    </Router>
  );
}

export default App;
