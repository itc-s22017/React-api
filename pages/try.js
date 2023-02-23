import { useState } from 'react'

const init = () => {
  for (let i = 0; i < 20000; i++) {
    console.log(i)
  }
  return 0
}

const Counter = () => {
  const [count, setCount] = useState(() => {
    const init2 = init()
    return init2
  })
  return (
    <button onClick={() => {
      setCount(prev => prev + 1)
      setCount(prev => prev + 1)
    }}
    >
      {count}
    </button>
  )
}

const Inputform = () => {
  const [name, setName] = useState({
    first: '',
    last: ''
  })
  return (
    <>
      <input
        value={name.first} onChange={(e) => {
          setName((prev) => ({
            ...prev,
            first: e.target.value
          }))
        }}
      />
      <input
        value={name.last} onChange={(e) => {
          setName((prev) => ({
            ...prev,
            last: e.target.value
          }))
        }}
      />
      <p>{name.first}{name.last}</p>
    </>
  )
}

const App = () => {
  return (
    <Inputform />
  )
}

export default App
