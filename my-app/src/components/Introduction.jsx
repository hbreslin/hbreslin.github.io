import pythonLogo from "../assets/python-logo-only.png";
import { useEffect, useContext, useState, useRef } from "react";
import projects from "../Jsons/projects.json";
import { motion, AnimatePresence } from "framer-motion";
import WordCloud from "../components/WordCloud";

export default function Introduction() {
  const scrollRef = useRef(null);
  const [imageIndex, setImageIndex] = useState(0);
  const myWords = [
    "systems",
    "shift",
    "uncomfortable",
    "software",
    "creative",
    "technical",
    "code",
    "interface",
    "reflect",
    "linger",
    "games",
    "design",
    "interactive",
    "human",
    "machine",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 2) % projects.length);
    }, 7000); // change every 3s

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, []);
  return (
    <>
      <div className="Introduction">
        <div className="HomeImageDiv">
          <div className="image-frame">
            <AnimatePresence mode="wait">
              <motion.img
                key={imageIndex}
                src={projects[imageIndex]?.image}
                className="home-image raised-element"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              />
            </AnimatePresence>
          </div>

          <div className="image-frame">
            <AnimatePresence mode="wait">
              <motion.img
                key={imageIndex + 1}
                src={projects[(imageIndex + 1) % projects.length]?.image}
                className="home-image raised-element"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              />
            </AnimatePresence>
          </div>
        </div>
        <div className="Description">
          <h1>Hey, I'm Haley!</h1>
          <h2>Designer, Researcher, Creative</h2>
          {/* <h3>
            {data.introductionText.map((text, index) => (
              <span key={index}>
                {text}
                <br />
              </span>
            ))}
          </h3> */}
          <WordCloud words={myWords} />
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
