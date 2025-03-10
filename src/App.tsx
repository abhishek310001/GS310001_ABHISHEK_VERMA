import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Layout from './components/Layout';
import { ChartPage, PlanningPage, SKUsPage, StoresPage } from './pages';

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/stores" element={<StoresPage />} />
              <Route path="/skus" element={<SKUsPage />} />
              <Route path="/planning" element={<PlanningPage />} />
              <Route path="/chart" element={<ChartPage />} />
              <Route path="/" element={<Navigate to="/stores" replace />} />
            </Routes>
          </Layout>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
