// インスタンスを使わずに作ってみました
// places apiのnearBySearchを使いたかったのですがCORSエラーに引っかかってできませんでした
import { useState, useRef, useEffect } from 'react'
import GoogleMap from 'components/googlemap'
import { getMap } from 'lib/mapapi'

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
  const [pos, setPos] = useState({ lat: null, lng: null })
  const ref = useRef()
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPos({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    })
  }, [])

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
    const getData = getMap(ref.current.value) // lib directory
    getData
      .then(res => setPos(res.data.results[0].geometry.location))
  }

  const forMap = {
    position,
    pos,
    lng: `${pos.lat}:${pos.lng}` // 何故か更新されない
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
