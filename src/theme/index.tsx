import { DefaultTheme } from 'react-native-paper'

const theme = {
    ...DefaultTheme,
    roundness: 50,
    colors: {
        ...DefaultTheme.colors,
        primary: '#F28322',
        accent: '#f1c40f',
        background: '#FFFFFF',
        surface: '#3D1459',
        // text: 'blue',
        disabled: "#707070",
        placeholder: '#707070',
        backdrop: "#F26A4B",
        onSurface: '#F28322',
        notification: '#F28322',        
    },
}
export default theme