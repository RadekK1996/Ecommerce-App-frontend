import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { NavBar } from "./components/navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" />
          <Route path="/auth" />
          <Route path="/checkout" />
          <Route path="/purchased-items" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
