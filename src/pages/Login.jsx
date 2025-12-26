import { Form, redirect, useActionData } from 'react-router-dom'
import { loginUser, setToken } from '../utils/api'

export async function action({ request }) {
  const formData = await request.formData()
  const credentials = {
    username: formData.get('username'),
    password: formData.get('password'),
  }

  try {
    const response = await loginUser(credentials)
    setToken(response.token)
    return redirect('/')
  } catch (error) {
    return { error: error.message }
  }
}

function Login() {
  const actionData = useActionData()

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Login</h1>
        
        <Form method="post" style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              name="username"
              required
              style={styles.input}
            />
          </div>
          
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              required
              style={styles.input}
            />
          </div>

          {actionData?.error && (
            <div style={styles.error}>{actionData.error}</div>
          )}

          <button type="submit" style={styles.button}>Login</button>
        </Form>

        <p style={styles.signupText}>
          Don&apos;t have an account? <a href="/signup" style={styles.link}>Sign up</a>
        </p>
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
  card: {
    backgroundColor: 'white',
    padding: '30px',
    border: '1px solid #e8e8e8',
    width: '100%',
    maxWidth: '360px',
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '25px',
    color: '#111',
    fontWeight: '600',
    margin: '0 0 25px 0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  label: {
    fontSize: '0.9rem',
    color: '#666',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  error: {
    padding: '8px',
    backgroundColor: '#fee',
    color: '#c33',
    border: '1px solid #fcc',
    fontSize: '0.9rem',
  },
  button: {
    padding: '10px',
    backgroundColor: '#111',
    color: 'white',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '5px',
  },
  signupText: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#666',
    fontSize: '0.9rem',
    margin: '20px 0 0 0',
  },
  link: {
    color: '#111',
    textDecoration: 'underline',
  },
}

export default Login