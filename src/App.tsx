import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';


function App() {
  
  const theme = createTheme({
  })

  return (
    <MantineProvider theme={theme}>
        Hello World
    </MantineProvider>
  )
}

export default App
