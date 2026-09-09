import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Lista from "./pages/Lista";
import NotFound from "./pages/NotFound";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header title="Desafio da Aula 04" />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/lista" element={<Lista />} />
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </main>
        <Footer author="Marlon"/>
      </div>
    </BrowserRouter>
  );
}
