import { Link } from "react-router-dom";
import { Button } from "../../../assets/components/button";
import { Input } from "../../../assets/components/input";
import { useRegisterController } from "./userRegisterController";

export function Register() {

  const {errors, handleSubmit, register, isPending } = useRegisterController()

  return (
    <div>
      <header className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Crie sua conta
        </h1>

        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">
            Ja possui uma conta?
          </span> 
          <Link to='/login' className="tracking-[-0.5px] font-medium text-teal-900">
            Login
          </Link>
        </p>
      </header>
      <form onSubmit={handleSubmit} className="mt-16 flex flex-col gap-4">
        <Input 
          type="text" 
          placeholder="Nome" 
          error={errors.name?.message}
          {...register('name')}
        />
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
          Criar contar
        </Button>
      </form>
    </div>
  )
}