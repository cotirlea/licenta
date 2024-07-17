import {container, text} from '../../Utils/GeneralStyles'

const mainStyles = {
    container: {...container,flex: 1, overflow: 'auto'},
    scrollView: {flex: 1,backgroundColor:'#202020',width:'60%',scrollbarWidth: 0 },
    scrollView_helper: {alignItems: 'center',justifyContent: 'center'},
    empty_main: {...text, fontSize: 80},
}

export{mainStyles}