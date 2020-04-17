import createMuiTheme from 'material-ui/styles/createMuiTheme'
import {indigo, pink} from 'material-ui/colors'

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757de8',
            main: '#3f51b5',
            dark: '#002984',
            constrastText: '#fff'
        },
        secondary: {
            light: '#ff79b0',
            main: '#ff4081',
            dark: '#c60055',
            constrastText: '#000'
        },
        openTitle: indigo['400'],
        protectedTitle: pink['400'],
        type: 'light'
    }
})

export default theme