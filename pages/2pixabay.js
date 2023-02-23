import { useState, useRef } from 'react'
import axios from 'axios'

const Img = ({ data }) => {
  return (
    <>
      {
      data.map(res => <a href={res.pageURL} key={res.id}><img src={res.webformatURL} key={res.id} /></a>)
    }
    </>
  )
}

const App = () => {
  const [images, setImages] = useState([])
  const inputvalue = useRef()

  const handleImages = async (e) => {
    e.preventDefault()
    const url = `https://pixabay.com/api/?key=33364810-28be05fa9edf2b00bbe60c0aa&q=${inputvalue.current.value}&image_type=photo`
    try {
      const get = await axios.get(url)
      setImages(get.data.hits)
    } catch {
    }
  }

  const remove = async () => {
    const rm = await images.filter(res => {
      return res.likes >= 1000
    })

    try {
      setImages(rm)
    } catch (e) {
      console.log(e)
    }
  }

  const purge = () => {
    setImages([])
  }
  return (
    <>
      <h5>Search Images...</h5>
      <button onClick={remove}>いいねが1000以上のみ</button>
      <button onClick={purge}>delete all</button>
      <form onSubmit={(e) => handleImages(e)}>
        <input type='text' ref={inputvalue} />
      </form>
      <Img data={images} />
    </>
  )
}

export default App
