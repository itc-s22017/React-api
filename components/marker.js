import { MarkerF } from '@react-google-maps/api'

const Marker = (props, on = false) => {
  return (
    <MarkerF
      position={props.pos}
      animation={1}
      title={props.lng}
    />
  )
}

export default Marker
