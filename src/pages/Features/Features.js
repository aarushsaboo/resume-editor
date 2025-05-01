import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileCircleCheck,
  faRobot,
  faMagnifyingGlassChart,
  faChartLine,
  faFileExport,
  faUserTie,
  faPenToSquare,
  faLaptopCode,
  faDatabase,
  faCloudArrowUp,
  faCheckCircle,
  faShieldHalved,
  faBullseye,
  faRankingStar,
  faGears,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';
import styles from './Features.module.css';

export default function Features() {
  const navigate = useNavigate();

  const featuresData = [
    {
      icon: faRobot,
      title: 'AI-Powered ATS Analysis',
      description: 'Our advanced AI algorithm analyzes your resume the same way ATS systems do, identifying strengths and weaknesses in real-time.'
    },
    {
      icon: faMagnifyingGlassChart,
      title: 'Keyword Optimization',
      description: 'Get personalized keyword suggestions based on your target job description to increase your resumes visibility to recruiters.'
    },
    {
      icon: faChartLine,
      title: 'Performance Analytics',
      description: 'Detailed metrics and scores showing exactly how well your resume performs against ATS systems and industry standards.'
    },
    {
      icon: faPenToSquare, 
      title: 'Interactive Editor',
      description: 'Edit your resume directly in our platform and see your ATS score improve in real-time as you make changes.'
    },
    {
      icon: faFileExport,
      title: 'Export Options',
      description: 'Download your optimized resume in multiple formats (PDF, DOCX, TXT) that are perfectly formatted for ATS compatibility.'
    },
    {
      icon: faUserTie,
      title: 'Industry Templates',
      description: 'Access a library of ATS-optimized templates tailored for different industries and career levels.'
    },
    {
      icon: faCloudArrowUp,
      title: 'Easy Resume Upload',
      description: 'Simply upload your existing resume (PDF, Word, plain text) and our system will instantly analyze and provide feedback.'
    },
    {
      icon: faCheckCircle,
      title: 'Section-by-Section Review',
      description: 'Get detailed feedback on each section of your resume with specific suggestions for improvement.'
    },
    {
      icon: faLaptopCode,
      title: 'Technical Skills Validation',
      description: 'Verify that your technical skills section properly showcases your expertise and matches job requirements.'
    },
    {
      icon: faShieldHalved,
      title: 'Privacy Protection',
      description: 'Your resume data is encrypted and protected. We never share your personal information with third parties.'
    },
    {
      icon: faBullseye,
      title: 'Job Matching',
      description: 'Our system compares your resume against specific job descriptions to provide tailored optimization recommendations.'
    },
    {
      icon: faRankingStar,
      title: 'Competitive Analysis',
      description: 'See how your resume stacks up against other candidates in your industry and level of experience.'
    },
    {
      icon: faGears,
      title: 'Custom Optimization',
      description: 'Receive personalized recommendations based on your career goals, industry, and target positions.'
    },
    {
      icon: faLayerGroup,
      title: 'Format Correction',
      description: 'Automatically detect and fix formatting issues that might cause ATS systems to misread your resume.'
    },
    {
      icon: faDatabase,
      title: 'Resume Storage',
      description: 'Save multiple versions of your resume and track improvements over time as you optimize for different positions.'
    }
  ];

  return (
    <div className={styles.featuresPage}>
      <header className={styles.header}>
        <div className={styles.container}>
          <nav className={styles.nav}>
            <div className={styles.logo}>
              <FontAwesomeIcon icon={faFileCircleCheck} className={styles.logoIcon} />
              Resume editor
            </div>
            <ul className={styles.navLinks}>
              <li><a href="/">Home</a></li>
              <li><a href="/insights">Resume Insights</a></li>
              <li><a href="/features"  className={styles.active}>About</a></li>
            </ul>
            <button className={styles.ctaButton} onClick={() => navigate('/resume-editor')}>
              Start Optimizing
            </button>
          </nav>
        </div>
      </header>

      <main>
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <h1 className={styles.heroTitle}>Powerful Features to <span>Optimize Your Resume</span></h1>
            <p className={styles.heroDescription}>
              Discover all the tools and features designed to help you create an ATS-friendly resume that stands out to employers.
            </p>
          </div>
        </section>

        <section className={styles.featuresGrid}>
          <div className={styles.container}>
            {featuresData.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <FontAwesomeIcon icon={feature.icon} />
                </div>
                <div className={styles.featureContent}>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Ready to Optimize Your Resume?</h2>
              <p className={styles.ctaDescription}>
                Start improving your resume's ATS compatibility score today and increase your chances of landing interviews.
              </p>
              <button className={styles.ctaButton} onClick={() => navigate('/resume-editor')}>
                Try It Now
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerInfo}>
              <div className={styles.footerLogo}>
                <FontAwesomeIcon icon={faFileCircleCheck} /> Resume editor
              </div>
              <p className={styles.footerDescription}>Helping job seekers beat the ATS and land more interviews with AI-powered resume optimization.</p>
            </div>
            {[
              {
                title: 'Product',
                links: ['Features', 'Pricing', 'Testimonials', 'FAQ']
              }, {
                title: 'Company',
                links: ['About Us', 'Blog', 'Careers', 'Contact']
              }, {
                title: 'Resources',
                links: ['Resume Tips', 'Career Advice', 'Interview Prep', 'Job Search Guide']
              }
            ].map((section, i) => (
              <div key={i} className={styles.footerLinks}>
                <h3>{section.title}</h3>
                <ul>
                  {section.links.map((link, j) => (
                    <li key={j}><a href="#">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className={styles.copyright}>
            &copy; 2025 Resume editor. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}