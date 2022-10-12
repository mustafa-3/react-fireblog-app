import BlogContextProvider from "./context/BlogContextProvider";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <BlogContextProvider>
      <AppRouter />;
    </BlogContextProvider>
  );
}

export default App;
