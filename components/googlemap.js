import { LoadScript, GoogleMap } from '@react-google-maps/api'
import Marker from 'components/marker'

const Map = (props) => {
  const style = {
    height: '80vh',
    width: '80%'
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
          {props.on && <Marker
            pos={props.pos}
            lng={props.lng}
                       />}
        </GoogleMap>
      </LoadScript>
    </>
  )
}

export default Map
