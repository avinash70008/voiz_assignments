import React,{useState,useEffect} from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Typography from '@mui/material/Typography';

const InputFilter = ({data,anchor,setAnchor,buttonName,open,setItem,label}) => {
    //const [anchor, setAnchor] = useState(null);

    function handleItemClick(cat){
        setAnchor(null)
        setItem(cat)
    }
    
    return (
        <div style={{display:'flex',flexDirection:'column'}}>
            <Typography variant="h7" style={{color:"black",fontSize:15,fontWeight:'700',marginTop:'10px'}}>{label}</Typography>

                <Button
                
                style={{border:'1px solid gray',height:30,margin:"10px 0px 10px 0px",textOverflow:"ellipsis",overflow:"hidden",display:"inline-block"}}
                onClick={(e)=>{setAnchor(e.currentTarget)}}
                >{buttonName}</Button>
            <Menu
                anchorEl={anchor}
                open={open}
                onClose={()=>{setAnchor(null)}}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
            {data!=null?
            data.map((cat,index)=>{
                return <MenuItem onClick={()=>{handleItemClick(cat)}}>{cat}</MenuItem>
            }):null
        }

            </Menu>
        </div>
    )
}

export default InputFilter
