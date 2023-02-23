import { useState } from 'react'

const Counter = props => {
  const [count, setCount] = useState(0)
  const handleCountUp = event =>
    setCount(event.target.value)
  return (
    <>
      <h1>{count}</h1>
      <input type='text' onChange={handleCountUp} />
    </>
  )
}

export default Counter
