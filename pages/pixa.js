import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Container from 'components/container'

const Btn = (props) => {
  return (
    <button onClick={props.handleBtn}>{props.title}</button>
  )
}

const Input = (props) => {
  return (
    <form onSubmit={(e) => props.handleSubmit(e)}>
      <input type='text' value={props.value} onChange={(e) => props.setText(e.target.value)} />
    </form>
  )
}

const Img = (props) => {
  const imgs = props.data.map(res => (
    <a href={res.pageURL} key={res.id}>
      <img src={res.webformatURL} />
    </a>
  ))
  return (
    <>
      {imgs}
    </>
  )
}

const App = () => {
  const [Text, setText] = useState('')
  const [Images, setImages] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const url = 'https://pixabay.com/api/'
      const params = {
        q: Text,
        key: process.env.NEXT_PUBLIC_PIXABAY,
        per_page: 10
      }
      const data = await axios.get(url, { params })
      setImages(prev => data.data.hits)
      console.log(Images)
    } catch (e) {
      console.log(e)
    }
  }

  const handleBtn = () => {
    const copy = [...Images]
    const fil = copy.filter(res => {
      return res.likes >= 1000
    })
    setImages(fil)
  }

  return (
    <>
      <Container>
        <Btn title='いいね1000以上' handleBtn={handleBtn} />
        <Input setText={setText} value={Text} handleSubmit={handleSubmit} />
        <Img data={Images} />
      </Container>
    </>
  )
}

export default App
