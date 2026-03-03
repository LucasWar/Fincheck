import { Link } from "react-router-dom";
import { Input } from "../../../assets/components/input";
import { Button } from "../../../assets/components/button";

export function Login() {
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
      <form className="mt-16 flex flex-col gap-4">
        <Input type="email" placeholder="E-email" name="email" />
        <Input type="password" placeholder="Senha" name="senha" />
        <Button type="submit" className="mt-2">
          Entrar
        </Button>
      </form>
    </div>
  )
}