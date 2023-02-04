import instance from './instance'
export const putEditPost = async (slugData, { rejectWithValue }) => {
  try {
    const { slug } = slugData
    const token = localStorage.getItem('token')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
    const res = await instance.put(`articles/${slug}`, slugData.validData, { headers })
    return res.data
  } catch (error) {
    return rejectWithValue('Статья не обновлена')
  }
}

// export const putEditPost = async (slug, article) => {
//   const token = localStorage.getItem('token')
//   const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({ article }),
//   })
//   if (!response.ok) {
//     return 'Статья не обновлена'
//   }
//   const data = await response.json()
//   return data
// }
