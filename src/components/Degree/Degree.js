import { useDynamicWidth } from "../../hooks/useDynamicWidth"
import { useDatePicker } from "../../hooks/useDatePicker"
import { useClickOutside } from "./hooks/useClickOutside"
import DatePicker from "react-datepicker"
import { useEffect, useRef } from "react"
import "react-datepicker/dist/react-datepicker.css"
import styles from "./Degree.module.css"

const Degree = ({ degree, leftIconStyles, rightIconStyles }) => {
  const {
    value: degreeText,
    inputWidth: degreeWidth,
    handleInput: handleDegreeInput,
    hiddenText: degreeHiddenText,
  } = useDynamicWidth({ placeholder: degree })
  // here the degree (placeholder) is actually "Degree". That's being passed down from the parent.

  const {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    isStartPickerOpen,
    isEndPickerOpen,
    toggleStartPicker,
    toggleEndPicker,
    formatDate,
    closePickers,
  } = useDatePicker()

  const datePickerRef = useRef(null)
  useClickOutside(datePickerRef, closePickers)

  const getDateDisplay = () => {
    const start = startDate ? formatDate(startDate) : "Start Date"
    const end = endDate ? formatDate(endDate) : "Finish Date"
    return { start, end }
  }

  const dates = getDateDisplay()

  return (
    <div className={styles.degree}>
      <div className={styles.part1}>
        <div className={leftIconStyles}></div>
        <div className={styles.text}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder={degree}
              value={degreeText}
              onChange={handleDegreeInput}
              className={styles.input}
              style={{ width: degreeWidth }}
            />
          </div>
          <span
            ref={degreeHiddenText}
            className={styles.hiddenText}
            aria-hidden="true"
          ></span>
          {/* this hidden text deals with hiddenText (degreeHiddenText) */}
        </div>
        <div className={rightIconStyles}></div>
      </div>
      <div className={styles.part2}>
        <div className={styles.graduationDate} ref={datePickerRef}>
          <div className={styles.datePickerWrapper}>
            <span className={styles.dateText} onClick={toggleStartPicker}>
              {dates.start}
            </span>
            {isStartPickerOpen && (
              <div className={styles.pickerContainer}>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date)
                    toggleStartPicker()
                  }}
                  dateFormat="MMM yyyy"
                  showMonthYearPicker
                  inline
                />
              </div>
            )}
          </div>
          <span className={styles.dateSeparator}>:</span>
          <div className={styles.datePickerWrapper}>
            <span className={styles.dateText} onClick={toggleEndPicker}>
              {dates.end}
            </span>
            {isEndPickerOpen && (
              <div className={styles.pickerContainer}>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => {
                    setEndDate(date)
                    toggleEndPicker()
                  }}
                  dateFormat="MMM yyyy"
                  showMonthYearPicker
                  inline
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Degree
