import { useState } from "react"
import { auth } from "../services/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/router"

export default function Register() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      router.push("/dashboard")
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <form onSubmit={handleRegister}>
      <h2>Cadastro</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Cadastrar</button>
    </form>
  )
}