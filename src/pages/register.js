import { useState } from "react"
import { auth } from "../services/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/router"
import styles from "../styles/register.module.css"

export default function Register() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      router.push("/login")
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className={styles.container}>

      <form className={styles.form} onSubmit={handleRegister}>

        <h2 className={styles.title}>Cadastro</h2>

        <input
          className={styles.input}
          type="email"
          placeholder="Digite seu email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          className={styles.input}
          type="password"
          placeholder="Digite sua senha"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button className={styles.button}>
          Criar conta
        </button>

      </form>

    </div>
  )
}