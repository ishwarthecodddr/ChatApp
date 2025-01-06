import { useEffect, useRef, useState } from 'react';
import './App.css'

function App() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setmesssages] = useState(["hello", "kaise ho"]);
  useEffect(() => {  // we want to connect to the server when the component is mounted
    const ws = new WebSocket("ws://localhost:5000");
    ws.onmessage = (event) => {
      setmesssages(messages => [...messages, event.data])
    }
    setWs(ws);
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          "roomId": "red"
        }
      }));
    }
  }, [])
  const inputRef = useRef<HTMLInputElement>(null);
  function sendmessage() {
    if (ws) {
      //@ts-ignore
      ws.send(JSON.stringify({
        type: "chat",
        payload: {
          "message": inputRef.current?.value
        }
      }))
    }
    if (inputRef.current) {
      inputRef.current.value = ' ';
    }
  }
  return (
    <>
      <div >
        {messages.map((message => <div className='bg-white  text-black p-2 m-2 rounded-md'><span>{message}
        </span></div>))}
      </div>
      <input className='p-2 m-2 rounded-md' ref={inputRef} type="text" placeholder='type message' />
      <button className='bg-purple-400/40 hover:bg-purple-400 ' onClick={sendmessage}>Send</button>
    </>
  )
}

export default App
