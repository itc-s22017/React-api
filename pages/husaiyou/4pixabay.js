import { useRef, useState, useEffect } from 'react'
import styles from 'styles/App.module.css'
import style from 'styles/img.module.css'

const ImageGrallery = ({ fetchData }) => {
  return (
    <div className={style.imageswrapper}>
      {fetchData.map(data => (
        <div className={style.image} key={data.id}>
          <img src={data.largeImageURL} alt='' />
        </div>
      ))}
    </div>
  )
}

const App = () => {
  const [fetchData, setFetchData] = useState([])
  const ref = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(ref.current.value)

    // fetch
    const endpoint = `https://pixabay.com/api/?key=33364810-28be05fa9edf2b00bbe60c0aa&q=${ref.current.value}&image_type=photo`
    fetch(endpoint)
      .then(res => {
        return res.json()
      })
      .then(data => {
        setFetchData(data.hits)
      })
  }
  return (
    <div className={styles.container}>
      <h2>My Pixabay</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type='text' placeholder='search' ref={ref} />
      </form>
      <ImageGrallery fetchData={fetchData} />
    </div>
  )
}

export default App
