import { Link } from "react-router-dom";
import { Button } from "../../../assets/components/button";
import { Input } from "../../../assets/components/input";

export function Register() {
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
      <form className="mt-16 flex flex-col gap-4">
        <Input type="text" placeholder="Nome" name="name" />
        <Input type="email" placeholder="E-email" name="email" />
        <Input type="password" placeholder="Senha" name="senha" />
        <Button type="submit" className="mt-2">
          Criar contar
        </Button>
      </form>
    </div>
  )
}