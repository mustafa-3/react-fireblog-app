import AuthContextProvider from "./context/AuthContextProvider";
import BlogContextProvider from "./context/BlogContextProvider";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <AuthContextProvider>
      <BlogContextProvider>
        <AppRouter />
      </BlogContextProvider>
    </AuthContextProvider>
  );
}

export default App;
