import { Link, useRouteError } from 'react-router-dom'

function ErrorPage() {
  const error = useRouteError()

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Oops!</h1>
        <p style={styles.message}>Something went wrong</p>
        {error?.status === 404 && (
          <p style={styles.detail}>Page not found</p>
        )}
        {error?.message && (
          <p style={styles.errorDetail}>{error.message}</p>
        )}
        <Link to="/" style={styles.link}>Go back home</Link>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#fafafa',
  },
  content: {
    textAlign: 'center',
    padding: '40px',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '15px',
    color: '#111',
    fontWeight: '600',
    margin: '0 0 15px 0',
  },
  message: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '10px',
    margin: '0 0 10px 0',
  },
  detail: {
    fontSize: '1rem',
    color: '#999',
    marginBottom: '20px',
    margin: '0 0 20px 0',
  },
  errorDetail: {
    fontSize: '0.9rem',
    color: '#c33',
    marginBottom: '20px',
    margin: '0 0 20px 0',
  },
  link: {
    color: '#111',
    textDecoration: 'underline',
    fontSize: '0.95rem',
  },
}

export default ErrorPage