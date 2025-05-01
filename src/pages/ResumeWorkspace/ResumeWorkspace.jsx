import React, { useRef, useState, useEffect } from "react";
import html2pdf from "html2pdf.js";

import styles from "./ResumeWorkspace.module.css";

import Personal from "./components/Personal/Personal";
import Heading from "../../components/Heading/Heading";
import Organization from "../../components/Organization/Organization";
import Degree from "../../components/Degree/Degree";
import BulletContainer from "../../components/BulletContainer/BulletContainer";
import CustomSection from "../../components/CustomSection/CustomSection";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import SecondSidebar from "./components/SecondSidebar/SecondSidebar";
import ResumeScore from "./components/ResumeScore/ResumeScore";
import FormattingToolbar from "./components/FormattingToolbar/FormattingToolbar";

// ─────────────────────────────────────────────────────────────
// Main ResumeWorkspace component
// ─────────────────────────────────────────────────────────────
const ResumeWorkspace = () => {
  const resumeRef = useRef(null);
  const [fileName, setFileName] = useState("Untitled");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [orientation, setOrientation] = useState("portrait");

  // Track active text formatting states (for highlighting toolbar buttons)
  const [isBoldActive, setIsBoldActive] = useState(false);
  const [isItalicActive, setIsItalicActive] = useState(false);
  const [isUnderlineActive, setIsUnderlineActive] = useState(false);
  // Add state for font size and spacing
  const [fontSize, setFontSize] = useState(12);
  const [lineSpacing, setLineSpacing] = useState(1.5);
  const [margins, setMargins] = useState({ top: 20, right: 20, bottom: 20, left: 20 });
  
  // Add state to track current selection
  const [savedRange, setSavedRange] = useState(null);

  // Export to PDF logic (html2pdf)
  const exportToPDF = () => {
    const element = resumeRef.current;
    const opt = {
      margin: [margins.top, margins.right, margins.bottom, margins.left],
      filename: fileName,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        logging: false,
        useCORS: true
      },
      jsPDF: {
        unit: "mm",
        format: "letter",
        orientation: orientation
      }
    };
    html2pdf().set(opt).from(element).save();
  };

  // Save the current selection
  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      // Only save range if it's within the editable area
      if (resumeRef.current && resumeRef.current.contains(range.commonAncestorContainer)) {
        setSavedRange(range.cloneRange());
      }
    }
  };

  // Restore the previously saved selection
  const restoreSelection = () => {
    if (savedRange && resumeRef.current) {
      const selection = window.getSelection();
      selection.removeAllRanges();
      try {
        selection.addRange(savedRange);
        // Force focus on the editable area
        resumeRef.current.focus();
      } catch (e) {
        console.error("Error restoring selection", e);
      }
    }
  };

  // Check which formatting is active for the current selection
  const updateToolbarState = () => {
    setIsBoldActive(document.queryCommandState("bold"));
    setIsItalicActive(document.queryCommandState("italic"));
    setIsUnderlineActive(document.queryCommandState("underline"));
  };

  // Implement custom font size logic
  const changeFontSize = (increment) => {
    restoreSelection();
    if (savedRange) {
      const selectedText = savedRange.toString();
      if (selectedText) {
        const span = document.createElement("span");
        const newSize = increment ? fontSize + 1 : fontSize - 1;
        setFontSize(newSize);
        span.style.fontSize = `${newSize}px`;
        savedRange.surroundContents(span);
        // Re-save the selection
        saveSelection();
      }
    }
  };

  // Implement custom line spacing logic
  const changeLineSpacing = (increment) => {
    restoreSelection();
    if (savedRange) {
      const container = savedRange.commonAncestorContainer;
      const targetElement = container.nodeType === 3 ? container.parentNode : container;
      // Find the closest paragraph, div, or li element
      let block = targetElement;
      while (block && !["P", "DIV", "LI"].includes(block.nodeName)) {
        block = block.parentNode;
      }
      if (block) {
        const newSpacing = increment ? lineSpacing + 0.1 : lineSpacing - 0.1;
        setLineSpacing(parseFloat(newSpacing.toFixed(1)));
        block.style.lineHeight = newSpacing;
      }
    }
  };

  // Implement custom margin adjustment
  const handleMarginAdjustment = () => {
    const newMargins = { ...margins };
    const adjustment = window.prompt("Enter margin adjustment in pixels (e.g. 5 or -5):", "0");
    if (adjustment) {
      const value = parseInt(adjustment, 10);
      newMargins.top += value;
      newMargins.right += value;
      newMargins.bottom += value;
      newMargins.left += value;
      setMargins(newMargins);
      if (resumeRef.current) {
        resumeRef.current.style.padding = `${newMargins.top}px ${newMargins.right}px ${newMargins.bottom}px ${newMargins.left}px`;
      }
    }
  };

  // Handle page navigation
  const handlePageNavigation = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle orientation changes
  const handleRotate = () => {
    const newOrientation = orientation === "portrait" ? "landscape" : "portrait";
    setOrientation(newOrientation);
    if (resumeRef.current) {
      resumeRef.current.style.width = newOrientation === "portrait" ? "8.5in" : "11in";
      resumeRef.current.style.height = newOrientation === "portrait" ? "11in" : "8.5in";
    }
  };

  // Execute any document command actions
  const handleCommand = (command, value = null) => {
    saveSelection();
    restoreSelection();
    switch (command) {
      case "undo":
      case "redo":
      case "bold":
      case "italic":
      case "underline":
      case "foreColor":
      case "fontName":
      case "insertUnorderedList":
      case "removeFormat":
        document.execCommand(command, false, value);
        break;
      case "increaseFontSize":
        changeFontSize(true);
        break;
      case "decreaseFontSize":
        changeFontSize(false);
        break;
      case "increaseLineSpacing":
        changeLineSpacing(true);
        break;
      case "decreaseLineSpacing":
        changeLineSpacing(false);
        break;
      case "adjustMargin":
        handleMarginAdjustment();
        break;
      case "prevPage":
        handlePageNavigation("prev");
        break;
      case "nextPage":
        handlePageNavigation("next");
        break;
      case "rotate":
        handleRotate();
        break;
      default:
        console.warn(`Command "${command}" is not implemented.`);
    }
    updateToolbarState();
    if (resumeRef.current) {
      resumeRef.current.focus();
    }
  };

  // Zoom controls
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.1, 0.5));

  // Event handlers for editable content
  const handleMouseUp = () => {
    saveSelection();
    updateToolbarState();
  };

  const handleKeyUp = () => {
    saveSelection();
    updateToolbarState();
  };

  // Calculate total pages on initial render and when content changes
  useEffect(() => {
    if (resumeRef.current) {
      const contentHeight = resumeRef.current.scrollHeight;
      const pageHeight = 792; // Letter size height (11inches*72dpi)
      const calculatedPages = Math.ceil(contentHeight / pageHeight);
      setTotalPages(calculatedPages > 0 ? calculatedPages : 1);
    }
  }, [resumeRef.current?.scrollHeight]);

  // Setup listener to capture clicks in the editable area
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (resumeRef.current && resumeRef.current.contains(e.target)) {
        handleMouseUp();
      }
    };
    document.addEventListener("mouseup", handleDocumentClick);
    return () => {
      document.removeEventListener("mouseup", handleDocumentClick);
    };
  }, []);

  return (
    <>
      <Navbar
        exportToPDF={exportToPDF}
        fileName={fileName}
        setFileName={setFileName}
      />

      {/* Fixed Formatting Toolbar below Navbar */}
      <div className={styles.fixedToolbar}>
        <FormattingToolbar
          onCommand={handleCommand}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          zoomValue={Math.round(zoomLevel * 100)}
          isBoldActive={isBoldActive}
          isItalicActive={isItalicActive}
          isUnderlineActive={isUnderlineActive}
          currentPage={currentPage}
          totalPages={totalPages}
          orientation={orientation}
        />
      </div>

      {/* Flex container wrapping the Sidebar and the resume workspace */}
      <div className={styles.workspaceLayout}>
        <Sidebar />
        {/* Uncomment if needed: <SecondSidebar /> */}
        <div className={styles.resumeWorkspace}>
          <ResumeScore />

          {/* Editable Resume Content */}
          <div
            ref={resumeRef}
            id="resumePdfContent"
            className={styles.resumeContent}
            contentEditable={true}
            suppressContentEditableWarning={true}
            style={{
              border: "1px solid #ccc",
              minHeight: "600px",
              padding: `${margins.top}px ${margins.right}px ${margins.bottom}px ${margins.left}px`,
              transform: `scale(${zoomLevel})`,
              transformOrigin: "top left",
              fontSize: `${fontSize}px`,
              lineHeight: lineSpacing,
              width: orientation === "portrait" ? "8.5in" : "11in",
              height: "auto",
              backgroundColor: "white"
            }}
            onMouseUp={handleMouseUp}
            onKeyUp={handleKeyUp}
          >
            <Personal
              leftIconStyles={styles.leftIcon}
              rightIconStyles={styles.rightIcon}
            />

            <div className={styles.education}>
              <Heading
                heading="EDUCATION"
                leftIconStyles={styles.leftIcon}
                rightIconStyles={styles.rightIcon}
              />
              <div className={styles.container}>
                <Organization
                  organization="University"
                  leftIconStyles={styles.leftIcon}
                  rightIconStyles={styles.rightIcon}
                />
                <Degree
                  degree="Degree"
                  leftIconStyles={styles.leftIcon}
                  rightIconStyles={styles.rightIcon}
                />
              </div>
            </div>

            <div className={styles.projectExperience}>
              <Heading
                heading="PROJECT EXPERIENCE"
                leftIconStyles={styles.leftIcon}
                rightIconStyles={styles.rightIcon}
              />
              <div className={styles.container}>
                <Organization
                  organization="Organization"
                  leftIconStyles={styles.leftIcon}
                  rightIconStyles={styles.rightIcon}
                />
                <Degree
                  degree="Title"
                  leftIconStyles={styles.leftIcon}
                  rightIconStyles={styles.rightIcon}
                />
                <BulletContainer />

                <Organization
                  organization="Organization"
                  leftIconStyles={styles.leftIcon}
                  rightIconStyles={styles.rightIcon}
                  hasTopMargin={true}
                />
                <Degree
                  degree="Title"
                  leftIconStyles={styles.leftIcon}
                  rightIconStyles={styles.rightIcon}
                />
                <BulletContainer />
              </div>
            </div>

            <div className={styles.leadershipExperience}>
              <Heading
                heading="WORK EXPERIENCE"
                leftIconStyles={styles.leftIcon}
                rightIconStyles={styles.rightIcon}
              />
              <Organization
                organization="Company"
                leftIconStyles={styles.leftIcon}
                rightIconStyles={styles.rightIcon}
              />
              <Degree
                degree="Job Title"
                leftIconStyles={styles.leftIcon}
                rightIconStyles={styles.rightIcon}
              />
              <BulletContainer />

              <Organization
                organization="Company"
                leftIconStyles={styles.leftIcon}
                rightIconStyles={styles.rightIcon}
                hasTopMargin={true}
              />
              <Degree
                degree="Job Title"
                leftIconStyles={styles.leftIcon}
                rightIconStyles={styles.rightIcon}
              />
              <BulletContainer
                bullet={["My first point", "My second point", "My third point"]}
              />
            </div>

            <CustomSection
              leftIconStyles={styles.leftIcon}
              rightIconStyles={styles.rightIcon}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeWorkspace;