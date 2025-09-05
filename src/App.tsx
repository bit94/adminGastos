import { useState } from 'react'
import miLogo from '/logo.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href='#' target='_blank'>
          <img src={miLogo} className='mi logo' alt='mi logo'></img>
        </a>
      </div>
      <h1>Administrador de gastos</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
