
import React, { useState, useEffect } from 'react'

import { MDBInput } from 'mdb-react-ui-kit';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';

function CalendarDashboard() {
  const [date, setDate] = useState([])
    const [mois, setMois] = React.useState('');
    const [auj, setAuj] = React.useState('');
    const [service, setService] = React.useState('');
    const Mois =  ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    const labels = ['Inscription',' Reinscription',' Certificat'] 
   const fetchVacance = () =>{
    axios.get(`http://localhost:8000/api/vacance `)
    .then((response) => {
        setDate(response.data.Vacances)
        console.log(" Vacance ", response.data.Vacances);
    });
   }
   fetchVacance()
    useEffect(() => {
      fetchVacance()
    }, []);
    const handlSubmit = () =>{
      const obj = {
        "Jour" :  auj.split('-')[2] ,
        "Mois" :  auj.split('-')[1] ,
        "Annee" :  auj.split('-')[0],
        "All_Mois" : mois ,
        "Service" : service   
     }
     console.log('123 ', obj);


     axios.post(`http://127.0.0.1:8000/api/vacance`,obj)
     .then((response) => {   fetchVacance()})
     
 
    }
    const handlSupprimer = (id)=>{
    
      axios.delete(`http://localhost:8000/api/vacance/${id}`)
      .then((response) => {   fetchVacance()})
    }

  return (
    <div>
    <div className='d-flex'>
      <MDBInput label='Date' id='typeNumber' type='date' className='' onChange={(e)=>{setAuj(e.target.value)}} />

      <FormControl className='ms-2'  fullWidth>
        <InputLabel id="demo-simple-select-label">Mois</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={mois}
          label="Mois"
          onChange={(event)=>{setMois(event.target.value)}}
        >
          {
           Mois.map((e,i)=>{
            return (<MenuItem value={i+1} key={i}> {e} </MenuItem> )
           })
          }
         
        </Select>
      </FormControl>

      <FormControl className='ms-2'  fullWidth>
        <InputLabel id="demo-simple-select-label">Service</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={service}
          label="Service"
          onChange={(event)=>{setService(event.target.value)}}
        >
          {
           labels.map((e,i)=>{
            return (<MenuItem value={e} key={i}> {e} </MenuItem> )
           })
          }
         
        </Select>
      </FormControl>

      </div>
      <div className='text-center mt-2'>
      <MDBBtn rounded onClick={handlSubmit}>Ajouter</MDBBtn>
      </div>
      <hr/>
      <div class="table-responsive">
                                <table class="table table-bordered border-primary text-center">
                                        <thead>
                                            <tr key="110">
                                                <th>Date</th>
                                                <th>Mois</th>
                                                <th>Service</th>
                                                <th>Opration</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                date.map((e,i)=>{
                                                    return(
                                                        <tr key={i}>
                                                            <td> {e.Jour}/{e.Mois}/{e.Annee} </td>
                                                            <td> {e.All_Mois} </td>
                                                            <td> {e.Service} </td>
                                                            <td className='p-0 m-0'> 
                                                              <MDBBtn outline className='m-0' color='danger' onClick={()=>{ handlSupprimer(e.id) }}>  Supprimer </MDBBtn> 
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                 </table>
                            </div>
      </div>

     
  )
}

export default CalendarDashboard