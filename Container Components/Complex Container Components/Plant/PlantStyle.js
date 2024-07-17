import {body_container, text, button} from '../../../Utils/GeneralStyles'

const plantStyles = {
    container: {...body_container,flex: 1,width:'50%',height:'100%', marginTop:10, marginBottom:10},
    headline:{...text,fontSize:50},
    container_top : {...body_container,border: '5px solid #d0d616',width:'100%',flex:0.15},
    container_middle : {...body_container,width:'100%', border:'5px solid #d0d616',flex:0.75},
    container_bottom : {...body_container,width:'100%',padding:10, border:'5px solid #d0d616',flex:0.1, justifyContent: 'space-between',flexDirection: 'row'},    
    image: { width: '100%', height: '100%', aspectRatio: 1, resizeMode: 'contain' },
    button: {...button,width:'40%'},
    button_touched: {...button,width:'40%', backgroundColor:'#d0d616'},
    text: {...text,fontSize:30},
    text_touched: {color:'#202020',fontSize:30,},
}

export {plantStyles}