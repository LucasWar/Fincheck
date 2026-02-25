import { Outlet } from "react-router-dom";
import illustration from '../../assets/illustration.png'
export function AuthLayout() {
  return (
    <div className="flex h-full w-full">
      <div className="w-1/2 h-full bg-red-200"> Ola</div>
      <div className="w-1/2 h-full flex justify-center items-center p-8">
        <img 
          src={illustration} 
          className="object-contain w-full h-full max-w-[656px] max-h-[960px]"
        />
      </div>
      <Outlet />
    </div>
  )
}