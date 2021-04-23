import React, {useState, useEffect} from "react"
import Axios from 'axios'

function Dashboard() {
  const [car, setCar] = useState('')
  const [price, setPrice] = useState(0)
  const [carList, setCarList] = useState([])
  const [newCar, setNewCar] = useState('')


  useEffect(()=> {
    Axios.get('http://localhost:3030/read').then((response) => {
      setCarList(response.data)
    })
  }, [])


  const addTo = () => {
    Axios.post('http://localhost:3030/addcar', {
      name: car,
      price: price,
    })
    // console.log(car, price)
  }

  const updateCar = (id) => {
    Axios.put('http://localhost:3030/update', {
      id: id,
      newCar: newCar
    })
  }

  const deleteCar = (id) => {
    Axios.delete(`http://localhost:3030/delete/${id}`)
  }

  ///////////::::::::::::
  ///////////::::::::::::

  return (
    <div className="App">
     <h1>Dashbord</h1>
      
        <input type="text" placeholder="Name" onChange={(e) => { setCar(e.target.value) }} /><br/>
        <input type="number" placeholder="Price" onChange={(e) => { setPrice(e.target.value) }}/><br/>
        <button onClick={addTo}>Add to list</button>


        {carList.map((val, key) => {
          return (
            <div key={key}>
              <hr/>
              <h2>{val.name}</h2> <p>{val.price}</p>
                <input type="text" placeholder="New Car" value={val.name} onChange={(e) => { setNewCar(e.target.value) }}/>
                  <button onClick={()=> { updateCar(val._id) }}>Update</button>
                  <button onClick={()=> { deleteCar(val._id) }}>Delete</button>
                  <hr/>
            </div>
          )
        })}
        
      
    </div>
  );
}

export default Dashboard
