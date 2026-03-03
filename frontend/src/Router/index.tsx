import {Routes, Route, BrowserRouter} from 'react-router-dom'
import { AuthGuard } from './auth-guard'
import { AuthLayout } from '../ui/layouts/auth-layout'
import { Login } from '../ui/pages/Login'
import { Register } from '../ui/pages/Register'

export function Router() {
  return(
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard   isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
          </Route>
        </Route>
        <Route element={<AuthGuard isPrivate={true} />}>
          <Route path='/' element={<h1>Dahsboard</h1>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}