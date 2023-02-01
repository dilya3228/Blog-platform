import instance from './instance'
export const putEditPost = async (slug, article) => {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`,
  }
  const res = await instance.put(`/articles/${slug}`, article, { headers })
  if (res.status >= 400) {
    throw new Error('ошибка обработки данных')
  }
  return res.data
}
