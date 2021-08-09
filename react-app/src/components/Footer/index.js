import React, { useState } from 'react'
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import BuildIcon from '@material-ui/icons/Build';
import { DiPython, DiReact, DiNodejs } from 'react-icons/di'
import { SiJavascript, SiRedux, SiDocker, SiHeroku, SiFlask, SiPostgresql, SiPostman, SiAmazonaws, SiHtml5, SiCss3, SiMaterialUi } from 'react-icons/si'
import './footer.css'


function Footer() {
    const [technologies, setTechnologies] = useState(false)


    return (
        <div className="footer">
            <div className={`tools ${technologies ? 'tools-active' : ''}`}>
                <p>Built with</p>
                <SiJavascript style={{ paddingRight: '10px' }}></SiJavascript>
                    <SiHtml5 style={{paddingRight: '10px'}}></SiHtml5>
                    <SiCss3 style={{paddingRight: '10px'}}></SiCss3>
                    <DiNodejs style={{paddingRight: '10px'}}></DiNodejs>
                    <DiReact style={{paddingRight: '10px'}}></DiReact>
                    <SiRedux style={{paddingRight: '10px'}}></SiRedux>
                    <DiPython style={{paddingRight: '10px'}}></DiPython>
                    <SiFlask style={{paddingRight: '10px'}}></SiFlask>
                    <SiPostgresql style={{paddingRight: '10px'}}></SiPostgresql>
                    <SiDocker style={{paddingRight: '10px'}}></SiDocker>
                    <SiAmazonaws style={{paddingRight: '10px'}}></SiAmazonaws>
                    <SiHeroku style={{paddingRight: '10px'}}></SiHeroku>
                    <SiPostman style={{paddingRight: '10px'}}></SiPostman>
                    <SiMaterialUi style={{paddingRight: '10px'}}></SiMaterialUi>
                    <div className="t"></div>
            </div>
            <div className='technologies'>
                    <div id='copyright'>© 2021 Astrogram. No rights reserved.</div>
                <a href="https://github.com/JeffersonGarcia15" style={{ textDecoration: "none" }}>
                    About the Developer
                </a>
                {/* <Tooltip className='technology-list'> */}
                    <BuildIcon onMouseEnter={() => setTechnologies(true)} onMouseLeave={() => setTechnologies(false)} style={{fontSize: '25px', paddingRight: '15px'}} />
                {/* </Tooltip> */}
                <a href="https://github.com/JeffersonGarcia15/Astrogram">
                    <GitHubIcon />
                </a>
                <a href="https://www.linkedin.com/in/jefferson-lopez-garcia/">
                    <LinkedInIcon/>
                </a>
            </div>
        </div >
    );
}

export default Footer