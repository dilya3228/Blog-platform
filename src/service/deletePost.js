import instance from './instance'
export const deletePost = async (slug) => {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
  instance.delete(`articles/${slug}`, { headers })
}
