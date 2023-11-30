import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { RegisterPage, LoginPage, HomePage } from './pages'
import { EditDescription } from './components'

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<RegisterPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/home" element={<HomePage data={[]}/>}/>
          <Route path="/update/:id" element={<EditDescription/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
