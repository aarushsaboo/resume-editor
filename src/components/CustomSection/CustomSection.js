import { useState, useRef, useEffect } from "react"
import styles from "./CustomSection.module.css"
import Heading from "../Heading/Heading"

const EntryRow = ({
  onKeyDown,
  leftIconStyles,
  rightIconStyles,
  autoFocus,
}) => {
  const [keyText, setKeyText] = useState("")
  const [valueText, setValueText] = useState("")
  const keyInputRef = useRef(null)
  const valueTextareaRef = useRef(null)

  const handleKeyInput = (e) => {
    setKeyText(e.target.value)
    adjustInputWidth(e.target)
  }

  const handleValueInput = (e) => {
    setValueText(e.target.value)
    adjustTextareaHeight(e.target)
  }

  const adjustInputWidth = (element) => {
    if (!element) return
    const span = document.createElement("span")
    span.style.fontSize = "14px"
    span.style.fontFamily = "Times New Roman"
    span.style.fontWeight = "700"
    span.style.visibility = "hidden"
    span.style.position = "absolute"
    span.style.whiteSpace = "pre"
    span.textContent = element.value || element.placeholder
    document.body.appendChild(span)
    const width = span.getBoundingClientRect().width
    document.body.removeChild(span)
    // Remove the +10 padding, just use the exact text width
    element.style.width = `${Math.max(50, width)}px`
  }

  const adjustTextareaHeight = (element) => {
    if (!element) return
    element.style.height = "16px" // Reset to single line
    const scrollHeight = element.scrollHeight
    element.style.height = scrollHeight + "px"
  }

  useEffect(() => {
    adjustInputWidth(keyInputRef.current)
    adjustTextareaHeight(valueTextareaRef.current)
  }, [keyText, valueText])

  useEffect(() => {
    if (autoFocus && keyInputRef.current) {
      keyInputRef.current.focus()
    }
  }, [autoFocus])

  return (
    <div className={styles.container2}>
      <div className={leftIconStyles}></div>
      <div className={styles.fieldGroup}>
        <div className={styles.untitled1}>
          <input
            ref={keyInputRef}
            type="text"
            value={keyText}
            onChange={handleKeyInput}
            onKeyDown={onKeyDown}
            className={styles.input}
            placeholder="Untitled"
          />
          <div className={rightIconStyles}></div>
        </div>
        <div className={styles.colon}>:&nbsp;</div>
        <div className={styles.untitled2}>
          <textarea
            ref={valueTextareaRef}
            value={valueText}
            onChange={handleValueInput}
            onKeyDown={onKeyDown}
            className={styles.textarea}
            placeholder="Untitled"
          />
        </div>
      </div>
    </div>
  )
}

const CustomSection = ({ leftIconStyles, rightIconStyles }) => {
  const [entries, setEntries] = useState([{ id: 1 }])

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      const newEntry = {
        id: Math.max(...entries.map((e) => e.id)) + 1,
      }
      setEntries([...entries, newEntry])
    }
  }

  return (
    <div className={styles.customSection}>
      <Heading
        heading="CUSTOM SECTION"
        leftIconStyles={leftIconStyles}
        rightIconStyles={rightIconStyles}
      />
      {entries.map((entry, index) => (
        <EntryRow
          key={entry.id}
          onKeyDown={handleKeyDown}
          leftIconStyles={leftIconStyles}
          rightIconStyles={rightIconStyles}
          autoFocus={index === entries.length - 1} // Auto-focus the last entry
        />
      ))}
    </div>
  )
}

export default CustomSection
