import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import e from "cors"
import { useNavigate } from "react-router-dom"

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={e=>{setUsername(e.target.value);}} placeholder="John Doe" label={"Username"} />
        <InputBox onChange={e=>{setEmail(e.target.value);}} placeholder="johndoe@gmail.com" label={"Email"} />
        <InputBox onChange={e=>{setPassword(e.target.value);}} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async ()=>{
            e.preventDefault();
            await axios.post("http://localhost:3000/api/v1/user/signup", {
              username,
              email,
              password
            })
          }} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}