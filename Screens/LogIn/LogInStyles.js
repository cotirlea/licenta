import { container,body_container,text,button } from "../../Utils/GeneralStyles";

const logInStyles = {
    container_log : {...container,height: '100%',width: '100%'},
    body_container_log : {...body_container,height: '100%'},
    title_container_log : {...body_container,height: '30%'},
    title_text_log : {...text,fontSize: 100},
    text_log: {...text,fontSize:50},
    text_log_touched: {...text,fontSize:50,color:'#202020'},
    button_log : {...button,height: 100,borderWidth: 7},
    button_log_touched : {...button,height: 100,borderWidth: 7,color:'#202020',backgroundColor: '#d0d616'},
    switch_container_log : {...body_container,height:'10%', flexDirection: 'row'},
    input_container_log : {...body_container,height: '40%'}
}

export{logInStyles}