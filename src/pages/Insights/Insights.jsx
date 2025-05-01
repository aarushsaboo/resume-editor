import { useState, useRef, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import {
  faFileCircleCheck,
  faCloudArrowUp,
  faThumbsUp,
  faTriangleExclamation,
  faCircleExclamation,
  faCheckCircle,
  faListCheck,
  faChartPie,
} from "@fortawesome/free-solid-svg-icons"
import styles from "./Insights.module.css"

export default function Insights() {
  const [jobDescription, setJobDescription] = useState("")
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("analysis")
  const [analysisResult, setAnalysisResult] = useState(null)
  const [score, setScore] = useState(null)
  const [fileContent, setFileContent] = useState(null)
  const fileInputRef = useRef(null)

  // API key - in a real application, this should be stored securely on the server side
  const API_KEY = "AIzaSyDOG4Eg8m9Bt0SwcGfEFEmuhHgbbUl6Ndg" // Would use environment variable in production

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
      setFileName(selectedFile.name)

      // Read file contents
      const reader = new FileReader()
      reader.onload = async (e) => {
        // Store base64 encoded file
        const base64Data = e.target.result.split(",")[1]
        setFileContent(base64Data)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile)
        setFileName(droppedFile.name)

        // Read file contents
        const reader = new FileReader()
        reader.onload = async (e) => {
          // Store base64 encoded file
          const base64Data = e.target.result.split(",")[1]
          setFileContent(base64Data)
        }
        reader.readAsDataURL(droppedFile)
      }
    }
  }

  // Function to call Gemini API
  const callGeminiAPI = async (prompt, fileBase64) => {
    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent"

    // Prepare data for API call with PDF image
    const data = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
            {
              inline_data: {
                mime_type: "application/pdf",
                data: fileBase64,
              },
            },
          ],
        },
      ],
    }

    try {
      const response = await fetch(`${url}?key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`)
      }

      const result = await response.json()
      return result.candidates[0].content.parts[0].text
    } catch (error) {
      console.error("Error calling Gemini API:", error)
      throw error
    }
  }

  // Function to extract score from text response
  const extractScoreFromResponse = (responseText) => {
    // Look for percentage patterns like "85%" or "85 percent" or "score: 85"
    const percentagePatterns = [
      /(\d{1,3})%/, // Match patterns like 85%
      /(\d{1,3})\s*percent/, // Match patterns like 85 percent
      /score\s*[:of]*\s*(\d{1,3})/i, // Match patterns like score: 85
      /rating\s*[:of]*\s*(\d{1,3})/i, // Match patterns like rating: 85
      /match\s*[:of]*\s*(\d{1,3})/i, // Match patterns like match: 85
    ]

    for (const pattern of percentagePatterns) {
      const matches = responseText.match(pattern)
      if (matches && matches[1]) {
        try {
          const score = parseInt(matches[1])
          // Ensure score is between 0-100
          return Math.max(0, Math.min(score, 100))
        } catch (error) {
          continue
        }
      }
    }

    // Default score if no pattern is found
    return 70
  }

  const handleSubmit = async (analysisType) => {
    if (!file || !jobDescription || !fileContent) {
      alert(
        "Please provide both a job description and upload your resume PDF first."
      )
      return
    }

    setIsLoading(true)
    setActiveTab(analysisType)

    try {
      let prompt = ""
      let response = ""

      if (analysisType === "analysis") {
          prompt = `
You are an experienced Technical Human Resource Manager. Your task is to review the provided resume against the job description. 
Please share your professional evaluation on whether the candidate's profile aligns with the role. 
Highlight the strengths and weaknesses of the applicant in relation to the specified job requirements.

Format your response with HTML paragraphs (<p>) and use <strong> for emphasis.

Job Description:
${jobDescription}
`

        response = await callGeminiAPI(prompt, fileContent)
        setAnalysisResult({ content: response })
      } else if (analysisType === "tips") {
          prompt = `
You are an expert ATS optimization consultant with years of experience in resume writing and ATS systems.
Based on the resume provided and the job description, provide 5 specific, actionable tips to improve the resume 
for better ATS compatibility.

Present each tip as follows:
<h4>Tip Title Goes Here</h4>
<p>Explanation of the tip with concrete examples of how to implement it.</p>

Focus on keyword optimization, formatting, section organization, and any critical missing elements.
Make sure to use proper HTML tags (<h4> for titles and <p> for paragraphs) for formatting.

Job Description:
${jobDescription}
`

        response = await callGeminiAPI(prompt, fileContent)
        setAnalysisResult({ content: response })
      } else if (analysisType === "score") {
          prompt = `
You are a precise ATS (Applicant Tracking System) algorithm with deep understanding of resume screening technology.
Carefully analyze the resume against the provided job description and provide:

1. An exact numerical percentage score (0-100) showing how well the resume matches the job description.
   Format this clearly as "<h3>Score: X%</h3>" at the beginning of your response.
   
2. List of specific keywords from the job description that are missing in the resume.

3. Analysis of resume sections and their ATS compatibility.

4. Final assessment and recommendations for improvements.

Make sure to start your response with a clear numerical score.
Format your response with HTML headings (<h4>) for each section, followed by paragraphs (<p>) for the explanations.

Job Description:
${jobDescription}
`

        response = await callGeminiAPI(prompt, fileContent)

        // Extract score from response
        const extractedScore = extractScoreFromResponse(response)
        setScore(extractedScore)
        setAnalysisResult({ content: response })
      }
    } catch (error) {
      console.error("Error:", error)
      setAnalysisResult({
        content:
          "An error occurred while analyzing your resume. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getScoreColor = () => {
    if (!score) return ""
    if (score >= 80) return styles.scoreHigh
    if (score >= 60) return styles.scoreMedium
    return styles.scoreLow
  }

  const getScoreMessage = () => {
    if (!score) return ""
    if (score >= 80) return "📈 Your resume is well-optimized for ATS!"
    if (score >= 60)
      return "⚠️ Your resume has moderate ATS compatibility. Consider the suggestions below."
    return "❗ Your resume needs significant improvements for ATS compatibility."
  }

  const renderResultContent = () => {
    if (!analysisResult) return null

    if (activeTab === "score" && score) {
      return (
        <div className={styles.scoreContainer}>
          <div className={`${styles.scoreCircle} ${getScoreColor()}`}>
            <span className={styles.scoreValue}>{score}</span>
            <span className={styles.scoreLabel}>ATS Score</span>
          </div>
          <div className={styles.scoreMessage}>{getScoreMessage()}</div>
          <div
            className={styles.scoreDetails}
            dangerouslySetInnerHTML={{ __html: analysisResult.content }}
          />
        </div>
      )
    }

    return (
      <div
        className={styles.resultContent}
        dangerouslySetInnerHTML={{ __html: analysisResult.content }}
      />
    )
  }

  return (
    <div className={styles.insightsContainer}>
      <header className={styles.header}>
        <div className={styles.container}>
          <nav className={styles.nav}>
            <div className={styles.logo}>
              <Link to="/" className={styles.logo}>
                <FontAwesomeIcon
                  icon={faFileCircleCheck}
                  className={styles.logoIcon}
                />
                Resume editor
              </Link>
            </div>
            <ul className={styles.navLinks}>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/insights">Resume Insights</a>
              </li>
              <li>
                <a href="/features">About</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Resume Insights</h1>
          <p className={styles.pageDescription}>
            Upload your resume and a job description to get personalized
            insights and improve your chances of landing an interview.
          </p>

          <div className={styles.insightsWrapper}>
            <div className={styles.uploadSection}>
              <div className={styles.inputGroup}>
                <label htmlFor="jobDescription" className={styles.inputLabel}>
                  Job Description
                </label>
                <textarea
                  id="jobDescription"
                  className={styles.textArea}
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Upload Resume (PDF)</label>
                <div
                  className={styles.dropzone}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current.click()}
                >
                  <input
                    type="file"
                    accept=".pdf"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  <FontAwesomeIcon
                    icon={faCloudArrowUp}
                    className={styles.uploadIcon}
                  />
                  {fileName ? (
                    <div className={styles.fileInfo}>
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className={styles.fileIcon}
                      />
                      <span>{fileName}</span>
                    </div>
                  ) : (
                    <p>Drag & drop your resume PDF or click to browse</p>
                  )}
                </div>
              </div>

              <div className={styles.actionButtons}>
                <button
                  className={styles.actionButton}
                  onClick={() => handleSubmit("analysis")}
                  disabled={isLoading}
                >
                  <FontAwesomeIcon icon={faListCheck} />
                  Resume Analysis
                </button>
                <button
                  className={styles.actionButton}
                  onClick={() => handleSubmit("tips")}
                  disabled={isLoading}
                >
                  <FontAwesomeIcon icon={faThumbsUp} />
                  Improvement Tips
                </button>
                <button
                  className={styles.actionButton}
                  onClick={() => handleSubmit("score")}
                  disabled={isLoading}
                >
                  <FontAwesomeIcon icon={faChartPie} />
                  ATS Score
                </button>
              </div>
            </div>

            <div className={styles.resultsSection}>
              {isLoading ? (
                <div className={styles.loadingState}>
                  <div className={styles.spinner}></div>
                  <p>Analyzing your resume...</p>
                </div>
              ) : (
                <>
                  {analysisResult ? (
                    <>
                      <h2 className={styles.resultTitle}>
                        {activeTab === "analysis" && "Resume Analysis"}
                        {activeTab === "tips" && "Improvement Tips"}
                        {activeTab === "score" && "ATS Compatibility Score"}
                      </h2>
                      {renderResultContent()}
                    </>
                  ) : (
                    <div className={styles.placeholderState}>
                      <FontAwesomeIcon
                        icon={faFileCircleCheck}
                        className={styles.placeholderIcon}
                      />
                      <h3>Ready to analyze your resume</h3>
                      <p>
                        Fill in the job description and upload your resume, then
                        click one of the analysis buttons to get started.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerInfo}>
              <div className={styles.footerLogo}>
                <FontAwesomeIcon icon={faFileCircleCheck} /> Resume editor
              </div>
              <p className={styles.footerDescription}>
                Helping job seekers beat the ATS and land more interviews with
                AI-powered resume optimization.
              </p>
            </div>
            <div className={styles.copyright}>
              &copy; 2025 Resume editor. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
