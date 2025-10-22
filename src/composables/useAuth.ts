import { ref, onMounted } from "vue";
import { supabase } from "../supabase";

export const useAuth = () => {
  const user = ref(null);
  const loading = ref(true);
  const session = ref();

  // Registrar usuario
  const signUp = async (email: any, password: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  };

  // Iniciar sesión
  const signIn = async (email: any, password: any) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    session.value = data.session as any;
    return { data, error };
  };

  // Cerrar sesión
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    user.value = null;
    return { error };
  };

  // Obtener usuario actual
  const getUser = async () => {
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();
    user.value = currentUser as any;
    loading.value = false;
    return currentUser;
  };
  // Obtener sesion actual
  const getSession = async () => {
    const { data } = await supabase.auth.getSession();
    session.value = data.session;
    loading.value = false;

    return session.value;
  };

  // Escuchar cambios de autenticación
  const authStateChange = () => {
    supabase.auth.onAuthStateChange((event: any, session: any) => {
      user.value = session?.user || null;
    });
  };

  onMounted(() => {
    // getUser();
    // getSession();
    authStateChange();
  });

  return {
    loading,
    getSession,
    signUp,
    signIn,
    signOut,
    getUser,
  };
};
