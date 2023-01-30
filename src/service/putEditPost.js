import instance from './instance'
export const putEditPost = async (slug, userRegData) => {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
  const res = await instance.put(`/articles/${slug}`, userRegData, { headers })
  if (res.status >= 400) {
    throw new Error('ошибка обработки данных')
  }
  return res.data
}
