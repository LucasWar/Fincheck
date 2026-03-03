import { Outlet } from "react-router-dom";
import illustration from '../../assets/illustration.png'
import { Logo } from "../../assets/components/logo";
export function AuthLayout() {
  return (
    <div className="flex h-full w-full">
      <div className="w-full h-ful flex flex-col items-center justify-center lg:w-1/2">
        <Logo className="h-6 text-gray-500"/>
        <div className="mt-16 w-full max-w-126 px-8">
          <Outlet />
        </div>
      </div>

      <div className="w-1/2 h-full justify-center items-center p-8 relative hidden lg:flex">
        <img 
          src={illustration} 
          className="object-contain w-full h-full max-w-164 max-h-240"
        />
      </div>
    </div>
  )
}