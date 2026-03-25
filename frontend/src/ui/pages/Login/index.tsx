import { Link } from "react-router-dom";
import { Input } from "../../../assets/components/input";
import { Button } from "../../../assets/components/button";
import { useLoginController } from "./useLoginController";

export function Login() {
  const {handleSubmit, register, errors, isPending } = useLoginController()
  return (
    <div>
      <header className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Entre em sua conta
        </h1>

        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">
            Novo por aqui?
          </span> 
          <Link to='/register' className="tracking-[-0.5px] font-medium text-teal-900">
            Crie uma conta
          </Link>
        </p>
      </header>
      <form onSubmit={handleSubmit} className="mt-16 flex flex-col gap-4">
        <Input 
          type="email" 
          placeholder="E-email" 
          error={errors.email?.message}
          {...register('email')} 
          />
        
        <Input 
          type="password" 
          placeholder="Senha" 
          error={errors.password?.message}
          {...register('password')}
        />
        <Button type="submit" className="mt-2" isLoading={isPending}>
          Entrar
        </Button>
      </form>
    </div>
  )
}