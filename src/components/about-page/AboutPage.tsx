import { NavigateFunction, useNavigate } from "react-router";
const About = () => {
  
    let navigate: NavigateFunction = useNavigate();

    return (
        <div className = "App">
                <h2 className = 'page header'>
                    About Contact List
                </h2>
                <center>
                    <p>
                        Contact List. Simple idea. Big impact. Born in the digital age, a time of chaos and connection.  
                        A place to gather names, numbers, the scattered fragments of human connection. 
                    </p> 
                        Early days, rough and raw.  Updates came, slow and steady.  Features added, one by one.  
                        Users flocked, millions strong.  A lifeline in a world drowning in information.  Contact List. 
                    <p>
                        It just worked.  Clean, efficient, a digital Rolodex for the masses.  No bells and whistles, no fanfare.  
                        Just the essentials, honed and perfected.  A testament to simplicity, a quiet giant in the bustling online world.
                    </p>
                    <p>
                        Contact List.  Enduring. Essential.
                    </p>  
                </center>
        </div>
  )
}

export default About;