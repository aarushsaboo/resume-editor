// this is when there's an initialValue of "Heading" & we return width ( depending on "Heading" in the beginning & later on )
import { useState, useRef, useEffect } from "react"

export const useInputWidth = ({ initialValue }) => {
  const [value, setValue] = useState(initialValue)
  const [inputWidth, setInputWidth] = useState("0")
  const hiddenText = useRef(null)

  useEffect(() => {
    // Set initial width based on initialValue
    if (hiddenText.current) {
      const width = getTextWidth(initialValue)
      setInputWidth(`${width}px`)
    }
  }, [])

  // Update when initialValue changes externally
  useEffect(() => {
    setValue(initialValue)
    if (hiddenText.current) {
      const width = getTextWidth(initialValue)
      setInputWidth(`${width}px`)
    }
  }, [initialValue])

  // util
  const getTextWidth = (text) => {
    if (hiddenText.current) {
      hiddenText.current.textContent = text
      return hiddenText.current.offsetWidth
    }
    return 0
  }

  const handleInput = (e) => {
    const newValue = e.target.value
    setValue(newValue)
    const width = getTextWidth(newValue)
    setInputWidth(`${width}px`)
  }

  return {
    value,
    inputWidth,
    handleInput,
    hiddenText,
  }
}
