import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
      
    <div className="small-container">
        <div class="row-1">
            <div>
                <h3 style={{color: "grey"}}>Developed By :</h3><br/>
                <h2 style={{textDecoration : "underline wavy grey 2px"}}>Akash Karthik M</h2>
                <br/>
            </div>
            <div>
                <a href="https://www.linkedin.com/in/akashkarthik/" target="_blank" rel="noreferrer" 
                class="btn">LinkedIn</a>
            </div>
            <div>
                <a href="https://github.com/akashkarthikm" target="_blank" rel="noreferrer" 
                class="btn">Github</a>
            </div>
            <div>
                <a href="https://www.instagram.com/karthik.ig/" target="_blank" rel="noreferrer" 
                class="btn">Instagram</a>
            </div>
        </div>
    
        <br/>
        <Link to='/'>Go Back</Link>

    </div>
  )
}

export default About