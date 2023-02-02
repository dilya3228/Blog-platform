import instance from './instance'
export const putEditPost = async (slug, article) => {
  try {
    const token = localStorage.getItem('token')
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    const res = await instance.put(`articles/${slug}`, { article }, { headers })
    return res.data
  } catch (error) {
    return error.message
    // throw new Error('ошибка обработки данных')
  }
}
// import axios from 'axios'
// export const putEditPost = async (slug, article) => {
//   const token = localStorage.getItem('token')
//   const headers = { 'Content-Type': 'application/json', Authorization: `Token ${token}` }

//   try {
//     const response = await axios({
//       method: 'put',
//       url: `https://blog.kata.academy/api/articles/${slug}`,
//       data: article,
//       headers: headers,
//     })

//     return response.data
//   } catch (error) {
//     return error.message
//   }
// }

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
