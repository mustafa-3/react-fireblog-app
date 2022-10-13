import AuthContextProvider from "./context/AuthContextProvider";
import BlogContextProvider from "./context/BlogContextProvider";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <BlogContextProvider>
      <AuthContextProvider>
        <AppRouter />
      </AuthContextProvider>
    </BlogContextProvider>
  );
}

export default App;
