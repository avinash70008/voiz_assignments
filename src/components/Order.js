import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Order = ({orderId,date,email,price,setData}) => {

    function handleDelete(){
        const q=new URLSearchParams({
            orderId:orderId
    
        }).toString();
        fetch("http://localhost:8000/del?"+q,{method:"delete"}).then((response)=>{
            response.json().then((newData)=>{
                setData(newData)
            })
        });
    }
    return (
        <div style={{margin:'5px 0px 5px'}}>        
            <Card sx={{ width:"60vw",height:160 }}>
                <CardContent >
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {date}
                    </Typography>
                    <Typography variant="h5" component="div">
                    {email}
                    </Typography>
                    <Typography  color="text.secondary" style={{margin:"2px"}}>
                    {price}
                    </Typography>
                </CardContent>
                <CardActions >
                    <Button onClick={handleDelete} size="small">DELETE</Button>
                </CardActions>
            </Card>
      </div>

    )
}

export default Order
