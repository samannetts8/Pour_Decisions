import { useState } from 'react'
import styles from './App.module.css' 
import viteLogo from '/vite.svg'
import './App.css'
import URL_Link_Button  from './assets/components/URL_Link_Button'
import logo from '../../blueprints/static/assets/pour_decisions_logo_uncoloured.jpg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className={styles.container}>
    <img src={logo} className={styles.logo} alt='Pour Decisions Logo'/>
    <div className={styles.buttonContainer}>
    <URL_Link_Button url="http://127.0.0.1:5000" text_content="Database"/>
    <URL_Link_Button url="http://127.0.0.1:5000" text_content="Database"/>
    </div>
    </div>
  )
}

export default App
