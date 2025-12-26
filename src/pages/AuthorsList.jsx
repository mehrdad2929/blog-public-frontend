import { useLoaderData, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { fetchAllAuthors } from '../utils/api'
import Header from '../components/Header'

export async function loader() {
  return fetchAllAuthors()
}

function AuthorsList() {
  const { authors } = useLoaderData()

  useEffect(() => {
    document.title = 'myblog'
  }, [])

  return (
    <div>
      <Header />
      <div style={styles.container}>
        <h1 style={styles.title}>Authors</h1>
        <p style={styles.subtitle}>Browse posts from our community of authors</p>

        {authors?.length === 0 ? (
          <div style={styles.empty}>No authors found</div>
        ) : (
          <div style={styles.authorsList}>
            {authors.map(author => (
              <Link
                key={author.id}
                to={`/${author.username}`}
                style={styles.authorCard}
              >
                <h2 style={styles.authorName}>{author.name}</h2>
                <p style={styles.authorUsername}>myblog/{author.username}</p>
                <div style={styles.authorInfo}>
                  <span>{author.posts?.length || 0} posts</span>
                </div>
              </Link>
            ))}
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
  title: {
    fontSize: '2rem',
    marginBottom: '10px',
    color: '#111',
    fontWeight: '600',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '30px',
    margin: '0 0 30px 0',
  },
  empty: {
    padding: '40px',
    color: '#999',
    textAlign: 'center',
  },
  authorsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  authorCard: {
    border: '1px solid #e8e8e8',
    padding: '20px',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'background-color 0.1s',
  },
  authorName: {
    fontSize: '1.1rem',
    marginBottom: '5px',
    color: '#111',
    fontWeight: '600',
    margin: '0 0 5px 0',
  },
  authorUsername: {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '10px',
    margin: '0 0 10px 0',
  },
  authorInfo: {
    fontSize: '0.85rem',
    color: '#999',
  },
}

export default AuthorsList