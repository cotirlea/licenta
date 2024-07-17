import { container, body_container,button, text } from "../../Utils/GeneralStyles";

const plantScreenStyle = {
  container: {...container,flex:1},
  body_container:{...body_container,flex:1,width:'50%'},
  headline:{...text,fontSize:50},
  container_top : {...body_container,border: '5px solid #d0d616',width:'100%',flex:0.15},
  container_middle : {...body_container,width:'100%', border:'5px solid #d0d616',flex:0.7},
  container_bottom : {...body_container,width:'100%',border:'5px solid #d0d616',flex:0.15, justifyContent:'space-between',padding:20},    
  image: { width: '100%', height: '100%', resizeMode: 'contain' },
  collumn_line : {width:'100%',flexDirection:'row', justifyContent:'space-between', alignItems: 'center'},
  button: {...button,width:'60%',height:'50%'},
  button_touched: {...button,width:'60%', height:'50%', backgroundColor:'#d0d616'},
  text: {...text,fontSize:30},
  text_touched: {color:'#202020',fontSize:30,},
}

export{plantScreenStyle};