import axios from 'axios'
import { useState, useEffect } from 'react'

const baseURL = 'https://jsonplaceholder.typicode.com/users/'

const fetchData = async (url) => {
  const res = await axios.get(url)
  const json = res.data
  return json
}
const User = ({ user }) => (
  <li>{user.name}</li>
)

const UserList = ({ user }) => {
  return (
    <ul>
      {
    user.map(user => <User key={user.id} user={user} />)
    }
    </ul>
  )
}


const App = () => {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    fetchData(baseURL).then(res => {
      setUsers(res)
      console.log(res)
    })
  }, [])

  if (!users) return null

  return (
    <>
      <UserList user={users} />
    </>
  )
}

export default App
