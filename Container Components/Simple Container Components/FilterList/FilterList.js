import React,{useState} from 'react'
import { View } from 'react-native'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {filterStyle,menuItem,selectedMenuItem} from '../../../Utils/MaterialUIStyles';
import { IconButton, Popover, MenuItem } from '@mui/material';



function FilterList({typeList,filterFunction}) {
    const [selectedIndex, setSelectedIndex] = useState('')
    const [anchorEl, setAnchorEl] = useState(null);
    const handleIconClick = (event) => {setAnchorEl(event.currentTarget);};
    const handleMenuItemClick = (value,index) => {filterFunction(value);setSelectedIndex(index);setAnchorEl(null)};
    const handleClose = () => {setAnchorEl(null);};

  return (
    <View>
      <IconButton onClick={handleIconClick}>
        <FilterAltIcon sx={filterStyle} />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{vertical: 'bottom',horizontal: 'right',}}
        transformOrigin={{vertical: 'top',horizontal: 'right',}}
      >
        {typeList.map((item,index) => (
            <MenuItem sx={index === selectedIndex ? selectedMenuItem : menuItem} key={index} onClick={() => handleMenuItemClick(item,index)}>{item}</MenuItem>
        ))}
      </Popover>
    </View>
  )
}

export default FilterList