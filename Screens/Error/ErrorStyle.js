import { container,body_container,text,button } from "../../Utils/GeneralStyles";

const errorStyle = {
    container_err : {...container,height:'60%',width:'50%'},
    title_container_err : { ...body_container,height:'20%',width:'80%',padding:30},
    title_err : {...text,fontSize:50},
    text_err: {...text,fontSize:30},
    text_err_touched: {...text,fontSize:30,color:'#202020'},
    list_container_err: {...body_container,height:'auto',overflow:'auto',width:'80%'},
    button_err : {...button,height: 60,borderWidth: 4, marginBottom:20},
    button_err_touched : {...button,height: 60,borderWidth: 4,color:'#202020',backgroundColor: '#d0d616'},
    elem_err: {marginBottom:20}
}

export {errorStyle}