import "swiper/swiper.min.css";
import "./App.scss";
import "swiper/swiper.min.css";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import { Routes, Route } from "react-router-dom";
import Catalog from "./Components/Catalog/Catalog";
import Footer from "./Components/Footer/Footer";
import MovieDetails from "./Components/MovieDetails/MovieDetails";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/:category" element={<Catalog />}></Route>
        <Route path="/:category/search/:keyword" element={<Catalog />}></Route>
        <Route path="/:category/:id" element={<MovieDetails />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
