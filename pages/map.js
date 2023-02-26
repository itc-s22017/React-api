import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import GoogleMap from 'components/googlemap'

/* const Info = (props) => {
  return (
    <>
      <InfoWindow position={props.tokyo}>
        <div>
          <h2>{props.title}</h2>
        </div>
      </InfoWindow>
    </>
  )
}
*/
const Main = () => {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      setPos({
        lat: latitude,
        lng: longitude
      })
    })
  }, [])

  const [pos, setPos] = useState({ lat: null, lng: null })
  const ref = useRef()

  useEffect(() => {
    console.log(pos)
  }, [pos])
  const position = e => {
    const p = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    }
    setPos(p)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: ref.current.value,
          key: process.env.NEXT_PUBLIC_MAPS_KEY
        }
      })
      setPos(response.data.results[0].geometry.location)
    } catch (error) {
      console.error('Not Found...')
    }
  }

  const forMap = {
    position,
    pos,
    lng: pos.lng
  }

  return (
    <>
      <GoogleMap {...forMap} on />
      <form onSubmit={e => handleSubmit(e)}>
        <input ref={ref} type='text' placeholder='例:東京タワー' />
      </form>
    </>
  )
}

export default Main
