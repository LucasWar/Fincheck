import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { authService } from "../../../services/authService";
import type { SignupParams } from "../../../services/authService/signup";
import { useAuth } from "../../../app/hooks/useAuth";


const schema = z.object({
  name: z.string().nonempty({error: 'Nome é obrigatorio'}),
  email: z.email('Informe um email valido').nonempty({error: 'E-mail é obrigatorio'}),
  password: z.string().nonempty({error:'Senha é obrigatoria'}).min(8, {error:'Senha deve conter pelo menos 8 digitos'})
})

type formData = z.infer<typeof schema>

export function useRegisterController () {
  const { handleSubmit: hookUseFormHandleSubmit, register, formState: { errors } } = useForm<formData>({
    resolver: zodResolver(schema)
  });

  const { mutateAsync, isPending } = useMutation({
      mutationFn: async (data: SignupParams) => {
        return authService.signup(data)
      },
  })

  const { signin } = useAuth()

  const handleSubmit = hookUseFormHandleSubmit(async (data) => {
    try{
      const { accessToken } = await mutateAsync(data)
      signin(accessToken)
    } catch {
      toast.error('Ocorreu um error ao criar conta')
    }

  })

  return {handleSubmit, register, errors, isPending}
}