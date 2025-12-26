import { Link, Form } from 'react-router-dom'
import { getToken } from '../utils/api'

function Header() {
  const token = getToken()

  if (!token) {
    return null
  }

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>myblog</Link>
        <div style={styles.nav}>
          <Link to="/authors" style={styles.link}>Authors</Link>
          <Form method="post" action="/logout">
            <button type="submit" style={styles.logoutButton}>Logout</button>
          </Form>
        </div>
      </div>
    </header>
  )
}

const styles = {
  header: {
    borderBottom: '1px solid #e0e0e0',
    marginBottom: '30px',
  },
  container: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#111',
    textDecoration: 'none',
  },
  nav: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  link: {
    color: '#666',
    textDecoration: 'none',
    fontSize: '0.9rem',
  },
  logoutButton: {
    padding: '6px 15px',
    backgroundColor: '#111',
    color: 'white',
    border: 'none',
    fontSize: '0.85rem',
    cursor: 'pointer',
  },
}

export default Header