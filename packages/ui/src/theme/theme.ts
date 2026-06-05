import { createTheme } from '@mantine/core'
import type { MantineColorsTuple } from '@mantine/core'

const imperialGold: MantineColorsTuple = [
  '#FFF9E6',
  '#FFF0BD',
  '#FFE494',
  '#FFD54F',
  '#FFC107',
  '#FFB300',
  '#FF8F00',
  '#FF6F00',
  '#E65100',
  '#BF360C',
]

const nebulaBlue: MantineColorsTuple = [
  '#E3F2FD',
  '#BBDEFB',
  '#90CAF9',
  '#64B5F6',
  '#42A5F5',
  '#2196F3',
  '#1E88E5',
  '#1976D2',
  '#1565C0',
  '#0D47A1',
]

export const starwarsTheme = createTheme({
  primaryColor: 'imperialGold',
  colors: {
    imperialGold,
    nebulaBlue,
  },
  fontFamily: 'Inter, sans-serif',
  defaultRadius: 'md',
  black: '#1A1B1E',
  other: {
    appBackground: '#000000',
  },
  components: {
    AppShell: {
      styles: {
        root: { backgroundColor: '#000000' },
        main: { backgroundColor: '#000000' },
        header: { backgroundColor: '#000000' },
      },
    },
    Card: {
      defaultProps: { shadow: 'sm', withBorder: true, radius: 'md' },
    },
    Badge: {
      defaultProps: { variant: 'light' },
    },
    Button: {
      defaultProps: { radius: 'md' },
    },
  },
})
