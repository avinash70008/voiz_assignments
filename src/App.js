import React from 'react';
import './App.css';
import CustomSelect from './CustomSelect';

const styles={
  app:{
    backgroundColor:'rgba(0,0,0,0.1)',
    justifyItems:'center',
    alignItems:'center',
    display:'grid',
    height:'100vh',
    fontFamily:'Arial',
    color:'rgba(0,0,100,1)',
    fontSize:25,
   
  },
  select:{
    width:'100%',
    maxWidth:600,
   
  }
}

const options=[
  {label:'Red',value:'red'},
  {label:'Blue',value:'blue'},
  {label:'Green',value:'green'},
  {label:'Yellow',value:'yellow'},
]

function onChangeInput(value){
  console.log(value);
}
function App() {
 
  return (
    <div style={styles.app}>
      <CustomSelect isMulti={true} style={styles.select} defaultValue={[options[3]]} onChange={onChangeInput} options={options} label="Choose your fav color" />
    </div>
  
  );

  
}

export default App;
