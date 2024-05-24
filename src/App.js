import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import PageForm from "./components/PageForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/Form" element={<PageForm />} />
    </Routes>
  );
}

export default App;
