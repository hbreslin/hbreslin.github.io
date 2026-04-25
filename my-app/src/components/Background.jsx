import linesVector from "../assets/linesVector.png";
import vector1 from "../assets/Vector1.png";
import { AppContext } from "../AppContext";
import { useContext, useState } from "react";

export default function Background() {
  const { siteView, setSiteView } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);

  function onHome() {
    setSiteView(0);
    setMenuOpen(false);
  }
  function onProject() {
    setSiteView(1);
    setMenuOpen(false);
  }
  function onResume() {
    setSiteView(2);
    setMenuOpen(false);
  }
  function onAboutMe() {
    setSiteView(4);
    setMenuOpen(false);
  }

  return (
    <>
      <div className="Header raised-element">
        {/* Mobile Hamburger Button */}
        <button
          className="mobile-toggle show-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Desktop Logo */}
        <button className="hide-mobile" onClick={onHome}>
          H. Breslin | HBreslin@uchicago.edu
        </button>

        {/* Desktop Links */}
        <div className="hide-mobile">
          <button onClick={onAboutMe}>ABOUT</button>
          <button onClick={onProject}>PROJECTS</button>
          <button onClick={onResume}>RESUME</button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu show-mobile raised-element">
          <button onClick={onHome}>HOME</button>
          <button onClick={onAboutMe}>ABOUT</button>
          <button onClick={onProject}>PROJECTS</button>
          <button onClick={onResume}>RESUME</button>
        </div>
      )}

      <div className="LineDesign">
        <img src={vector1} alt="" />
        <img src={linesVector} alt="" />
      </div>
    </>
  );
}
