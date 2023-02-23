import { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = 'https://jsonplaceholder.typicode.com/posts/1'

const App = () => {
  const [post, setPost] = useState(null)

  useEffect(() => {
    axios.get(baseUrl)
      .then(res => {
        console.log(res)
        setPost(res.data)
      })
  }, [])

  if (!post) return null

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p>

    </>
  )
}

export default App
