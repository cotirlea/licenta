import { container,text,button } from "../../Utils/GeneralStyles"

const headerStyle = {
  container : {...container, height: 100,width: '100%', flexDirection: 'row', justifyContent:'space-between',borderBottom : '4px solid #d0d616', boxSizing:'border-box', zIndex: 1},
  title: {...text, fontSize:40},
  segment_container:{...container, flexDirection: 'row', justifyContent: 'space-around',width:'40%',},
  bttn : {...button, height: 50,paddingBottom:5},
  bttn_touched: {...button, height:50, paddingBottom:5, backgroundColor:'#d0d616'},
  text: {...text, fontSize:30},
  text_touched: {color:'#202020', fontSize:30},
}

export {headerStyle}