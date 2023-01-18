import "swiper/swiper.min.css";
import "./App.scss";
import "swiper/swiper.min.css";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
