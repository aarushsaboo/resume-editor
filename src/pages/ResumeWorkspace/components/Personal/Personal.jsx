import { useInputWidth } from "../../../../hooks/useInputWidth"
import styles from "./Personal.module.css"

const Personal = ({ leftIconStyles, rightIconStyles }) => {
  const {
    value: nameText,
    inputWidth: nameWidth,
    handleInput: handleNameInput,
    hiddenText: nameHiddenText,
  } = useInputWidth({ initialValue: "NAME" })

  const {
    value: detailsText,
    inputWidth: detailsWidth,
    handleInput: handleDetailsInput,
    hiddenText: detailsHiddenText,
  } = useInputWidth({
    initialValue: "India | Phone # | abc@gmail.com | LinkedIn Link",
  })

  return (
    <div className={styles.personal}>
      <div className={styles.nameContainer}>
        <div className={leftIconStyles}></div>
        <div className={styles.name}>
          <input
            type="text"
            value={nameText}
            onChange={handleNameInput}
            className={styles.nameInput}
            style={{ width: nameWidth }}
          />
          <span
            ref={nameHiddenText}
            className={styles.hiddenText}
            aria-hidden="true"
          >
            {nameText}
          </span>
        </div>
        <div className={rightIconStyles}></div>
      </div>
      <div className={styles.container}>
        <div className={styles.otherPersonalDetailsContainer}>
          <div className={leftIconStyles}></div>
          <div className={styles.otherPersonalDetails}>
            <input
              type="text"
              value={detailsText}
              onChange={handleDetailsInput}
              className={styles.detailsInput}
              style={{ width: detailsWidth }}
            />
            <span
              ref={detailsHiddenText}
              className={styles.hiddenText}
              aria-hidden="true"
            >
              {detailsText}
            </span>
          </div>
          <div className={rightIconStyles}></div>
        </div>
      </div>
    </div>
  )
}

export default Personal
