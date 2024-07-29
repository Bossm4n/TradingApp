import { Sign } from "crypto"
import Navbar from "../components/Navbar"
import React, {useState} from "react"

const Signup = ()=>{
    const [email, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleUsername = (e:any)=>{setUsername(e.target.value)}
    const handlePassword = (e:any)=>{setPassword(e.target.value)}
    const handleSubmit = ()=>{}
    return(<>
        <Navbar/>
            <div>
                <p>Email</p>
                <input type="text" onChange={handleUsername} value={email}></input>
                <p>Password</p>
                <input type="password" onChange={handlePassword} value={password}></input>
                <button onClick={handleSubmit} style={{marginTop:"10px"}}>Sign up</button>
            </div>
    </>)
}

export default Signup;
