import { useEffect, useState } from 'react'
import './Home.css'

const ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
]

function Home() {
  const [text, setText] = useState('')
  const [pressed, setPressed] = useState(null)

  const press = (key) => {
    setPressed(key)
    setTimeout(() => setPressed((p) => (p === key ? null : p)), 150)

    if (key === 'BACKSPACE') setText((t) => t.slice(0, -1))
    else if (key === 'CLEAR') setText('')
    else if (key === 'SPACE') setText((t) => t + ' ')
    else setText((t) => t + key)
  }

  // Jismoniy klaviaturadan ham yozish mumkin
  useEffect(() => {
    const onKeyDown = (e) => {
      if (/^[a-zA-Z]$/.test(e.key)) press(e.key.toUpperCase())
      else if (e.key === 'Backspace') press('BACKSPACE')
      else if (e.key === ' ') {
        e.preventDefault()
        press('SPACE')
      } else if (e.key === 'Escape') press('CLEAR')
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  const keyClass = (key, extra = '') =>
    `key ${extra} ${pressed === key ? 'key--pressed' : ''}`

  return (
    <main className="kb-page">
      <div className="kb-title">
        <h1>Klaviatura</h1>
        <p>Yozing — jismoniy yoki ekran klaviaturasi</p>
      </div>

      <div className="kb-card">
        <div className="kb-display" aria-live="polite">
          <span className="kb-text">{text}</span>
          <span className="kb-caret" />
        </div>

        <div className="kb-keys">
          {ROWS.map((row, i) => (
            <div className={`kb-row kb-row--${i + 1}`} key={i}>
              {row.map((k) => (
                <button key={k} className={keyClass(k)} onClick={() => press(k)}>
                  {k}
                </button>
              ))}
            </div>
          ))}

          <div className="kb-row kb-row--bottom">
            <button className={keyClass('CLEAR', 'key--wide key--action')} onClick={() => press('CLEAR')}>
              Tozalash
            </button>
            <button className={keyClass('SPACE', 'key--space')} onClick={() => press('SPACE')}>
              Bo'sh joy
            </button>
            <button className={keyClass('BACKSPACE', 'key--wide key--action')} onClick={() => press('BACKSPACE')}>
              ⌫
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
