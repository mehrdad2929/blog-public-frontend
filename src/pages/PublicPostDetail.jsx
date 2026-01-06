import { useState } from 'react'
import { useLoaderData, useActionData, Form, redirect } from 'react-router-dom'
import { createComment, getToken } from '../utils/api'
import Header from '../components/Header'

export async function action({ request, params }) {
  const formData = await request.formData()
  const content = formData.get('content')
  const parentCommentId = formData.get('parentCommentId')

  const token = getToken()
  if (!token) {
    return redirect('/login')
  }

  try {
    await createComment({
      postId: parseInt(params.id),
      parentCommentId: parentCommentId === '' ? null : parseInt(parentCommentId),
      content,
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to create comment:', error)
    return redirect('/login')
  }
}

function Comment({ comment, replyingTo, setReplyingTo, replyContent, setReplyContent, postId }) {
  return (
    <div style={styles.comment}>
      <div style={styles.commentHeader}>
        <strong>{comment.user?.username || 'Unknown'}</strong>
      </div>
      <div style={styles.commentContent}>{comment.content}</div>

      <div style={styles.commentActions}>
        <button
          onClick={() => setReplyingTo(comment.id)}
          style={styles.replyButton}
        >
          Reply
        </button>
      </div>

      {replyingTo === comment.id && (
        <Form method="post" style={styles.replyForm}>
          <textarea
            name="content"
            placeholder="Write your reply..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            style={styles.textarea}
            rows="2"
            autoFocus
          />
          <input type="hidden" name="parentCommentId" value={comment.id} />
          <div style={styles.replyActions}>
            <button type="submit" style={styles.button}>Post Reply</button>
            <button type="button" onClick={() => setReplyingTo(null)} style={styles.cancelButton}>Cancel</button>
          </div>
        </Form>
      )}

      {comment.replys && comment.replys.map(reply => (
        <div key={reply.id} style={styles.replyContainer}>
          <Comment
            comment={reply}
            replyingTo={replyingTo}
            setReplyingTo={setReplyingTo}
            replyContent={replyContent}
            setReplyContent={setReplyContent}
            postId={postId}
          />
        </div>
      ))}
    </div>
  )
}

function PublicPostDetail() {
  const { post } = useLoaderData()
  const actionData = useActionData()
  const token = getToken()
  const [replyingTo, setReplyingTo] = useState(null)
  const [replyContent, setReplyContent] = useState('')

  if (actionData?.success) {
    window.location.reload()
    return null
  }

  return (
    <div>
      <Header />
      <div style={styles.container}>
        <div style={styles.postContent}>
          <h1 style={styles.title}>{post.title}</h1>
          <div style={styles.meta}>
            <span>By {post.author?.username}</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          <div style={styles.content}>{post.content}</div>
        </div>

        <div style={styles.commentsSection}>
          <h2 style={styles.sectionTitle}>Comments ({post.comments?.length || 0})</h2>

          {post.comments && post.comments.length > 0 ? (
            <div style={styles.commentsList}>
              {post.comments.map(comment => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  replyingTo={replyingTo}
                  setReplyingTo={setReplyingTo}
                  replyContent={replyContent}
                  setReplyContent={setReplyContent}
                  postId={post.id}
                />
              ))}
            </div>
          ) : (
            <div style={styles.emptyComments}>No comments yet</div>
          )}

          {token ? (
            <div style={styles.commentForm}>
              <Form method="post">
                <input type="hidden" name="parentCommentId" value="" />
                <textarea
                  name="content"
                  placeholder="Write your comment..."
                  required
                  style={styles.textarea}
                />
                <button type="submit" style={styles.button}>Post Comment</button>
              </Form>
            </div>
          ) : (
            <div style={styles.loginPrompt}>
              <a href="/login" style={styles.link}>Login</a> to leave a comment
            </div>
          )}

          {actionData?.error && <div style={styles.error}>{actionData.error}</div>}
        </div>
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
  postContent: {
    marginBottom: '40px',
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: '30px',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '10px',
    color: '#111',
    fontWeight: '600',
  },
  meta: {
    display: 'flex',
    gap: '15px',
    color: '#666',
    marginBottom: '20px',
    fontSize: '0.9rem',
  },
  content: {
    lineHeight: '1.7',
    fontSize: '1rem',
    color: '#333',
    whiteSpace: 'pre-wrap',
  },
  commentsSection: {
    marginTop: '40px',
  },
  sectionTitle: {
    fontSize: '1.3rem',
    marginBottom: '20px',
    color: '#111',
    fontWeight: '600',
  },
  commentsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  comment: {
    padding: '15px',
    backgroundColor: '#fafafa',
    border: '1px solid #e8e8e8',
  },
  commentHeader: {
    marginBottom: '8px',
    fontSize: '0.85rem',
    color: '#666',
  },
  commentContent: {
    marginBottom: '10px',
    lineHeight: '1.5',
  },
  commentActions: {
    marginBottom: '10px',
  },
  replyButton: {
    padding: '4px 10px',
    fontSize: '0.85rem',
    backgroundColor: 'transparent',
    color: '#666',
    border: '1px solid #ccc',
    cursor: 'pointer',
  },
  replyForm: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ddd',
  },
  replyActions: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  },
  replyContainer: {
    marginLeft: '20px',
    marginTop: '10px',
  },
  emptyComments: {
    padding: '20px',
    color: '#999',
  },
  commentForm: {
    marginTop: '30px',
  },
  textarea: {
    width: '100%',
    minHeight: '60px',
    padding: '10px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    marginBottom: '10px',
    fontFamily: 'inherit',
    resize: 'vertical',
  },
  button: {
    padding: '8px 20px',
    backgroundColor: '#111',
    color: 'white',
    border: 'none',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '8px 15px',
    backgroundColor: 'white',
    color: '#666',
    border: '1px solid #ccc',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
  loginPrompt: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#fafafa',
    border: '1px solid #e8e8e8',
  },
  link: {
    color: '#111',
    textDecoration: 'underline',
  },
  error: {
    marginTop: '15px',
    padding: '8px',
    backgroundColor: '#fee',
    color: '#c33',
    border: '1px solid #fcc',
  },
}

export default PublicPostDetail