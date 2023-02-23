import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api'
import { useState } from 'react'
import Container from 'components/container'
import icon from 'images-local/favicon.ico'

const Map = (props) => {
  const containerStyle = {
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
          mapContainerStyle={containerStyle} center={props.pos}
          options={options} onClick={e => props.position(e)}
        >
          <MarkerF
            position={props.pos} animation={2} title={props.lng}
            onClick={(e) => props.removeMarker(e)}
          />
        </GoogleMap>
      </LoadScript>
    </>
  )
}

const Main = () => {
  const tokyo = {
    lat: 35.69731,
    lng: 139.7747
  }

  const [pos, setPos] = useState(tokyo)

  const position = e => {
    setPos(e.latLng)
  }

  const removeMarker = (e) => {
    console.log(e)
  }

  return (
    <Container>
      <Map
        position={position} pos={pos}
        lng={String(`${pos.lat}:${pos.lng}`)}
        removeMarker={removeMarker}
      />
    </Container>
  )
}

export default Main
