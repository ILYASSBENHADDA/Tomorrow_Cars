import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Nav from './partials/Nav'
import { Link } from 'react-router-dom'

function Home() {
     const [carList, setCarList] = useState([])

     useEffect(()=> {
          axios.get('http://localhost:3030/api/read').then(response => {
               setCarList(response.data)
               // console.log(response)
          })
     }, [])


     return (
          <>
          <Nav />
          <section className="jumbotron text-center">
               <div className="container">
                    <h1 className="jumbotron-heading">Tomorrow Cars</h1>
               </div>
          </section>




          <div className="container">
          <div className="row">

               {carList.map((val, key) => (
                    
               <div className="col-md-4 mb-3" key={key}>
                    <div className="card">
                         {/* <img src="uploads/" className="card-img-top" /> */}
                         <div className="card-body">
                              <h5 className="float-right">{val.price} DHs</h5>
                              <span className="figure-caption">{val.mark}</span>
                              <h5 className="mb-4">{val.name}</h5>
                              <Link to={`item=${val._id}`} className="btn btn-secondary">Details</Link>
                         </div>
                    </div>
               </div>
               
               ))}

          </div>
          </div>
          </>
     )
}

export default Home