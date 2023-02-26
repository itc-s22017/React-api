// ローカルストレージに保存したけど一個前の値が適用されてしまいます;;
import { useState, useEffect } from 'react'
const Square = (props) => {
  return (
    <button className='square' onClick={e => props.handleValue(props.index)}>
      {props.value}
    </button>
  )
}

const Board = (props) => {
  const Rendersq = () => {
    const sq = props.array.map((v, i) => {
      return <Square key={i} handleValue={props.handleValue} index={i} value={v} />
    })
    return sq
  }

  return (
    <div>
      <div className='board-row'>
        <Rendersq array={props.array} />
      </div>
    </div>
  )
}
const Game = () => {
  const array = Array.from({ length: 9 }, (_, i) => '')
  const [squares, setSquares] = useState(array)
  const [flag, setFlag] = useState(false)

  /*
  useEffect(() => {
    const d = window.localStorage.getItem('sq')
    setSquares(JSON.parse(d))

    const b = window.localStorage.getItem('flag')
    setFlag(JSON.parse(b))
  }, [])
  */

  let status
  const winner = calculateWinner(squares)
  if (winner) {
    status = 'Winner: ' + winner
  } else {
    status = 'Next player: ' + (flag ? 'O' : 'X')
  }

  const handleValue = (value, e) => {
    if (calculateWinner(squares) || squares[value]) { // squares[value]でマス目判定できる意味がわからないけどとりあえず
      return
    }
    /*
    window.localStorage.setItem('sq', JSON.stringify(squares))
    window.localStorage.setItem('flag', JSON.stringify(flag))
    */
    const v = flag ? 'O' : 'X'
    const copy = [...squares]
    const index = copy.map((v, i) => {
      return i
    }).indexOf(value)
    copy[index] = v
    setSquares(copy)

    setFlag(prev => !prev)
  }

  const reset = () => {
    setFlag(false)
    setSquares(array)
  }

  return (
    <>
      <div className='game'>
        <div className='game-board'>
          <p> {status} </p>
          <Board array={squares} handleValue={handleValue} flag={flag} />
          <button onClick={reset}>RESET</button>
        </div>
      </div>
    </>
  )
}

function calculateWinner (squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

export default Game
