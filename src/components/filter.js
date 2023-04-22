import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

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
    const buttonValue = event.target.value;
    let newFilteredData = [];

    switch (buttonValue) {
      case 'id':
        newFilteredData = data.filter(item => {
          const a = parseFloat(item.income.slice(1));
          const b = parseFloat('$5.00'.slice(1));
          const isBMV = item.car.includes('BMV')
         return (item.car === 'BMW' || item.car === 'Mercedes-Benz')&&(a<b)
        });
        break;
      case 'userId':
        newFilteredData = data.filter(item => item.gender==='Male'&& item.phone_price>10000);
        break;
      case 'title':
        newFilteredData = data.filter(user=>{
    
            const lastNameStartsWithM = /^M/i.test(user.last_name); // regex implementation
            const emailIncludesLastName = new RegExp(user.last_name, 'i').test(user.email); // regex implementation
            return user.quote.length> 15 && lastNameStartsWithM && emailIncludesLastName;})
        break;
      case 'completed':
        newFilteredData = data.filter( user => (user.car === 'BMW' || user.car === 'Mercedes-Benz' || user.car === 'Audi') && !/\d/.test(user.email)
        );
        break;
      case 'not completed':
        newFilteredData = data.filter(item => !item.completed);
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
          <Button variant="light" block value="id" onClick={handleButtonClick}>
            Question 1
          </Button>
          <Button variant="light" block value="userId" onClick={handleButtonClick}>
            Question 2
          </Button>
          <Button variant="light" block value="title" onClick={handleButtonClick}>
            Question 3
          </Button>
          <Button variant="light" block value="completed" onClick={handleButtonClick}>
            Question 4
          </Button>
          <Button variant="light" block value="not completed" onClick={handleButtonClick}>
            Question 5
          </Button>
        </Col>
        <Col md={11}>
          <Table size="sm" striped bordered hover>
            <thead>
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
            </thead>
            <tbody>
              {filteredData.map(item => (
                <tr key={item.id}>
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
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
