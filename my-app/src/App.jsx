import { useState, useEffect, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";
import "./styling/Mobile.css";
import Background from "./components/Background";
import Introduction from "./components/Introduction";
import MobileIntroduction from "./components/MobileIntroduction"; // new mobile component
import Project from "./components/Project";
import { AppContext } from "./AppContext";
import projects from "./Jsons/projects.json";
import Resume from "./components/Resume";
import CaseStudy from "./components/CaseStudy";
import AboutMe from "./components/AboutMe";

function App() {
  const [projectPage, setProjectPage] = useState(0);
  const [numProjects, setNumProjects] = useState(projects.length);
  const [siteView, setSiteView] = useState(0);

  // New: track if we're on mobile
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 1020, // initial check
  );

  // Update on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1020);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AppContext.Provider
      value={{
        projectPage,
        setProjectPage,
        numProjects,
        setNumProjects,
        siteView,
        setSiteView,
      }}
    >
      <>
        {isMobile ? (
          <div className="mobile-placeholder">
            <h1>Mobile Coming Soon</h1>
            <p>
              This site is best experienced on desktop for now. Mobile support
              is on the way!
            </p>
          </div>
        ) : (
          <>
            <Background />

            <AnimatePresence mode="wait">
              {siteView === 0 && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Introduction />
                </motion.div>
              )}

              {/* rest unchanged */}
            </AnimatePresence>
          </>
        )}
      </>
    </AppContext.Provider>
  );
}

export default App;
