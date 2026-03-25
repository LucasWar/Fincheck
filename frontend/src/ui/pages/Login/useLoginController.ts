import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from "@tanstack/react-query";
import type { SigninParams } from "../../../services/authService/signin";
import { authService } from "../../../services/authService";
import toast from "react-hot-toast";
import { useAuth } from "../../../app/hooks/useAuth";

const schema = z.object({
  email: z.email('Informe um email valido').nonempty({error: 'E-mail é obrigatorio'}),
  password: z.string().nonempty({error:'Senha é obrigatoria'}).min(8, {error:'Senha deve conter pelo menos 8 digitos'})
})

type formData = z.infer<typeof schema>

export function useLoginController () {
  const { handleSubmit: hookUseFormHandleSubmit, register, formState: { errors } } = useForm<formData>({
    resolver: zodResolver(schema)
  });

  const { mutateAsync, isPending } = useMutation({
      mutationFn: async (data: SigninParams) => {
        return authService.signin(data)
      },
  })

  const { signin } = useAuth()

  const handleSubmit = hookUseFormHandleSubmit(async (data) => {
    try{
      const { accessToken } = await mutateAsync(data)
      signin(accessToken)
    } catch {
      toast.error('Ocorreu um error ao realizar login')
    }

  })

  return {handleSubmit, register, errors, isPending}
}