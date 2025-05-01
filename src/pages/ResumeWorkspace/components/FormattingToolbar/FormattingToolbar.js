import React from "react"
import styles from "./FormattingToolbar.module.css"

// Icons (assuming you have these)
import { FaBold, FaItalic, FaUnderline, FaListUl, FaUndo, FaRedo, 
         FaPlus, FaMinus, FaArrowsAltV, FaRuler, FaChevronLeft, 
         FaChevronRight, FaSync, FaSearchPlus, FaSearchMinus } from 'react-icons/fa'

const FormattingToolbar = ({
  onCommand,
  onZoomIn,
  onZoomOut,
  zoomValue,
  isBoldActive,
  isItalicActive,
  isUnderlineActive,
  currentPage = 1,
  totalPages = 1,
  orientation = "portrait"
}) => {
  // Define active button style
  const activeButtonStyle = {
    backgroundColor: "#3B82F6", // Blue background
    color: "white"              // White text
  };

  return (
    <div className={styles.formattingToolbar}>
      {/* Text formatting options */}
      <div className={styles.group}>
        <button 
          onClick={() => onCommand("undo")}
          title="Undo"
        >
          <FaUndo />
        </button>
        <button 
          onClick={() => onCommand("redo")}
          title="Redo"
        >
          <FaRedo />
        </button>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.group}>
        <button 
          onClick={() => onCommand("bold")}
          title="Bold"
          style={isBoldActive ? activeButtonStyle : {}}
        >
          <FaBold />
        </button>
        <button 
          onClick={() => onCommand("italic")}
          title="Italic"
          style={isItalicActive ? activeButtonStyle : {}}
        >
          <FaItalic />
        </button>
        <button 
          onClick={() => onCommand("underline")}
          title="Underline"
          style={isUnderlineActive ? activeButtonStyle : {}}
        >
          <FaUnderline />
        </button>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.group}>
        <button 
          onClick={() => onCommand("insertUnorderedList")}
          title="Bullet List"
        >
          <FaListUl />
        </button>
      </div>

      <div className={styles.divider}></div>

      {/* Font size controls */}
      <div className={styles.group}>
        <button 
          onClick={() => onCommand("increaseFontSize")}
          title="Increase Font Size"
        >
          <FaPlus /> A
        </button>
        <button 
          onClick={() => onCommand("decreaseFontSize")}
          title="Decrease Font Size"
        >
          <FaMinus /> A
        </button>
      </div>

      <div className={styles.divider}></div>

      {/* Line spacing controls */}
      <div className={styles.group}>
        <button 
          onClick={() => onCommand("increaseLineSpacing")}
          title="Increase Line Spacing"
        >
          <FaArrowsAltV /> <FaPlus />
        </button>
        <button 
          onClick={() => onCommand("decreaseLineSpacing")}
          title="Decrease Line Spacing"
        >
          <FaArrowsAltV /> <FaMinus />
        </button>
      </div>

      <div className={styles.divider}></div>

      {/* Margin adjustment */}
      <div className={styles.group}>
        <button 
          onClick={() => onCommand("adjustMargin")}
          title="Adjust Margins"
        >
          <FaRuler />
        </button>
      </div>

      <div className={styles.divider}></div>

      {/* Page navigation */}
      <div className={styles.group}>
        <button 
          onClick={() => onCommand("prevPage")}
          title="Previous Page"
          disabled={currentPage <= 1}
        >
          <FaChevronLeft />
        </button>
        <span className={styles.pageInfo}>
          {currentPage} / {totalPages}
        </span>
        <button 
          onClick={() => onCommand("nextPage")}
          title="Next Page"
          disabled={currentPage >= totalPages}
        >
          <FaChevronRight />
        </button>
      </div>

      <div className={styles.divider}></div>

      {/* Rotation control */}
      <div className={styles.group}>
        <button 
          onClick={() => onCommand("rotate")}
          title={`Rotate to ${orientation === 'portrait' ? 'Landscape' : 'Portrait'}`}
        >
          <FaSync /> {orientation === 'portrait' ? 'L' : 'P'}
        </button>
      </div>

      <div className={styles.divider}></div>

      {/* Zoom controls */}
      <div className={styles.group}>
        <button 
          onClick={onZoomOut}
          title="Zoom Out"
        >
          <FaSearchMinus />
        </button>
        <span className={styles.zoomValue}>{zoomValue}%</span>
        <button 
          onClick={onZoomIn}
          title="Zoom In"
        >
          <FaSearchPlus />
        </button>
      </div>

      <div className={styles.divider}></div>

      {/* Reset formatting button */}
      <div className={styles.group}>
        <button 
          onClick={() => onCommand("removeFormat")}
          title="Remove Formatting"
        >
          Clear Format
        </button>
      </div>
    </div>
  )
}

export default FormattingToolbar