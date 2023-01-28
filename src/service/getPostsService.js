// const baseUrl = 'https://blog.kata.academy/api/'

// export const getListPost = async (offset = 0, { rejectWithValue }) => {
//   try {
//     const res = await fetch(`${baseUrl}articles?limit=5`, {
//       params: {
//         offset,
//       },
//     })
//     if (!res.ok) {
//       throw new Error('aboba')
//     }
//     const data = res.json()
//     console.log(data)
//     return data
//   } catch (error) {
//     return rejectWithValue(error.message)
//   }
// }
import instance from './instance'
export const getListPost = async (offset = 0, { rejectWithValue }) => {
  try {
    const res = await instance.get('articles', {
      params: {
        limit: 5,
        offset,
      },
    })
    return res.data
  } catch (error) {
    return rejectWithValue(error.message)
  }
}
