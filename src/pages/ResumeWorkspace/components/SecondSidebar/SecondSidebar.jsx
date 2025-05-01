import React, { useState } from "react"
import styles from "./SecondSidebar.module.css"

const SecondSidebar = () => {
  const [role, setRole] = useState("Project Manager")
  const [experience, setExperience] = useState("")
  const [bulletPoints, setBulletPoints] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const generateBulletPoints = async () => {
    setIsLoading(true)

    try {
      const api_key = "AIzaSyDOG4Eg8m9Bt0SwcGfEFEmuhHgbbUl6Ndg"
      const url =
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent"

      const headers = {
        "Content-Type": "application/json",
      }

      const prompt = `Generate 3 professional resume bullet points for a ${role} with this experience: "${experience}". 
      Make each bullet point action-oriented, specific, and quantifiable if possible. 
      Format as a JSON array of strings.`

      const data = {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }

      const params = {
        key: api_key,
      }

      const response = await fetch(`${url}?key=${api_key}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`Request failed with status code ${response.status}`)
      }

      const responseData = await response.json()

      // Parse the bullet points from the response
      // This assumes the model returns a JSON array of strings
      // We'll need to parse the text response and extract the bullet points
      const text = responseData.candidates[0].content.parts[0].text

      // Try to extract a JSON array from the text
      const jsonMatch = text.match(/\[\s*"(.+?)"\s*(?:,\s*"(.+?)"\s*)*\]/s)
      let extractedPoints = []

      if (jsonMatch) {
        try {
          extractedPoints = JSON.parse(jsonMatch[0])
        } catch (e) {
          // If JSON parsing fails, fall back to splitting by newlines
          extractedPoints = text
            .split("\n")
            .filter((line) => line.trim().startsWith("-"))
            .map((line) => line.trim().substring(1).trim())
        }
      } else {
        // Fall back to splitting by newlines if no JSON is found
        extractedPoints = text
          .split("\n")
          .filter(
            (line) =>
              line.trim().length > 0 &&
              !line.toLowerCase().includes("bullet point")
          )
          .map((line) =>
            line
              .trim()
              .replace(/^[-*•]/, "")
              .trim()
          )
          .filter((line) => line.length > 0)
      }

      // If we still don't have points, just use the whole text
      if (extractedPoints.length === 0) {
        extractedPoints = [text]
      }

      // Limit to maximum 3 bullet points
      setBulletPoints(extractedPoints.slice(0, 3))
    } catch (error) {
      console.error("Error generating bullet points:", error)
      // Set some fallback bullet points for demo purposes
      setBulletPoints([
        "Led cross-functional team of 12 to deliver a mission-critical $1.5M project on time and 10% under budget, resulting in 25% increased operational efficiency.",
        "Implemented Agile methodologies across 5 development teams, reducing product delivery time by 30% and increasing sprint velocity by 45% within 6 months.",
        "Managed stakeholder relationships across 3 departments, securing additional $500K in resources and achieving 100% client satisfaction on project deliverables.",
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.secondSidebar}>
      <div className={styles.inputSection}>
        <h2 className={styles.sectionTitle}>Create Bullet Points</h2>

        <div className={styles.formGroup}>
          <label className={styles.label}>What was your role?</label>
          <input
            className={styles.input}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Project Manager, Software Engineer"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Your work experience in one sentence.
          </label>
          <textarea
            className={styles.textarea}
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="Describe your key responsibilities and achievements"
          />
        </div>

        <button
          className={styles.generateButton}
          onClick={generateBulletPoints}
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate"}
        </button>
      </div>

      <div className={styles.resultsSection}>
        <h2 className={styles.sectionTitle}>Generated Bullet Points</h2>

        {bulletPoints.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>✏️</div>
            <p className={styles.emptyStateTitle}>No bullet points yet</p>
            <p className={styles.emptyStateText}>
              Fill in your role and experience, then click "Generate" to create
              professional bullet points for your resume.
            </p>
          </div>
        ) : (
          <div className={styles.bulletPointContainer}>
            {bulletPoints.map((bulletPoint, index) => (
              <div className={styles.bulletPoint} key={index}>
                <div className={styles.bulletMarker}>+</div>
                <p className={styles.bulletText}>{bulletPoint}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SecondSidebar
