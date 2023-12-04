// UserProfilePage.tsx
import { useEffect, useState } from "react";
import Auth, { Payload } from "@/service/auth/auth";

const UserProfilePage: React.FC = () => {
  const [user, setUser] = useState<Payload | null>(null);

  useEffect(() => {
    // Obter informações do usuário do token de autenticação
    const authData = Auth.getAuth();

    if (authData) {
      const userData = Auth.getDataFromToken(authData.access);
      setUser(userData);
    } else {
      // Se não houver dados de autenticação, redirecione para a página de login
      // (Isso depende do comportamento desejado em sua aplicação)
      // Pode ser uma boa ideia redirecionar ou exibir uma mensagem de erro.
      // Exemplo de redirecionamento: router.push("/auth/login");
    }
  }, []);

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Detalhes do Usuário</h1>
      <p>
        <strong>Nome:</strong> {user.name}
      </p>
      <p>
        <strong>CPF:</strong> {user.cpf}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Telefone:</strong> {user.phone}
      </p>
      <p>
        <strong>Endereço:</strong> {user.address}
      </p>
      {/* Outras informações do usuário conforme necessário */}
    </div>
  );
};

export default UserProfilePage;

