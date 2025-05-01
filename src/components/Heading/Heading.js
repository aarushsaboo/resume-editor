import { useInputWidth } from "../../hooks/useInputWidth"
import styles from "./Heading.module.css"

const Heading = ({ heading, leftIconStyles, rightIconStyles }) => {
  // Changed to pass the heading directly as initialValue
  // In your Heading component
  const {
    value: headingText,
    inputWidth: headingWidth,
    handleInput: handleHeadingInput,
    hiddenText: headingHiddenText,
  } = useInputWidth({ initialValue: heading })
  // here the heading(initialValue) is literally "Heading" ie a placeholder.

  return (
    <div className={styles.heading}>
      <div className={styles.part1}>
        <div className={leftIconStyles}></div>
        <input
          type="text"
          value={headingText}
          onChange={handleHeadingInput}
          className={styles.headingInput}
          style={{ width: headingWidth }}
        />
        <span
          ref={headingHiddenText}
          className={styles.hiddenText}
          aria-hidden="true"
        >
          {headingText}
          {/* Make sure we're showing the text here for width calculation */}
        </span>
        {/* <div className={styles.rightIcon}>
          <svg
            data-v-5e2699e2-s=""
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer v-popper--has-tooltip"
          >
            <path
              d="M7.99992 1.33398C4.31992 1.33398 1.33325 4.32065 1.33325 8.00065C1.33325 11.6807 4.31992 14.6673 7.99992 14.6673C11.6799 14.6673 14.6666 11.6807 14.6666 8.00065C14.6666 4.32065 11.6799 1.33398 7.99992 1.33398ZM11.3333 8.66732H8.66659V11.334L7.33325 11.334V8.66732H4.66659V7.33398L7.33325 7.33398L7.33325 4.66732H8.66659V7.33398H11.3333L11.3333 8.66732Z"
              fill="#A1AEB7"
            ></path>
          </svg>
        </div> */}
      </div>
      <div>
        <svg
          className={styles.moveSvg}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.16659 15.0007C9.16659 15.9173 8.41659 16.6673 7.49992 16.6673C6.58325 16.6673 5.83325 15.9173 5.83325 15.0007C5.83325 14.084 6.58325 13.334 7.49992 13.334C8.41659 13.334 9.16659 14.084 9.16659 15.0007ZM7.49992 8.33398C6.58325 8.33398 5.83325 9.08398 5.83325 10.0007C5.83325 10.9173 6.58325 11.6673 7.49992 11.6673C8.41659 11.6673 9.16659 10.9173 9.16659 10.0007C9.16659 9.08398 8.41659 8.33398 7.49992 8.33398ZM7.49992 3.33398C6.58325 3.33398 5.83325 4.08398 5.83325 5.00065C5.83325 5.91732 6.58325 6.66732 7.49992 6.66732C8.41659 6.66732 9.16659 5.91732 9.16659 5.00065C9.16659 4.08398 8.41659 3.33398 7.49992 3.33398ZM12.4999 6.66732C13.4166 6.66732 14.1666 5.91732 14.1666 5.00065C14.1666 4.08398 13.4166 3.33398 12.4999 3.33398C11.5833 3.33398 10.8333 4.08398 10.8333 5.00065C10.8333 5.91732 11.5833 6.66732 12.4999 6.66732ZM12.4999 8.33398C11.5833 8.33398 10.8333 9.08398 10.8333 10.0007C10.8333 10.9173 11.5833 11.6673 12.4999 11.6673C13.4166 11.6673 14.1666 10.9173 14.1666 10.0007C14.1666 9.08398 13.4166 8.33398 12.4999 8.33398ZM12.4999 13.334C11.5833 13.334 10.8333 14.084 10.8333 15.0007C10.8333 15.9173 11.5833 16.6673 12.4999 16.6673C13.4166 16.6673 14.1666 15.9173 14.1666 15.0007C14.1666 14.084 13.4166 13.334 12.4999 13.334Z"
            fill="#A1AEB7"
          ></path>
        </svg>
      </div>
    </div>
  )
}

export default Heading
