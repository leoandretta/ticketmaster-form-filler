import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { FormFiller } from './components/form-filler';


function App() {
  
  const theme = createTheme({
    fontFamily: "monospace",
  })

  return (
    <MantineProvider theme={theme}>
        <FormFiller />
    </MantineProvider>
  )
}

export default App
