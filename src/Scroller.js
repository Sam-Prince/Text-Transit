import React, { useState, useEffect } from "react";
import classNames from "classnames";

function TextScroller({ text, screenWidth=20, speed=5 }) {
  const [styledChars, setStyledChars] = useState([])
  const [visibleChars, setVisibleChars] = useState([])
  
  useEffect(
    function getStyle() {
      const stylised = ParseText(text)
      const classnamedChars = []
      for (let i = 0; i < stylised.chars.length; i++) {
        classnamedChars.push({
          char: stylised.chars[i],
          colour: stylised.colour[i],
          style: classNames({
            "font-bold": stylised.bold[i],
            "underline": stylised.underlined[i] })
        })
      }
      for (var i = 0; i < screenWidth; i++) {
        classnamedChars.unshift({char: ' '})
        classnamedChars.push({char: ' '})
      }
      setStyledChars(classnamedChars)
    },
    [text, screenWidth]
  )

  useEffect(() => {
    let offset = 0
    function scrollText() {
      if (offset > styledChars.length - screenWidth - 2) {
        offset = 0
      } else{
        offset += 1
      }
      setVisibleChars(styledChars.slice(offset, offset + screenWidth))
    }
    const intervalId = setInterval(scrollText, 1000 / speed)
    return () => clearInterval(intervalId)
  },[styledChars, speed, screenWidth])

  return (
    <div className="flex py-4 border border-zinc-700 text-6xl font-mono">
      {visibleChars.map((styleChar, index) => (
        <div 
          className={styleChar.style}
          key={`${styleChar.char}-${index}`}
          style={{ color: `${styleChar.colour}` }}>
          {styleChar.char === " " ? "\u00A0" : styleChar.char}
        </div>
      ))}
    </div>
  );
}

// Parses the raw text, outputs seperate lists for each style Eg. underline, colour
function ParseText(text) {
  const parsedText = {chars:[],bold:[],underlined:[],colour:[]}
  let underlineActive = 0
  let boldActive = 0
  const colourStack = []
  const chars = text.split("")
  const tagRegex = new RegExp(/^\[((\/?B|\/?U|\/C)|(C:#\w{6}))\]/)
  
  let i = 0
  while (i < chars.length) {
    const r = tagRegex.exec(chars.slice(i).join(''))
    const char = chars[i]
    if (r){
      switch(r[0]) {
        case '[B]':
          boldActive += 1
          chars.splice(i,3)
          break
        case '[/B]':
          boldActive -= 1
          chars.splice(i,4)
          break
        case '[U]':
          underlineActive += 1
          chars.splice(i,3)
          break
        case '[/U]':
          underlineActive -= 1
          chars.splice(i,4)
          break
        case '[/C]':
          colourStack.pop()
          chars.splice(i,4)
          break
        default:
          colourStack.push(chars.slice(i+3,i+10).join(''))
          chars.splice(i,11)
      }
      continue
    }
    parsedText.chars.push(char)
    parsedText.bold.push(boldActive > 0 ? true : false)
    parsedText.underlined.push(underlineActive > 0 ? true : false)
    parsedText.colour.push(colourStack.slice(-1).join())
    i++
  }
  return parsedText
}

export default TextScroller;
