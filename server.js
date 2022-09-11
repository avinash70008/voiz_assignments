const express = require('express');
const app = express()
const fs = require("fs")
const cors = require("cors");
const ObjectsToCsv = require('objects-to-csv')


app.use(cors({
    origin:"http://localhost:4000"
}));

var {parse} = require('csv-parse/sync');

function filterData(query,data){
    let res=[]
    const { category,country,isOrderByDate,supplier,product} = query;
    data.forEach((order)=>{
        if(category!="All" && country!="All" && supplier!="All" && product!="All" ){
            if(JSON.parse(order.category).includes(category) && JSON.parse(order.manufacturer).includes(supplier) && order['geoip.country_iso_code']==country){
                if(JSON.parse(order.products).some(e => e.product_name == product)){
                    res.push(order);
                }
            }
            
        }else if(category!="All" && country!="All" && supplier!="All" && product=="All" ){
            if(JSON.parse(order.category).includes(category) && JSON.parse(order.manufacturer).includes(supplier) && order['geoip.country_iso_code']==country){
                
                    res.push(order);
               
            }
        }else if(category!="All" && country!="All" && supplier=="All" && product!="All" ){
            if(JSON.parse(order.category).includes(category)  && order['geoip.country_iso_code']==country){
                if(JSON.parse(order.products).some(e => e.product_name == product)){
                    res.push(order);
                }
            }
        }else if(category!="All" && country!="All" && supplier=="All" && product=="All" ){
            if(JSON.parse(order.category).includes(category)  && order['geoip.country_iso_code']==country){
                
                    res.push(order);
                
            }
        }else if(category!="All" && country=="All" && supplier!="All" && product!="All" ){
            if(JSON.parse(order.category).includes(category) && JSON.parse(order.manufacturer).includes(supplier) ){
                if(JSON.parse(order.products).some(e => e.product_name == product)){
                    res.push(order);
                }
            }
        }else if(category!="All" && country=="All" && supplier!="All" && product=="All" ){
            if(JSON.parse(order.category).includes(category) && JSON.parse(order.manufacturer).includes(supplier) ){
               
                    res.push(order);
               
            }

        }else if(category!="All" && country=="All" && supplier=="All" && product!="All" ){
            if(JSON.parse(order.category).includes(category)){
                if(JSON.parse(order.products).some(e => e.product_name == product)){
                    res.push(order);
                }
            }
        }else if(category!="All" && country=="All" && supplier=="All" && product=="All" ){
            if(JSON.parse(order.category).includes(category) ){
               
                    res.push(order);
               
            }
        }else if(category=="All" && country!="All" && supplier!="All" && product!="All" ){
            if( JSON.parse(order.manufacturer).includes(supplier) && order['geoip.country_iso_code']==country){
                if(JSON.parse(order.products).some(e => e.product_name == product)){
                    res.push(order);
                }
            }
        }else if(category=="All" && country!="All" && supplier!="All" && product=="All" ){
            if( JSON.parse(order.manufacturer).includes(supplier) && order['geoip.country_iso_code']==country){
               
                    res.push(order);
              
            }
        }else if(category=="All" && country!="All" && supplier=="All" && product!="All" ){
            if(  order['geoip.country_iso_code']==country){
                if(JSON.parse(order.products).some(e => e.product_name == product)){
                    res.push(order);
                }
            }
        }else if(category=="All" && country!="All" && supplier=="All" && product=="All" ){
            if(  order['geoip.country_iso_code']==country){
               
                    res.push(order);
               
            }
        }else if(category=="All" && country=="All" && supplier!="All" && product!="All" ){
            if( JSON.parse(order.manufacturer).includes(supplier) ){
                if(JSON.parse(order.products).some(e => e.product_name == product)){
                    res.push(order);
                }
            }

        }else if(category=="All" && country=="All" && supplier!="All" && product=="All" ){
            if( JSON.parse(order.manufacturer).includes(supplier) ){
               
                    res.push(order);
               
            }

        }else if(category=="All" && country=="All" && supplier=="All" && product!="All" ){
           
                if(JSON.parse(order.products).some(e => e.product_name == product)){
                    res.push(order);
                }
            
        }else if(category=="All" && country=="All" && supplier=="All" && product=="All" ){
            
                    res.push(order);
             
        }
           
            

    })
    if(isOrderByDate){
        console.log("isOrderByDate",isOrderByDate)
        const sortedArray = res.sort(function(a,b){
                return   new Date(a.order_date.replace("th","")) -new Date(b.order_date.replace("th","")) ;
               });

        return sortedArray;
     }
     return res;

}

function isEmpty(object) {  
    return Object.keys(object).length === 0
  }
  

 



app.get("/",(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin",'*')
    
    
    fs.readFile('data.csv', 'utf8', function (err, data) {
        if(isEmpty(req.query)){
            const records = parse(data,{columns:true});
            res.send(records)
        }else{
            const records = parse(data,{columns:true});
            const resData= filterData(req.query,records)
            res.send(resData);
        }
    });  

})

app.delete('/del', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", 'Content-Type');
    res.setHeader('Content-Type', 'application/json');
    fs.readFile('data.csv', 'utf8', function (err, data) {
        if(!isEmpty(req.query)){
            const records = parse(data,{columns:true});
            const newRecords = records.filter(function( obj ) {
                return obj.order_id !== req.query.orderId;
            });
            
            const csv = new ObjectsToCsv(newRecords)
            csv.toDisk('./data.csv').then(()=>{
                res.send(newRecords)
            })
            

            
        }
    });  


    
  })


app.listen(8000);