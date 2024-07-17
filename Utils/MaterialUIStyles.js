const filterStyle = {
         color: '#d0d616',
         fontSize: 20,
         borderWidth:2,
         borderColor: '#d0d616',
         borderStyle: 'solid',
         paddingLeft:3,
         paddingRight:3,
         paddingTop:1,
         paddingBottom:1,
         marginBottom:0.7,
        ":hover": {
            color: '#000',
            backgroundColor:'#d0d616',
        },
}

const menuItem = {
    color: '#d0d616',
    backgroundColor:'#000',
    borderBottom: '0.5px solid #d0d616',
    ":hover": {
        color: '#000',
        backgroundColor:'#d0d616',
    },
}

const selectedMenuItem = {
    color: '#000',
    backgroundColor:'#d0d616',
    borderBottom: '0.5px solid #000',
    ":hover": {
        color: '#000',
        backgroundColor:'#d0d616',
    },
}


  const textFieldStyle = {
    marginRight: '10px',
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused': {
        borderColor: '#d0d616', // Set border color when focused
      },
      border: '3px solid #202020',
      borderBottom: '3px solid #d0d616',
    },
    '& .MuiOutlinedInput-root:hover': {
      border: '3px solid #d0d616',
    },
    '& .MuiOutlinedInput-input': {
      color: '#d0d616',
      fontSize: '20px',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#202020', // Set border color of notched outline when focused
    },
  };




export{filterStyle,menuItem,textFieldStyle,selectedMenuItem}