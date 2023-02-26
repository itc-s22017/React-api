import Head from 'next/head'
import axios from 'axios'
import { useState, useEffect } from 'react'

const SearchBar = ({ onSubmit }) => {
  const [term, setTerm] = useState('')
  return (
    <>
      <form
        className='ui form' onSubmit={(e) => {
          e.preventDefault()
          onSubmit(term)
        }}
      >
        <div className='field'>
          <label>Image Search</label>
          <input
            type='text' name='first-name' placeholder='' value={term} onChange={(e) => {
              setTerm(e.target.value)
            }}
          />
        </div>
      </form>
    </>
  )
}

const ImageList = ({ image }) => {
  const images = image.map(image => {
    return (
      <a href={image.pageURL} key={image.id}>
        <img src={image.webformatURL} alt={image.tags} />
      </a>
    )
  })

  return (
    <>
      {images}
    </>
  )
}

const App = () => {
  const [images, setImages] = useState([])

  useEffect(() => {
    window.localStorage.setItem('foo', JSON.stringify(images))
  }, [images])

  useEffect(() => {
      const d = window.localStorage.getItem('foo')
      setImages(JSON.parse(d))
  }, [])
  const onSearchSubmit = async (term) => {
    try {
      const param = {
        key: '33364810-28be05fa9edf2b00bbe60c0aa',
        q: term,
        per_page: 3
      }
      const response = await axios.get('https://pixabay.com/api/', { params: param })
      setImages(response.data.hits)
      console.log(images)

      if (response.data.total === 0) {
        window.alert('Not Found')
      }
    } catch {
      window.alert('Failed')
    }
  }

  return (
    <>
      <Head>
        <title>API</title>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.5.0/semantic.min.css' />
      </Head>

      <div className='ui container' style={{ marginTop: '20px' }}>
        <SearchBar onSubmit={onSearchSubmit} />
        <ImageList image={images} />
      </div>
    </>
  )
}

export default App
