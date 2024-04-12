import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "./logo.jpg";
import "./style.css";
import { FaLocationArrow } from "react-icons/fa";
import { RiRectangleLine } from "react-icons/ri";
import { FaRegCircle } from "react-icons/fa";
import { IoRemoveOutline } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";
import { FaImages } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { BsMoonStars } from "react-icons/bs";

function MyNavbar({
  mode,
  setMode,
  setCurrent,
  current,
  currentColor,
  setCurrentColor,
}) {
  const handleMode = () => {
    if (mode === "dark") {
      setMode("light");
    } else {
      setMode("dark");
    }
  };

  function imageClicked(e) {
    e.target.style.backgroundColor = "red";
  }

  function handleChangeColor(e) {
    setCurrent("");
    setCurrentColor(e.target.value);
  }
  return (
    <>
      <Navbar bg={mode} data-bs-theme={mode}>
        <Container>
          <Navbar.Brand>
            <img
              className="brand-logo"
              width="30px"
              height="30px"
              src={logo}
              alt="logo"
            />
          </Navbar.Brand>
          <div className="me-auto tools ">
            <FaLocationArrow
              className="icon"
              style={{
                color: mode === "dark" ? "white" : "black",
                backgroundColor: current === "select" ? "grey" : "",
              }}
              onClick={() => setCurrent("select")}
            />
            <IoRemoveOutline
              className="icon"
              style={{
                color: mode === "dark" ? "white" : "black",
                backgroundColor: current === "outline" ? "grey" : "",
              }}
              onClick={() => setCurrent("outline")}
            />
            <RiRectangleLine
              className="icon"
              style={{
                color: mode === "dark" ? "white" : "black",
                backgroundColor: current === "rectangle" ? "grey" : "",
              }}
              onClick={() => setCurrent("rectangle")}
            />

            <FaRegCircle
              className="icon"
              style={{
                color: mode === "dark" ? "white" : "black",
                backgroundColor: current === "circle" ? "grey" : "",
              }}
              onClick={() => setCurrent("circle")}
            />
            <FaRegStar
              className="icon"
              style={{
                color: mode === "dark" ? "white" : "black",
                backgroundColor: current === "star" ? "grey" : "",
              }}
              onClick={() => setCurrent("star")}
            />
            <FaImages
              className="icon"
              style={{
                color: mode === "dark" ? "white" : "black",
                backgroundColor: current === "img" ? "grey" : "",
              }}
              onClick={imageClicked}
            />
            <FaPencilAlt
              className="icon"
              style={{
                color: mode === "dark" ? "white" : "black",
                backgroundColor: current === "pencil" ? "grey" : "",
              }}
              onClick={() => setCurrent("pencil")}
            />
            <input
              className="icon"
              type="color"
              value={currentColor}
              onChange={handleChangeColor}
              onClick={() => setCurrent("")}
            ></input>
          </div>
          <button className="darkMode" onClick={handleMode}>
            <BsMoonStars />
          </button>
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavbar;
