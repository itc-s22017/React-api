import { GoogleMap, LoadScript, MarkerF, InfoWindow } from '@react-google-maps/api'
import { useState, useRef } from 'react'
import icon from 'images-local/favicon.ico'
import axios from 'axios'

const Marker = (props) => {
  return (
    <MarkerF
      position={props.pos}
      animation={1}
      title={props.lng}
    />
  )
}

const Info = (props) => {
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

const Map = (props) => {
  const style = {
    height: '50vh',
    width: '50%'
  }

  const options = {
    disableDefaultUI: true,
    zoom: 17,
    zoomControl: true,
    mapTypeId: 'hybrid'
  }

  return (
    <>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_MAPS_KEY}>
        <GoogleMap
          mapContainerStyle={style} center={props.pos}
          options={options} onClick={e => props.position(e)}
        >
          <Marker
            pos={props.pos}
            lng={props.lng}
          />
        </GoogleMap>
      </LoadScript>
    </>
  )
}

const Main = () => {
  const tokyo = {
    lat: 35.65856,
    lng: 139.745461
  }

  const [pos, setPos] = useState(tokyo)
  const ref = useRef()
  const [flag, setFlag] = useState(false)

  const position = e => {
    setPos(e.latLng)
    console.log(pos)
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

  return (
    <>
      <Map
        position={position} pos={pos}
        lng={String('a')}
        tokyo={tokyo}
      />
      <form onSubmit={e => handleSubmit(e)}>
        <input ref={ref} type='text' placeholder='例:東京タワー' />
      </form>
    </>
  )
}

export default Main
