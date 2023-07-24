import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PrimeReactProvider } from 'primereact/api'
import Menu from './Components/Menu'
import Departamentos from './Pages/Departamentos'
import FormDepartamentos from './Pages/FormDepartamentos'

const App = () => {
  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <Menu/>
        <div className='container mx-auto'>
          <Routes>
            <Route path='/'>
              <Route index element={<h1>Bem vindo</h1>}/>

              <Route path='departamentos'>
                <Route index element={<Departamentos/>} />
                <Route path='new' element={<FormDepartamentos/>} />
              </Route>

              <Route path="*" element={<h1>Not Found</h1>}/>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </PrimeReactProvider>
  )
}

export default App
