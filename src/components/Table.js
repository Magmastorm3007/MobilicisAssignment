import React,{useState,useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import BounceLoader from 'react-spinners/BounceLoader'

export default function Tablefunction() {


  const [loading,setLoading]=useState(true)
  const [data, setData] = useState(null);
  const [data1, setData1] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://sample-data.onrender.com/api/data');
      const data = await response.json();
      setLoading(false)
      setData(data);
      setData1(data); // Set the filtered data initially to the fetched data
    };

    fetchData();
  }, []);
  const q1 = (event) => {

    const filtered = data.filter((item) =>
     item.id>30
    );
    setData1(filtered);
  };





  return (
    <div>
        <div>
      {
        loading?<div class="text-center"  >
        <div className="spinner-border "   role="status">
      
        </div>
      </div>:
      
      data && (

    <>
        <Table striped bordered hover variant="light">
        <tr>
          
          <th>Id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Income</th>
          <th>City</th>
          <th>Car</th>
          <th>Quote</th>
          <th>Phone Price</th>
        </tr>
          {
          data.map(item => (
            
           <tr>
            <td>{item.id}</td>
            <td>{item.first_name}</td>
            <td>{item.last_name}</td>
            <td>{item.email}</td>
            <td>{item.gender}</td>
            <td>{item.income}</td>
            <td>{item.city}</td>
            <td>{item.car}</td>
            <td>{item.quote}</td>
            <td>{item.phone_price}</td>


           </tr>
          ))}
          </Table>
          
         </> 
      )}
    </div>
        
  </div>
  )
}

