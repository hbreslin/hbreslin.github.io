import { useEffect, useRef, useContext } from "react";
import data from "../Jsons/introduction.json";
import haleyImg from "../assets/haley1.jpg";
import { AppContext } from "../AppContext";
import "../styling/AboutMe.css";
import { AnimatePresence, motion } from "framer-motion";

export default function AboutMe() {
  const scrollRef = useRef(null);
  const { siteView } = useContext(AppContext);

  // Reset scroll on mount
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, []);

  useEffect(() => {
    if (siteView !== 4) return;

    function handleWheel(e) {
      const el = scrollRef.current;
      if (!el) return;

      const atTop = el.scrollTop === 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

      if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
        return;
      }

      el.scrollBy({ top: e.deltaY });
    }

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [siteView]);

  return (
    <div className="AboutMePage">
      <div className="AboutMe">
        {/* Image Section */}
        <div className="AboutMeImageDiv">
          <h2 style={{ marginBottom: "0.5rem", marginTop: "0rem" }}>
            About Haley
          </h2>
          <h3 style={{ margin: "0rem 0rem" }}>
            Designer & Researcher | Game Design, UI/UX, HCI
          </h3>
          <div className="AboutMeImageWrapper">
            <img src={haleyImg} alt="Haley Breslin" />
          </div>
        </div>
        {/* Bio Section */}
        {/* <h3>Personal Statement</h3>
        <h3>Bio</h3> */}
        <AnimatePresence mode="wait">
          <motion.div
            className="AboutMeDescription hide-scroll"
            ref={scrollRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="aboutme-section-header">Personal Statement</h3>
            {data.introductionText.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
            <h3 className="aboutme-section-header">Bio</h3>

            {data.bioText.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
