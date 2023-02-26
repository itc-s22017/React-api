import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Container from 'components/container'
const Input = (props) => {
  return (
    <form onSubmit={(e) => props.handleSubmit(e)}>
      <input type='text' value={props.value} onChange={(e) => props.setText(e.target.value)} />
    </form>
  )
}

const Img = (props) => {
  const imgs = props.data.map(res => (
    <img src={res.webformatURL} key={res.id} onClick={(e) => props.targetIndex(e, res)} />
  ))
  return (
    <>
      {imgs}
    </>
  )
}

/*
  const Testing = (props) => {
  return (
    <>
      <Image src='/about.jpg' alt='' width={500} height={500} />
      <button onClick={(e) => props.handleReq(e)}>click!</button>
    </>
  )
}
*/
const App = () => {
  const [Text, setText] = useState('')
  const [Images, setImages] = useState([])

  useEffect(() => {
    window.localStorage.setItem('images', JSON.stringify(Images))
  }, [Images])

  useEffect(() => {
    const d = window.localStorage.getItem('images')
    setImages(JSON.parse(d))
  }, [])

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

  const targetIndex = (e, target) => {
    if (!window.confirm('SURE?')) {
      return
    }
    const v = [
      { ...target }
    ]
    setImages(v)

    const btn = document.createElement('button')
    btn.textContent = 'This'
    e.target.parentNode.appendChild(btn)

    const url = 'https://techhk.aoscdn.com/api/tasks/visual/segmentation'
    const params = {
      headers: {
        'X-API-KEY': ''
      },
      formData: {
        sync: 1,
        image_file: '/about.jpg',
        type: 'face'
      }
    }
    btn.addEventListener('click', async () => {
      try {
        const res = await axios.post(url, { params })
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    })
  }

  /*
  const handleReq = async (e) => {
    const url = 'https://techhk.aoscdn.com/api/tasks/visual/segmentation'
    // const res = await axios.get('https://cdn.pixabay.com/photo/2023/01/05/22/35/flower-7700011_960_720.jpg', { responseType: 'stream' })
    const res = await axios.get('/about.jpg', { responseType: 'stream' })
    const params = {
      headers: {
        'X-API-KEY': 'wxgttdihljk64116o'
      },
      formData: {
        sync: 1,
        image_file: res,
        type: 'face'
      }
    }

    try {
      const res = await axios.post(url, { params })
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }
  */

  return (
    <>
      <Container>
        <Input setText={setText} value={Text} handleSubmit={handleSubmit} />
        <Img data={Images} targetIndex={targetIndex} />
      </Container>
    </>
  )
}

export default App
