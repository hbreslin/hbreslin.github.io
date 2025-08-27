import data from "../assets/introduction.json"
import introImg from "../assets/im3.png"
import pythonLogo from "../assets/python-logo-only.png"

export default function Introduction(){
    return(
        <>
            <div className="Introduction">
                <img src={introImg} alt="" className="HomeImage .raised-element"/>
                <div className="Description">
                    <h2>Hey, I'm Haley!</h2>
                    <h3>
                        {data.introductionText.map((text, index) => (
                            <span key={index}>
                                {text}
                                <br />
                            </span>
                        ))}
                    </h3>
                    <div className="Skills">
                        {/* skills scrolling */}
                        <img src={pythonLogo} alt="" style={{backgroundColor:"#ffffff00"}} className="SkillImg"/>
                        <img src={null} alt="SkillImg" className="SkillImg"/>
                        <img src={null} alt="SkillImg" className="SkillImg"/>
                        <img src={null} alt="SkillImg" className="SkillImg"/>
                        <img src={null} alt="SkillImg" className="SkillImg"/>
                    </div>
                </div>

            </div>
        </>
    )
}