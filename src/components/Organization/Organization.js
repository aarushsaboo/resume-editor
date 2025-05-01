import { useDynamicWidth } from "../../hooks/useDynamicWidth"
import styles from "./Organization.module.css"

const Organization = ({
  organization,
  leftIconStyles,
  rightIconStyles,
  hasTopMargin = false,
}) => {
  const {
    value: orgName,
    inputWidth: orgWidth,
    handleInput: handleOrgInput,
    hiddenText: orgHiddenText,
  } = useDynamicWidth({ placeholder: organization })

  const {
    value: location,
    inputWidth: locationWidth,
    handleInput: handleLocationInput,
    hiddenText: locationHiddenText,
  } = useDynamicWidth({ placeholder: "City, State" })

  return (
    <div
      className={styles.organization}
      style={{ marginTop: hasTopMargin ? "16px" : "0" }}
    >
      <div className={styles.part1}>
        <div className={styles.textContent}>
          <div className={leftIconStyles}></div>
          <div className={styles.text}>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder={organization}
                value={orgName}
                onChange={handleOrgInput}
                className={styles.input}
                style={{ width: orgWidth }}
              />
              {/* <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.addIcon}
              >
                <path
                  d="M7.99992 1.33398C4.31992 1.33398 1.33325 4.32065 1.33325 8.00065C1.33325 11.6807 4.31992 14.6673 7.99992 14.6673C11.6799 14.6673 14.6666 11.6807 14.6666 8.00065C14.6666 4.32065 11.6799 1.33398 7.99992 1.33398ZM11.3333 8.66732H8.66659V11.334L7.33325 11.334V8.66732H4.66659V7.33398L7.33325 7.33398L7.33325 4.66732H8.66659V7.33398H11.3333L11.3333 8.66732Z"
                  fill="#A1AEB7"
                ></path>
              </svg> */}
            </div>
            <span
              ref={orgHiddenText}
              className={styles.hiddenText}
              aria-hidden="true"
            ></span>
          </div>
          <div className={rightIconStyles}></div>
        </div>
      </div>
      <div className={styles.part2}>
        <div className={leftIconStyles}></div>
        <div className={styles.cityState}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="City, State"
              value={location}
              onChange={handleLocationInput}
              className={`${styles.input} ${styles.rightAligned}`}
              style={{ width: locationWidth }}
            />
            <span
              ref={locationHiddenText}
              className={styles.hiddenText}
              aria-hidden="true"
            ></span>
          </div>
        </div>
        <div className={rightIconStyles}></div>
      </div>
    </div>
  )
}

export default Organization
