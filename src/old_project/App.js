import { MatxTheme } from './app/components';
import { SettingsProvider } from './app/contexts/SettingsContext';
import { Store } from './app/redux/Store';
import { Provider } from 'react-redux';

// Imports for React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";

function App() {  
  const router = createBrowserRouter(routes);

  return (
    <Provider store={Store}>
      <SettingsProvider>
        <MatxTheme>
          <RouterProvider router={router} />
        </MatxTheme>
      </SettingsProvider>
      </Provider>
  );
}

export default App;
