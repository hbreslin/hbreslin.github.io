import data from "../assets/introduction.json";
import introImg from "../assets/im3.png";
import haleyImg from "../assets/haley1.jpg";
import pythonLogo from "../assets/python-logo-only.png";

export default function Introduction() {
  return (
    <>
      <div className="Introduction">
        <img src={haleyImg} alt="" className="HomeImage .raised-element" />
        <div className="Description">
          <h1
            style={{
              paddingTop: "4rem",
              marginBottom: "0rem",
              paddingBottom: "0rem",
            }}
          >
            Hey, I'm Haley!
          </h1>
          <h2>Student, Researcher, Creative</h2>
          <h3 style={{ paddingTop: "0.5rem", marginTop: "0rem" }}>
            {data.introductionText.map((text, index) => (
              <span key={index}>
                {text}
                <br />
              </span>
            ))}
          </h3>
          <div className="Skills">
            {/* skills scrolling */}
            <img
              src={pythonLogo}
              alt=""
              style={{ backgroundColor: "#ffffff00" }}
              className="SkillImg"
            />
            <img src={null} alt="SkillImg" className="SkillImg" />
            <img src={null} alt="SkillImg" className="SkillImg" />
            <img src={null} alt="SkillImg" className="SkillImg" />
            <img src={null} alt="SkillImg" className="SkillImg" />
          </div>
        </div>
      </div>
    </>
  );
}
