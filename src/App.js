
import React,{useEffect,useState} from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputFilter from './components/InputFilter'
import Order from './components/Order';



function App() {
  const [isOrderByDate,setIsOrderByDate]=useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [anchorEl3, setAnchorEl3] = React.useState(null);
  const [anchorEl4, setAnchorEl4] = React.useState(null);
  const [categories,setCategories] = useState(null);
  const [category,setCategory] = useState("All");
  const open = Boolean(anchorEl);
  const open2=Boolean(anchorEl2)
  const open3=Boolean(anchorEl3)
  const open4=Boolean(anchorEl4)
  const [suppliers,setSuppliers] = useState(null);
  const [supplier,setSupplier] = useState("All");
  const [countries,setCountries] = useState(null);
  const [country,setCountry] = useState("All")
  const [products,setProducts] = useState(null);
  const [product,setProduct] = useState("All");
  const [data,setData] = useState(null)


  useEffect(()=>{
    
    //fetch for extarcting categorical data
    fetch("http://localhost:8000/").then( (res)=>{
      res.json().then((data)=>{
        extractCategories(data)
        extractSuppliers(data)
        extractCountries(data)
        extractProducts(data)
        setData(data)
      })
    }).catch((error)=>{
      console.log(error)
    })
  },[])

  useEffect(()=>{
    const q=new URLSearchParams({
        category:category,
        country:country,
        isOrderByDate:isOrderByDate,
        supplier:supplier,
        product:product

    }).toString()
    fetch("http://localhost:8000?"+q).then((res)=>{
      res.json().then((filteredData)=>{
        console.log("filtered Date",filteredData)
        setData(filteredData)
      })

    })
  },[category,supplier,product,isOrderByDate,country])

  

  function handleDateCheckBox(event){
    setIsOrderByDate(event.target.checked)

  }

  function extractCategories(data){
    console.log("Categories",data)
    let res=[]
    data.forEach((order)=>{
     
      JSON.parse(order.category).forEach((cat)=>{
        if(!res.includes(cat)){
          res.push(cat);
        }
      })
    })
    res.push("All")
    console.log(res)
    setCategories(res)
  }

  function extractSuppliers(data){
    let res=[]
    data.forEach((order)=>{
     
      JSON.parse(order.manufacturer).forEach((obj)=>{
        if(!res.includes(obj)){
          res.push(obj);
        }
      })
    })
    res.push("All")
    console.log("suppliers",res)
    setSuppliers(res)
  }

  function extractCountries(data){
    let res=[]
    data.forEach((order)=>{
      res.push(order["geoip.country_iso_code"]) 
    })
    res.push("All")
    console.log("Countries",res)
    setCountries(res)
  }

  function extractProducts(data){
    let res=[]
    data.forEach((order)=>{
     
      JSON.parse(order.products).forEach((pd)=>{
        if(!res.includes(pd.product_name)){
          res.push(pd.product_name);
        }
      })
    })
    res.push("All")
    console.log("products",res)
    setProducts(res)
  }


  

  







  return (
    <div  style={{display:'flex',flexDirection:'row'}}>
     
      {/*Filter box */}
      <div style={{height:'90vh',width:'15vw',boxShadow: "3px 3px 3px 1px #9E9E9E",display:'flex',flexDirection:'column',paddingInline:"10px"}}>
        <FormGroup>
          <FormControlLabel checked={isOrderByDate} onChange={handleDateCheckBox} control={<Checkbox  />} label="Order by date" />
        </FormGroup>

       <InputFilter 
        data={categories} 
        anchor={anchorEl}
        setAnchor={setAnchorEl}
        buttonName={category}
        open={open}
        setItem={setCategory}
        label={"Categories"}
       
         />

      <InputFilter 
        data={suppliers} 
        anchor={anchorEl2}
        setAnchor={setAnchorEl2}
        buttonName={supplier}
        open={open2}
        setItem={setSupplier}
        label={"Suppliers"}
         />


      <InputFilter 
        data={countries} 
        anchor={anchorEl3}
        setAnchor={setAnchorEl3}
        buttonName={country}
        open={open3}
        setItem={setCountry}
        label={"Country of order"}
         />

      <InputFilter 
        data={products} 
        anchor={anchorEl4}
        setAnchor={setAnchorEl4}
        buttonName={product}
        open={open4}
        setItem={setProduct}
        label={"Product Name"}
         />

      </div>

      {/*Orders */}
      <div style={{overflowY: "scroll",height:'90vh',width:'80vw',display:'flex',flexDirection:'column',paddingInline:"10px",alignItems:'center'}}>
      {data!=null?
        data.map((obj)=>{

            return <Order
                    setData={setData}
                    date={obj.order_date}
                    email={obj.email}
                    price={obj.taxful_total_price}
                    orderId={obj.order_id}
                  />
        }):null
      }
      
      

      </div>
      

    </div>
  );
}

export default App;
