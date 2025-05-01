import { useState, useCallback } from "react"

export const useDatePicker = () => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [isStartPickerOpen, setIsStartPickerOpen] = useState(false)
  const [isEndPickerOpen, setIsEndPickerOpen] = useState(false)

  const formatDate = (date) => {
    if (!date) return ""
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    })
  }

  const toggleStartPicker = () => {
    setIsStartPickerOpen(!isStartPickerOpen)
    setIsEndPickerOpen(false)
  }

  const toggleEndPicker = () => {
    setIsEndPickerOpen(!isEndPickerOpen)
    setIsStartPickerOpen(false)
  }

  const closePickers = useCallback(() => {
    setIsStartPickerOpen(false)
    setIsEndPickerOpen(false)
  }, [])

  return {
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
  }
}
