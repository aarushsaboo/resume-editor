import { useState, useRef } from "react"
import styles from "./BulletContainer.module.css"

const BulletContainer = () => {
  const [values, setValues] = useState(["", "", ""])
  const containerRef = useRef(null)

  const handleInputChange = (index, e) => {
    const newValues = [...values]
    newValues[index] = e.target.value
    setValues(newValues)

    // Adjust textarea height
    e.target.style.height = "auto"
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  return (
    <div className={styles.bulletContainer} ref={containerRef}>
      {[0, 1, 2].map((index) => (
        <div key={index} className={styles.bullet}>
          <div
            className={`${styles.bulletWrapper} ${
              values[index] ? styles.hasContent : ""
            }`}
          >
            <textarea
              className={styles.bulletInput}
              placeholder={`Experience ${index + 1}`}
              value={values[index]}
              onChange={(e) => handleInputChange(index, e)}
              rows={1}
              style={{
                width: "100%",
                resize: "none",
                overflow: "hidden",
                height: "auto",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default BulletContainer
