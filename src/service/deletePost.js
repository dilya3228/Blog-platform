import instance from './instance'
export const deletePost = async (slug, { rejectWithValue }) => {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
  const response = instance.delete(`articles/${slug}`, { headers })
  if (!response.ok) {
    return rejectWithValue('Статья не удалена')
  }
}
