import Navbar from '../components/Navbar'
import React, {useState} from "react"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleEmailChange=(e:any)=>{setEmail(e.target.value)}
  const handlePasswordChange=(e:any)=>{setPassword(e.target.value)}
  const handleSubmit = ()=>{}
  return (<>
    <Navbar/>
          <div>
              <p>Email</p>
              <input type="text" value={email} onChange={handleEmailChange}></input>
              <p>Password</p>
              <input type="password"  value={password}  onChange={handlePasswordChange}></input>
              <button onClick={handleSubmit}>Submit</button>
          </div>
  </>
  )
}

export default Login