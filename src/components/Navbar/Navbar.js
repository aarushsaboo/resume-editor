import styles from './Navbar.module.css';
import backarrow from "../../assets/back_arrow.png"
import { useNavigate } from "react-router-dom"


const Navbar = ({ exportToPDF, fileName, setFileName }) => {
     const navigate = useNavigate() 
  return (
    <div className={styles.navbar}>
      <button className={styles.backArrowContainer} onClick={() => navigate('/')}>
        <img src={backarrow} className={styles.backArrow}></img>
      </button>
      <input
        type="text"
        className={styles.fileName}
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
      ></input>

      {/* PDF Export Button */}
      <button onClick={exportToPDF} className={styles.exportButton}>
        Download
      </button>
    </div>
  )
};

export default Navbar;