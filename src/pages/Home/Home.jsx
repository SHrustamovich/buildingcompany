import './Home.css'
import {useState,useEffect} from 'react'
const Home = () => {

  const [companyID,setCompanyID] = useState('')
  const [complexID,setComplexID] = useState('')
  const [roomID,setRoomID] = useState('')
  // ------
  const [company,setCompany] = useState([])
  const [complex,setComplex] = useState([])
  const [rooms,setRooms] = useState([])
  const [price,setPrice] = useState([])
  const [bank,setBank] = useState([])
  useEffect(() => {
    fetch('http://localhost:9000/company')
    .then(res => res.json())
    .then(data => setCompany(data))
  },[])
  const handlyCompany =e => {
    e.preventDefault()
    if(e.target.value === 'choose') return setRoomID([])
    setCompanyID(e.target.value)
    setPrice([])
    setBank([])
    setComplex([])
    fetch('http://localhost:9000/complex',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({

        value:e.target.value
      })
  })
  .then(res => res.json())
  .then(data => setComplex(data))
  .catch(err => console.log(err))
}

const handlyComplex =e => {
  e.preventDefault()
  if(e.target.value === 'choose') return setRoomID([])
  setComplexID(e.target.value)
  
  fetch('http://localhost:9000/rooms',{
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      value:e.target.value
    })
})
.then(res => res.json())
.then(data => setRooms(data))
.catch(err => console.log(err))
}

const handlyPrice =e => {
  e.preventDefault()
  if(e.target.value === 'choose') return setRoomID([])
  setRoomID(e.target.value)

  fetch('http://localhost:9000/cal',{
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      value:e.target.value
    })
})
.then(res => res.json())
.then(data => setPrice(data))
.catch(err => console.log(err))
}


const handlyDuration =e => {
  e.preventDefault()
  fetch('http://localhost:9000/bank',{
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      value:e.target.value
    })
})
.then(res => res.json())
.then(data => setBank(data))
.catch(err => console.log(err))
}

    return(
        <div>

          <div className="box">
             <div className="select">
             <h3 className="box_title">Building company</h3>
             <select name="building_company" id="choose" onChange={handlyCompany}>
               <option value="choose">Choose</option>
              {
                company && company.map((e,i) => (
                  <option key={i} value={e.company_id}>{e.company_name}</option>
                ))
              }
               </select>
               </div>

               <div className="select">
             <h3 className="box_title">Complex</h3>
             <select name="complex" id="choose" onChange={handlyComplex}>
             <option value="choose">Choose</option>
             {
               complex && complex.map((e,i) => (
                 <option key={i} value={e.complex_id}>{e.complex_name}</option>
               ))
             }
               </select>
               </div>

               <div className="select">
             <h3 className="box_title">Number of rooms</h3>
             <select name="rooms" id="choose" onChange={handlyPrice}>
               <option value="choose">Choose</option>
                {
                  rooms && rooms.map((e,i) => (
                    <option key={i} value={e.room_id}>{e.room_number}</option>
                  ))
                }
               </select>
               </div>

               <div className="select">
             <h3 className="box_title">Select duration</h3>
             <select name="duration" id="choose" onChange={handlyDuration}>
               <option value="1">Choose</option>
               <option value="10">10 yil</option>
               <option value="20">20 yil</option>
               <option value="30">30 yil</option>
               </select>
               </div>
            </div>
            <div className="result">
                 <div className="data">
                    {
                     company && company.filter(e => e.company_id === Number(companyID)).map((e,i) => (
                       <h1 key={i}>{e.company_name}</h1>
                     ))
                    }
                    <div className="complex">
                      {
                        complex && complex.filter(e => e.complex_id === Number(complexID)).map((e,i) =>(
                          <h4 key={i}>Complex: {e.complex_name}</h4>
                          ))
                        }
                      </div>
                      <div className="room">
                        {
                          price && price.filter(e =>e.id === Number(roomID)).map((e,i) =>(
                            <ul key={i} className="roomInfo">
                              <li><strong>maydoni: </strong>{e.metrkv} m<sup>2</sup></li>
                              <li><strong>1 m<sup>2</sup> narxi: </strong>{e.kvprice}</li>
                              <li><strong>Manzil: </strong>{e.addres}</li>
                            </ul>
                          ))
                        }
                        </div>
                   </div>
                   <div className="info">
                     {
                       price && price.map((e,i) => (
                           <h3 key={i}>Price:{e.price} sum</h3>
                       ))
                     }
                     </div>
                     <div className="bank">
                       {
                         bank && bank.map((e,i) => (
                          <ul key={i} className='ul'>
                            <li><strong>Bank nomi: </strong>{e.bank_name}</li>
                            <li><strong>Kridit muddati: </strong>{e.muddat} yil</li>
                            <li><strong>Foiz: </strong>{e.servis}%</li>
                            <li><strong>Puli: </strong>{e.kridit}</li>
                          </ul>
                         ))

                       }
                       </div>
              </div>
        </div>
    )
}
export default Home;