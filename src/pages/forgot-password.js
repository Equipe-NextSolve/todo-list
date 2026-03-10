import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebase";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/forgot-password.module.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email) {
      alert("Por favor, insira seu e-mail.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Um e-mail de redefinição de senha foi enviado. Verifique sua caixa de entrada.");
      setTimeout(() => router.push("/login"), 5000);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        alert("Não há usuário cadastrado com este e-mail.");
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleResetPassword}>
        <h2 className={styles.title}>Redefinir Senha</h2>
        <p className={styles.subtitle}>
          Digite o e-mail associado à sua conta e enviaremos um link para redefinir sua senha.
        </p>
        
        {message && <p className={styles.successMessage}>{message}</p>}

        <input
          className={styles.input}
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className={styles.button} type="submit">
          Enviar E-mail de Redefinição
        </button>

        <p className={styles.backToLogin}>
          <Link href="/login">
            Voltar para o Login
          </Link>
        </p>
      </form>
    </div>
  );
}
