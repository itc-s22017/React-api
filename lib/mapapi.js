import axios from 'axios'

export const getMap = async (ref) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: ref,
        key: process.env.NEXT_PUBLIC_MAPS_KEY
      }
    })
    return response
  } catch (error) {
    console.error('Not Found...')
  }
}
