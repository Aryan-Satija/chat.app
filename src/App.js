import Router from "./routes";
import ThemeProvider from './theme';
import ThemeSettings from './components/settings';
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <ThemeProvider>
      <ThemeSettings>
        <Router />
        <ToastContainer/>
      </ThemeSettings>
    </ThemeProvider>
  );
}

export default App;
