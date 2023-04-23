import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

 const[btn,Setbtn]=useState('')

  useEffect(() => {
    // fetch data from API
    fetch('https://sample-data.onrender.com/api/data')
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setFilteredData(json);
      });
  }, []);

  const handleButtonClick = (event) => {
   const buttonValue=event.target.value
   Setbtn(buttonValue)
    let newFilteredData = [];

    switch (buttonValue) {
      case 'q1':
        newFilteredData = data.filter(item => {
          const a = parseFloat(item.income.slice(1));
          const b = parseFloat('$5.00'.slice(1));
          const isBMV = item.car.includes('BMV')
         return (item.car === 'BMW' || item.car === 'Mercedes-Benz')&&(a<b)
        });
        break;
      case 'q2':
        newFilteredData = data.filter(item => item.gender==='Male'&& item.phone_price>10000);
        break;
      case 'q3':
        newFilteredData = data.filter(user=>{
    
            const lastNameStartsWithM = /^M/i.test(user.last_name); // regex implementation
            const emailIncludesLastName = new RegExp(user.last_name, 'i').test(user.email); // regex implementation
            return user.quote.length> 15 && lastNameStartsWithM && emailIncludesLastName;})
        break;
      case 'q4':
        newFilteredData = data.filter( user => (user.car === 'BMW' || user.car === 'Mercedes-Benz' || user.car === 'Audi') && !/\d/.test(user.email)
        );
        break;
      case 'q5':
        const cityStats = data.reduce((acc, user) => {
          const cityName = user.city;
          const userIncome = parseFloat(user.income.slice(1));
          if (!acc[cityName]) {
            acc[cityName] = { count: 0, totalIncome: 0 };
          }
          acc[cityName].count++;
          acc[cityName].totalIncome += userIncome;
          return acc;
        }, {});
        const cityStatsArray = Object.keys(cityStats).map(city => {
          return {
            city: city,
            count: cityStats[city].count,
            averageIncome: cityStats[city].totalIncome / cityStats[city].count
          }
        });
        cityStatsArray.sort((a, b) => b.count - a.count);
        newFilteredData = cityStatsArray.slice(0, 10);
        break;
      default:
        newFilteredData = data;
        break;
    }

    setFilteredData(newFilteredData);
  };

  return (
    <Container fluid>
      <Row>
        <Col md={1} className="bg-light">
          <Button variant="light" block value="q1" onClick={handleButtonClick}>
            Question 1
          </Button>
          <Button variant="light" block value="q2" onClick={handleButtonClick}>
            Question 2
          </Button>
          <Button variant="light" block value="q3" onClick={handleButtonClick}>
            Question 3
          </Button>
          <Button variant="light" block value="q4" onClick={handleButtonClick}>
            Question 4
          </Button>
          <Button variant="light" block value="q5" onClick={handleButtonClick}>
            Question 5
          </Button>
        </Col>
        <Col md={11}>
          <Table size="sm" striped bordered hover>
            <thead>
              <tr>
                {btn!=='q5'&&<th>Id</th>}
                {btn!=='q5'&&<th>First Name</th>}
                {btn!=='q5'&&<th>Last Name</th>}
                {btn!=='q5'&&<th>Email</th>}
                {btn!=='q5'&&<th>Gender</th>}
                {btn!=='q5'&&<th>Income</th>}
                <th>City</th>
                {btn!=='q5'&&<th>Car</th>}
                {btn!=='q5'&&<th>Quote</th>}
                {btn!=='q5'&&<th>Phone Price</th>}
                {btn === 'q5' && <th>Average Income</th>}
              </tr>
            </thead>
            <tbody>
              {filteredData.map(item => (
                <tr key={item.id}>
                  {btn!=='q5'&& <td>{item.id}</td>}
                  {btn!=='q5'&&<td>{item.first_name}</td>}
                  {btn!=='q5'&&<td>{item.last_name}</td>}
                  {btn!=='q5'&&<td>{item.email}</td>}
                  {btn!=='q5'&&<td>{item.gender}</td>}
                  {btn!=='q5'&&<td>{item.income}</td>}
                  <td>{item.city}</td>
                  {btn!=='q5'&&<td>{item.car}</td>}
                  {btn!=='q5'&&<td>{item.quote}</td>}
                 
                 

                  {btn!=='q5'&& <td>{item.phone_price}</td>}
            {btn === 'q5' && <td>{item.averageIncome}</td>}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
