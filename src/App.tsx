import CustomThemeProvider from "./theme.js";
import AppRouter from "./routes/AppRouter.js";

function App(): React.JSX.Element {
  return (
    <CustomThemeProvider>
      <AppRouter />
    </CustomThemeProvider>
  );
}

export default App;