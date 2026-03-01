import { Stack, Redirect, usePathname } from "expo-router";
import { useAuthStore } from "../src/store/auth.store";
import { FavoritesProvider } from "../src/context/FavoritesContext";
import { EnrollProvider } from "../src/context/EnrollContext";

export default function RootLayout() {
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );
  const pathname = usePathname();

  return (
    <EnrollProvider>
      <FavoritesProvider>
        <AuthWrapper
          isAuthenticated={isAuthenticated}
          pathname={pathname}
        />
      </FavoritesProvider>
    </EnrollProvider>
  );
}

function AuthWrapper({
  isAuthenticated,
  pathname,
}: {
  isAuthenticated: boolean;
  pathname: string;
}) {

  if (!isAuthenticated && !pathname.startsWith("/auth")) {
    return <Redirect href="/auth/login" />;
  }

 
  if (isAuthenticated && pathname.startsWith("/auth")) {
    return <Redirect href="/(tabs)/courses" />;
  }


  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}