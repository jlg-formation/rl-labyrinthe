import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Doc from "./pages/Doc";
import Advanced from "./pages/Advanced";

const basename = import.meta.env.BASE_URL;

export default function App() {
  return (
    <Router basename={basename}>
      <nav className="bg-white shadow p-4 flex gap-4 text-blue-700 font-medium">
        <Link to="/" className="hover:underline">
          Accueil
        </Link>
        <Link to="/doc" className="hover:underline">
          Documentation
        </Link>
        <Link to="/advanced" className="hover:underline">
          Avancé
        </Link>
      </nav>

      <main className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doc" element={<Doc />} />
          <Route path="/advanced" element={<Advanced />} />
        </Routes>
      </main>
    </Router>
  );
}
