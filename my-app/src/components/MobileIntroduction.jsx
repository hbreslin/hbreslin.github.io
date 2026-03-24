import pythonLogo from "../assets/python-logo-only.png";
import unityLogo from "../assets/unityIm.png";
import cLogo from "../assets/C.png";
import reactLogo from "../assets/React.png";
import figmaLogo from "../assets/Figma.png";

import { useEffect, useContext, useState, useRef } from "react";
import projects from "../Jsons/projects.json";

import "../styling/Mobile.css";
import { motion, AnimatePresence } from "framer-motion";
import WordCloud from "../components/WordCloud";

export default function Introduction() {
  const scrollRef = useRef(null);
  const [imageIndex, setImageIndex] = useState(0);

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
      <div className="mobile-container">
        <div className="Description">
          <h1>Hey, I'm Haley!</h1>
          <h2>Designer, Researcher, Creative</h2>
          {/* <WordCloud words={myWords} /> */}
        </div>
      </div>
    </>
  );
}
