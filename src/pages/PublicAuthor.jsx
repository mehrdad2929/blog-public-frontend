import { useLoaderData, Link } from 'react-router-dom'
import { useEffect } from 'react'
import Header from '../components/Header'

function PublicAuthor() {
  const { author } = useLoaderData()

  useEffect(() => {
    document.title = `${author.username}'s blog`
  }, [author.username])

  return (
    <div>
      <Header />
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.authorName}>{author.name}&apos;s Blog</h1>
          <p style={styles.authorUsername}>@{author.username}</p>
        </header>

        <section style={styles.postsSection}>
          <h2 style={styles.sectionTitle}>Posts ({author.posts?.length || 0})</h2>

          {author.posts?.length === 0 ? (
            <div style={styles.emptyState}>No posts yet</div>
          ) : (
            <div style={styles.postsList}>
              {author.posts.map(post => (
                <article key={post.id} style={styles.postCard}>
                  <Link to={`/posts/${post.id}`} style={styles.postLink}>
                    <h3 style={styles.postTitle}>{post.title}</h3>
                    <p style={styles.postExcerpt}>
                      {post.content.substring(0, 150)}
                      {post.content.length > 150 ? '...' : ''}
                    </p>
                    <div style={styles.postMeta}>
                      <small>{new Date(post.createdAt).toLocaleDateString()}</small>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '20px',
  },
  header: {
    marginBottom: '30px',
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: '20px',
  },
  authorName: {
    fontSize: '2rem',
    marginBottom: '5px',
    color: '#111',
    fontWeight: '600',
  },
  authorUsername: {
    fontSize: '1rem',
    color: '#666',
    margin: '0',
  },
  postsSection: {
    marginTop: '30px',
  },
  sectionTitle: {
    fontSize: '1.3rem',
    marginBottom: '20px',
    color: '#111',
    fontWeight: '600',
  },
  emptyState: {
    padding: '20px',
    color: '#999',
  },
  postsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  postCard: {
    border: '1px solid #e8e8e8',
    padding: '20px',
  },
  postLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  postTitle: {
    fontSize: '1.1rem',
    marginBottom: '8px',
    color: '#111',
    fontWeight: '600',
    margin: '0 0 8px 0',
  },
  postExcerpt: {
    color: '#666',
    marginBottom: '12px',
    lineHeight: '1.5',
    margin: '0 0 12px 0',
  },
  postMeta: {
    color: '#999',
    fontSize: '0.85rem',
  },
}

export default PublicAuthor