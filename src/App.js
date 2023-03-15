import './App.css';
import { useState } from "react";
import Scroller from "./Scroller"

function App() {
  const [textValue, setTextValue] = useState("")
  const [speedValue, setSpeedValue] = useState("")
  const [widthValue, setWidthValue] = useState("")

  const defValue = {
    text: "[C:#FF0000]All of this text is Red, but [C:#0000FF][B][U]THIS[/U][/B] text is Blue.[/C][/C]",
    speed: 5,
    width: 20
  }
  const [output, setOutput] = useState(defValue)
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setOutput({
        text: textValue?textValue:defValue.text,
        speed: speedValue?+speedValue:defValue.speed,
        width: widthValue?+widthValue:defValue.width
      })
      setTextValue('')
    }
  }

  return (
    <div className='flex flex-col h-screen justify-between'>
      <div className='App-header h-screen'>
        <Scroller
          text={output.text}
          screenWidth={output.width}
          speed={output.speed}
        />
      </div>

      <footer className='w-full'>
        <div className='flex'>
          <input
            className='appearance-none w-full p-4 bg-zinc-700 text-white text-3xl font-mono font-extrabold border-2 border-zinc-600 focus:outline-none focus:shadow-outline'
            placeholder='Speed: 5'
            value={speedValue}
            onKeyDown={handleKeyDown}
            onChange={(e) => setSpeedValue(e.target.value)} />
          <input
            className='appearance-none w-full p-4 bg-zinc-700 text-white text-3xl font-mono font-extrabold border-2 border-zinc-600 focus:outline-none focus:shadow-outline'
            placeholder='Width: 20'
            value={widthValue}
            onKeyDown={handleKeyDown}
            onChange={(e) => setWidthValue(e.target.value)} />
        </div>
        <input
          className='appearance-none w-full p-4 bg-zinc-700 text-white text-3xl font-mono font-extrabold border-2 border-zinc-600 focus:outline-none focus:shadow-outline'
          placeholder='Text Input...'
          autoFocus={true}
          value={textValue}
          onKeyDown={handleKeyDown}
          onChange={(e) => setTextValue(e.target.value)} />
      </footer>
    </div>
  );
}

export default App;
