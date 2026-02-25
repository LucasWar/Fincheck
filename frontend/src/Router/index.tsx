import {Routes, Route, BrowserRouter} from 'react-router-dom'
import { AuthGuard } from './auth-guard'
import { AuthLayout } from '../ui/layouts/auth-layout'

export function Router() {
  return(
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard   isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path='/login' element={<h1>Login</h1>}/>
            <Route path='/register' element={<h1>Register</h1>}/>
          </Route>
        </Route>
        <Route element={<AuthGuard isPrivate={true} />}>
          <Route path='/' element={<h1>Dahsboard</h1>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}