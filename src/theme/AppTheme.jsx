import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import { purpleTheme } from './';

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={ purpleTheme }>

    {/* El css baseline es como si aplicaramos un css reset o un normalize a nuestra app */}
      <CssBaseline/>

      { children }
    </ThemeProvider>
  )
}
