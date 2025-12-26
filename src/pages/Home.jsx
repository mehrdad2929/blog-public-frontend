import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { getToken } from '../utils/api'

function Home() {
  const token = getToken()

  return (
    <div>
      <Header />
      <div style={styles.container}>
        <div style={styles.hero}>
          <h1 style={styles.title}>Blog Reader</h1>
          <p style={styles.subtitle}>Discover and read posts from your favorite authors</p>
        </div>

        <div style={styles.searchSection}>
          <h2 style={styles.sectionTitle}>Browse Authors</h2>
          <p style={styles.description}>
            Visit an author&apos;s blog by going to: <code style={styles.code}>/:authorname</code>
          </p>
          <div style={styles.exampleSection}>
            <Link to="/authors" style={styles.link}>View all authors</Link>
          </div>
        </div>

        {!token && (
          <div style={styles.authSection}>
            <div style={styles.authButtons}>
              <Link to="/login" style={styles.button}>Login</Link>
              <Link to="/signup" style={styles.secondaryButton}>Sign Up</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  hero: {
    marginBottom: '40px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '10px',
    color: '#111',
    fontWeight: '600',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#666',
    margin: '0',
  },
  searchSection: {
    backgroundColor: '#fafafa',
    padding: '25px',
    marginBottom: '30px',
    border: '1px solid #e8e8e8',
  },
  sectionTitle: {
    fontSize: '1.2rem',
    marginBottom: '15px',
    color: '#111',
    fontWeight: '600',
    margin: '0 0 15px 0',
  },
  description: {
    fontSize: '0.95rem',
    color: '#666',
    marginBottom: '15px',
    margin: '0 0 15px 0',
  },
  code: {
    backgroundColor: '#e8e8e8',
    padding: '2px 6px',
    fontFamily: 'monospace',
    fontSize: '0.9rem',
  },
  exampleSection: {
    marginTop: '15px',
  },
  link: {
    color: '#111',
    textDecoration: 'underline',
  },
  authSection: {
    textAlign: 'center',
    padding: '20px',
  },
  authButtons: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
  },
  button: {
    padding: '10px 25px',
    backgroundColor: '#111',
    color: 'white',
    textDecoration: 'none',
    fontSize: '0.95rem',
  },
  secondaryButton: {
    padding: '10px 25px',
    backgroundColor: 'white',
    color: '#111',
    border: '1px solid #ccc',
    textDecoration: 'none',
    fontSize: '0.95rem',
  },
}

export default Home