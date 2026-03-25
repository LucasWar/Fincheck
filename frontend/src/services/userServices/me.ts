import { httpClient } from "../HttpClient"

interface MeResonse {
  name: string
  email: string 
}

export async function me() {
  const { data } = await httpClient.get<MeResonse>('/users/me')

  return data
}