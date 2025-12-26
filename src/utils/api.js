const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

export async function fetchAllAuthors() {
    const response = await fetch(`${API_BASE}/authors`)
    if (!response.ok) {
        throw new Error('Failed to fetch authors')
    }
    return response.json()
}

export async function fetchAuthorPosts(username) {
    const response = await fetch(`${API_BASE}/authors/${username}`)
    if (!response.ok) {
        throw new Error('Author not found')
    }
    return response.json()
}

export async function fetchPostDetails(postId) {
    const response = await fetch(`${API_BASE}/posts/${postId}`)
    if (!response.ok) {
        throw new Error('Post not found')
    }
    return response.json()
}

export async function loginUser(credentials) {
    const response = await fetch(`${API_BASE}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    })
    if (!response.ok) {
        throw new Error('Login failed')
    }
    return response.json()
}

export async function signupUser(userData) {
    const response = await fetch(`${API_BASE}/user/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    if (!response.ok) {
        throw new Error('Signup failed')
    }
    return response.json()
}

export async function createComment(commentData) {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_BASE}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(commentData),
    })
    if (!response.ok) {
        if (response.status === 401) {
            removeToken()
            throw new Error('Authentication failed')
        }
        throw new Error('Failed to create comment')
    }
    return response.json()
}

export function getToken() {
    return localStorage.getItem('token')
}

export function setToken(token) {
    localStorage.setItem('token', token)
}

export function removeToken() {
    localStorage.removeItem('token')
}
