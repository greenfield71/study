import { useState } from 'react'
import './App.css'

function Login() {

   const [username, setUsername] = useState('')
   const [password, setPassword] = useState("")

   const [usernameError, setUsernameError] = useState('')
   const [passwordError, setPasswordError] = useState('')

   function login(e) {
      e.preventDefault()    

      if (username == '') {
         setUsernameError("Username kiritilmagan")
      }
      else
         setUsernameError('')
      if (password == '') {
         setPasswordError(" Parol kiritilmagan!")

      }
      else
         setPasswordError('')

   }
   return (
      <>
         <main>
            <form>
               <h3>Login</h3>
               <div className='row'>

                  <label>
                     Foydalanuvchi nomi
                  </label>
                  <input type='text' name='username' id='username' onChange={(e) => { setUsername(e.target.value); setUsernameError('') }} />
                  <i style={{
                     color: 'red',
                     fontSize: 12

                  }}>{usernameError}</i>
               </div>

               <div className='row'>

                  <label>
                     Parol
                  </label>
                  <input type='password' name='password' id='password' onChange={(e) => { setPassword(e.target.value); setPasswordError('') }} />
                  <i style={{
                     color: 'red',
                     fontSize: 12

                  }}>{passwordError}</i>
               </div>
               <button type='click' onClick={login}>

                  Kirish
               </button>
            </form>
         </main>

      </>
   )
}

export default Login
