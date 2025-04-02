import reactCorePic from "../assets/react-core-concepts.png";
import "./Header.css";

const reactDescriptions = ["Fundamental", "Crucial", "Core"];

function Header() {
  const randomDescription = reactDescriptions[Math.floor(Math.random() * reactDescriptions.length)];

  return (
    <header>
      <img src={reactCorePic} alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {randomDescription} React concepts you will need for almost any app you are going to build!
      </p>
    </header>
  );
}

export default Header;