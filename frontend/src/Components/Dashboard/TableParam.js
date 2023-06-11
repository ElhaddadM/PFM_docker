import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import {ImLock , ImUnlocked} from 'react-icons/im';
import { TimePicker } from 'react-ios-time-picker';
import CalendarDashboard from '../CalendarDashboard';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
import { tr } from 'date-fns/locale';


function TableParam() {
    const [data, setData] = useState([])
  
    const [show, setShow] = useState(true)
    const [field, setField] = useState()
    const [staticModal, setStaticModal] = useState(false);
    const toggleShow = () => setStaticModal(!staticModal);


    const fetch = () => {
        axios.get(`http://127.0.0.1:8000/api/parametre `)
            .then((response) => {
                setData(response.data.Parametre)
                console.log(response.data.Parametre);
                console.log("Data Pa => ", data.length);
                // setField(response.data.Parametre)
            });
           
    }

    useEffect(() => {
        fetch()

    }, []);



    const onChange = (id, timeValue, a, e) => {
        // setValue(timeValue);

        const obj = []
        switch (timeValue) {
            case 'WorkStart':
                const aa = { WorkStart: a, WorkEnd: e.WorkEnd, Interval: e.Interval, WorkPause: e.WorkPause, WorkPauseEnd: e.WorkPauseEnd }
                obj.push(aa)
                break;
            case 'WorkEnd':
                const b = { WorkStart: e.WorkStart, WorkEnd: a, Interval: e.Interval, WorkPause: e.WorkPause, WorkPauseEnd: e.WorkPauseEnd }
                obj.push(b)
                break;
            case 'Interval':
                const c = { WorkStart: e.WorkStart, WorkEnd: e.WorkEnd, Interval: a.target.value, WorkPause: e.WorkPause, WorkPauseEnd: e.WorkPauseEnd }
                obj.push(c)
                break;
            case 'WorkPause':
                const d = { WorkStart: e.WorkStart, WorkEnd: e.WorkEnd, Interval: e.Interval, WorkPause: a, WorkPauseEnd: e.WorkPauseEnd }
                obj.push(d)
                break;
            case 'WorkPauseEnd':
                const ee = { WorkStart: e.WorkStart, WorkEnd: e.WorkEnd, Interval: e.Interval, WorkPause: e.WorkPause, WorkPauseEnd: a }
                obj.push(ee)
                break;

            default:
                fetch()
                console.log('Switch Default');
                break;
        }
        console.log('test ==>', id, '==>', timeValue, "=> ", a, ' =>1 ', obj[0]);
        axios.put(` http://127.0.0.1:8000/api/parametre/${id} `, obj[0])
            .then((response) => {
                fetch()
                // setData(response.data.data)
                console.log('Success');
            });

    }

    return (
        <table class="table table-bordered  border-primary" style={{ width: "90vw" }}>
            <thead>
                <caption className='w-100 d-flex'> Emploie du Temps . 
                <div className=' position-absolute top-5 end-0  pe-5 mt-4'>
                    <button className='btn btn-outline-info'  onClick={toggleShow} >Vacance</button>
                </div> </caption>
                <Button variant="contained" endIcon={  show ? <ImLock /> : <ImUnlocked/> }  size="small" className='mb-2'  onClick={() => { setShow(!show) }}>
                    Modifier  ?
                </Button>
                <tr key="z">
                    <th key="1"> Service  </th>
                    <th key="2"> Debut Travail </th>
                    <td key="3"> Fin Travail </td>
                    <dh key="4"> Iterval (entre RDV) </dh>
                    <th key="5"> Debut Pause </th>
                    <th key="6"> Fin Pause  </th>

                </tr>

            </thead>
            <tbody>
                {
                    data.length > 0 ? data.map((e, i) => {
                        return (
                            <tr key={i} >
                                <td className='text-bold '> {e.Service  ? e.Service: " Service Introuvable "}  </td>
                                <td key={i} >

                                    <TimePicker disabled={show} onChange={(a) => { onChange(e.id, 'WorkStart', a, e) }} value={e.WorkStart} />


                                </td>
                                <td key={i + 1}>
                                    <TimePicker disabled={show} onChange={(a) => { onChange(e.id, 'WorkEnd', a, e) }} value={e.WorkEnd} />

                                </td>
                                <td key={i + 2}>
                                    {/* <TimePicker onChange={onChange} value={e.Interval} /> */}

                                    <input type="number" disabled={show} defaultValue={e.Interval} onChange={(a) => { onChange(e.id, 'Interval', a, e) }} className='input-interval' />

                                </td>
                                <td key={i + 3}>
                                    <TimePicker disabled={show} onChange={(a) => { onChange(e.id, 'WorkPause', a, e) }} value={e.WorkPause} />

                                </td>
                                <td key={i + 4}>
                                    <TimePicker disabled={show} onChange={(a) => { onChange(e.id, 'WorkPauseEnd', a, e) }} value={e.WorkPauseEnd} />
                                </td>

                            </tr>
                        )
                    })
                        :
                        <h2> Service Introuvable </h2>
                }
            </tbody>

                <div>
                <MDBModal staticBackdrop tabIndex='-1' className='mt-5' show={staticModal} setShow={setStaticModal}>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle> Ajoute Jour Firier </MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <CalendarDashboard />
                           
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleShow}>
                                Close
                            </MDBBtn>
                           
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>


                </div>
        </table>

    )
}

export default TableParam