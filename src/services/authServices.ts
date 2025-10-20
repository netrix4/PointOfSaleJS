// Simulación de base de datos de usuarios
const users = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    role: "admin",
    name: "Administrador Principal",
  },
  {
    id: 2,
    username: "usuario1",
    password: "user123",
    role: "user",
    name: "Usuario Normal",
  },
  {
    id: 3,
    username: "moderador",
    password: "mod123",
    role: "moderator",
    name: "Usuario Moderador",
  },
];

export const authService = {
  // Simular llamada a API con delay
  async authenticate(username: any, password: any) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(
          (u) => u.username === username && u.password === password
        );

        if (user) {
          // No devolver la contraseña
          const { password, ...userWithoutPassword } = user;
          resolve({
            success: true,
            user: userWithoutPassword,
            token: `fake-jwt-token-${user.id}`, // Token simulado
          });
        } else {
          reject({
            success: false,
            message: "Usuario o contraseña incorrectos",
          });
        }
      }, 800); // Simular latencia de red
    });
  },

  // Validar token (para mantener sesión)
  async validateToken(token: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // En producción, aquí validarías el token con el backend
        const isValid = token && token.startsWith("fake-jwt-token");
        resolve(isValid);
      }, 300);
    });
  },
};
