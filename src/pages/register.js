import { useState, useEffect } from "react";
import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import Link from "next/link"
import styles from "../styles/register.module.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/login");
    } catch (error) {

      if (error.code === "auth/email-already-in-use") {
        setError("Este email já está cadastrado.");
      } else if (error.code === "auth/weak-password") {
        setError("A senha precisa ter pelo menos 6 caracteres.");
      } else {
        alert(error.message);
      }

    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleRegister}>
        <h2 className={styles.title}>Cadastro</h2>

        {error && <p className={styles.error}>{error}</p>}

        <input
          className={styles.input}
          type="email"
          placeholder="Digite seu email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className={styles.input}
          type="password"
          placeholder="Digite sua senha"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={styles.button}>
          Criar conta
        </button>

        <p className={styles.loginText}>
          Já tem uma conta?{" "}
          <Link href="/login">
            Login
          </Link>
        </p>

      </form>
    </div>
  );
}
