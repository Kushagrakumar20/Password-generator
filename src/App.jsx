import { useCallback, useState, useEffect, useRef } from "react"


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("")
  
  const passwordRef = useRef(null)

  const pswdgenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if(numberAllowed) str += '1023456789'
    if(charAllowed) str += "!@#$%&*?/"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setPassword(pass) 


  }, [length,numberAllowed,charAllowed,setPassword])
  
  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 101);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    pswdgenerator()

  },[length,numberAllowed,charAllowed,pswdgenerator])
  return (
    <>
      <div className="w-full bg-teal-500 max-w-md mx-auto shadow-xl rounded px-4 py-4 my-8 text-black-400">
        <h1 className="text-black-500 text-center font-mono text-xl py-2">Password Generator</h1>
        <div className="flex shadow rounded-xl overflow-hidden mb-4 py-5 text-orange-500">
          <input type="text"
          value={password}
          className="outline-none w-full py-1 px-3" 
          placeholder="Password"
          readOnly
          ref = {passwordRef}
          />
          <button
          onClick={copyToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-2 shrink-0">COPY</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input 
            type="range" 
            min={8}
            max={100}
            value={length}
            className="cursor-pointer" 
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label className="text-lime-900">Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {setnumberAllowed((prev) => !prev);
            }} />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {setCharAllowed((prev) => !prev);
            }} />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
