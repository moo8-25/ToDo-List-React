import './App.css';
import TaskList from './components/taskList';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  typography: {
    fontFamily: ["myFont"],
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <TaskList></TaskList>
      </div>
    </ThemeProvider>
  );
}

export default App;
