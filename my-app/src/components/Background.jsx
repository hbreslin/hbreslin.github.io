import linesVector from "../assets/linesVector.png";
import vector1 from "../assets/Vector1.png";
import Introduction from "./Introduction";
import { AppContext } from "../AppContext";
import { useContext } from "react";

export default function Background() {
  const { siteView, setSiteView } = useContext(AppContext);
  function onHome() {
    setSiteView(0);
  }
  function onProject() {
    setSiteView(1);
  }
  function onResume() {
    setSiteView(2);
  }
  function onAboutMe() {
    setSiteView(4);
  }
  return (
    <>
      <div className="Header raised-element">
        <button onClick={onHome}>H. Breslin</button>
        {/* <a href=""><b>HOME</b></a> */}
        <div>
          <button onClick={onAboutMe}>ABOUT</button>
          <button onClick={onProject}>PROJECTS</button>
          <button onClick={onResume}>RESUME</button>
          {/* <a href="" on><b>ABOUT</b></a>
                    <a href=""><b>PROJECTS</b></a>
                    <a href=""><b>RESUME</b></a> */}
          {/* <a href=""><b>CONTACT</b></a> */}
        </div>
      </div>
      <div className="LineDesign">
        <img src={vector1} alt="" />
        <img src={linesVector} alt="" />
      </div>
    </>
  );
}
