import { useState, useRef, useEffect } from 'react'

const TodoItem = (props) => {
  return (
    <li style={{ listStyleType: 'none' }}>
      <label>
        <input
          type='checkbox'
          checked={props.todo.isDone}
          onChange={() => props.c(props.todo)}
        />
        <span>{props.todo.title}</span>
      </label>
      <span id='D' style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => props.deleteTodo(props.todo)}>[x]</span>
      <span style={{ margin: 0 }} onClick={(e) => props.time(e)} id='timer'> ⌚ </span>
    </li>
  )
}

const TodoList = (props) => {
  const todos = props.todo.map(res => {
    return (
      <TodoItem
        key={res.id} todo={res} isDone={res.isDone}
        c={props.c} deleteTodo={props.deleteTodo}
        time={props.time}
      />
    )
  })
  return (
    <>
      {todos.length ? todos : 'Nothing..'}
    </>
  )
}

const Input = (props) => {
  return (
    <>
      <form onSubmit={(e) => props.handleInput(e)}>
        <input type='text' value={props.value} onChange={(e) => props.setText(e.target.value)} />
      </form>
      <button style={{ marginLeft: '5px' }} onClick={props.handleDelete}>完了済みを削除</button>
    </>
  )
}

const App = () => {
  const [Todos, setTodos] = useState([])
  const [text, setText] = useState('')
  const [span, setspan] = useState([])

  useEffect(() => {
    window.localStorage.setItem('Todos', JSON.stringify(Todos))
    const t = Array.from(document.querySelectorAll('#timer'))
    setspan(t)
  }, [Todos])

  useEffect(() => {
    setTodos(JSON.parse(window.localStorage.getItem('Todos')))
  }, [])

  const handleInput = (e) => {
    e.preventDefault()
    if (text === '') { return }
    const date = new Date().getTime().toString(16)
    const todo = { id: date, title: text, isDone: false }
    const todos = Todos.slice()
    todos.push(todo)
    setTodos(todos)
    setText('')
  }

  const checkBox = (todo) => {
    const todos = Todos.slice()
    const pos = todos.map(todo => {
      return todo.id
    }).indexOf(todo.id)
    todos[pos].isDone = !todos[pos].isDone
    setTodos(todos)
  }

  const handleDelete = () => {
    if (!window.confirm('削除する？')) { return }

    const todos = Todos.filter(todo => {
      return !todo.isDone
    })

    setTodos(todos)
  }

  const deleteTodo = (todo) => {
    if (!window.confirm('削除する？')) { return }

    const todos = [...Todos]

    const pos = todos.map(todo => {
      return todo.title
    }).indexOf(todo.title)

    todos.splice(pos, 1)
    setTodos(todos)
  }

  let endTime
  let countdown
  let Timer

  const checker = () => {
    countdown = endTime - new Date().getTime()

    const totalSeconds = Math.floor(countdown / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = Math.floor(totalSeconds % 60)

    const minutesFor = String(minutes).padStart(2, '0')
    const secondsFor = String(seconds).padStart(2, '0')
    console.log(`${minutesFor}:${secondsFor}`)
    if (countdown < 0) {
      clearInterval(Timer)
    }
  }

  const timer = (e) => {
    const text = window.prompt('何分にしますか?')
    if (text) {
      endTime = new Date().getTime() + parseInt(text * 1000)
      Timer = setInterval(checker, 100)
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Todos</h3>
      <ul>
        <TodoList todo={Todos} c={checkBox} deleteTodo={deleteTodo} time={timer} />
      </ul>
      <Input handleInput={handleInput} value={text} setText={setText} handleDelete={handleDelete} />
    </div>
  )
}

export default App
