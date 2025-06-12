import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Doc from "./pages/Doc";

export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <nav className="bg-white shadow p-4 flex gap-4 text-blue-700 font-medium">
        <Link to="/" className="hover:underline">
          Accueil
        </Link>
        <Link to="/doc" className="hover:underline">
          Documentation
        </Link>
      </nav>
      <main className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doc" element={<Doc />} />
        </Routes>
      </main>
    </Router>
  );
}
