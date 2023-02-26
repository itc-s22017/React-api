import Link from 'next/link'

const App = () => {
  return (
    <div>
      <ul>
        <li><Link href='/map'>Google Maps Api</Link></li>
        <li><Link href='/tictac'>チュートリアル(勝者判定まで)</Link></li>
      </ul>
    </div>
  )
}

export default App
