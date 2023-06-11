import React, { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ToastContainer, toast } from 'react-toastify';

import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBNavbar,
    MDBIcon,
} from 'mdb-react-ui-kit';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdFreeCancellation } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function NavBar() {
    const email = useRef('')
    const token = useRef('')
    const ID = useRef('')
    const emailF = useRef('')
    const [service,setService] = useState([])

    const [fullscreenXlModal, setFullscreenXlModal] = useState(false);
    // Modal Code Oublier UseState
    const [optSmModalA, setOptSmModalA] = useState(false);
    const [rdvSection, setRdvSection] = useState('d-flex ')
    const [data, setData] = useState([])
    const route = useNavigate()
    const [showNavColorThird, setShowNavColorThird] = useState(false);
    const [serviceSectionCancel, setServiceSectionCancel] = useState('');
    const [serviceSectionCancelForgot, setServiceSectionCancelForgot] = useState('');
    const [sectionCancel, setSectionCancel] = useState('d-none')

    const toggleShow = () => { setFullscreenXlModal(!fullscreenXlModal) };
    const toggleShowA = () => { setOptSmModalA(!optSmModalA) };

    useEffect(() => {
        if (fullscreenXlModal !== true) setServiceSectionCancel('')

        if (serviceSectionCancel != '') {
            setSectionCancel('d-block')

        } else {
            setSectionCancel('d-none')
        }
        axios.get(`http://127.0.0.1:8000/api/parametre `)
        .then((response) => {
            setService(response.data.Parametre)
        });
    })
    const handleChange_A = (event: SelectChangeEvent) => {
        setServiceSectionCancel(event.target.value);


    };
    const handleChange_B = (event: SelectChangeEvent) => {
        setServiceSectionCancelForgot(event.target.value);


    };

    //Display RDV For cancel
    const handlCancel = () => {
        if ( serviceSectionCancel === "" || email.current.value === "" || token.current.value ==="" ){
            toast.warn(' veuillez remplir tous les champs!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
        const RDV = {
            Service: serviceSectionCancel,
            Email: email.current.value,
            Token: token.current.value
        }
        console.log('Cancel ', JSON.stringify(RDV));
        //    fetch('http://127.0.0.1:8000/api/rdv/cancel", RDV')
        //    .then(respo => respo.json())
        //    .then(json => console.log('Data ', json))
        axios.post("http://127.0.0.1:8000/api/rdv/cancel", RDV)
            .then((response) => {
                setData(response.data.Data)
                console.log(response.data.Data);
            });
        setServiceSectionCancel('')
        email.current.value = ''
        token.current.value = ''

    }
    const RdvAnnuler = () => {
        const id = ID.current.value
        axios.delete(`http://127.0.0.1:8000/api/rdv/${id}`)
            .then((response) => {
                notify("Annuler avec success !")
                console.log(response.data.status);
                setData([])
            });
    }

    const Token = () => {
        const info = {
            Service: serviceSectionCancelForgot,
            Email: emailF.current.value
        }
        axios.post("http://127.0.0.1:8000/api/rdv/token", info)
            .then((response) => {
                // setData(response.data.Data)
                console.log("========> ", response.data.Data[0].Token);
                const data = {
                    Email: emailF.current.value,
                    Name: response.data.Data[0].NomComplet,
                    Token: response.data.Data[0].Token

                }
                notify(' le code envoyé Veuillez vérifier votre boîte de réception')
                emailF.current.value = ''
                setServiceSectionCancelForgot('')
                setOptSmModalA()

                axios.post("http://127.0.0.1:8000/api/email/reset", data)
                    .then((response) => {
                        console.log("ra da5l");
                    });
            }).catch((e)=>{ 
                toast.error("Email ou Service ne correspond pas ", { 
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
            });
    }

    const notify = (text) => {
        toast.success(text, { 
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      };
    return (
        <div>
            <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
            <MDBNavbar className='d-flex justify-content-between px-4' light style={{ backgroundColor: '#e3f2fd' }}>
                <div>Logo</div>
                <button className='btn btn-danger' color='danger' onClick={toggleShow}>
                    <MdFreeCancellation className='' />  <span>Annuler RDV</span>
                </button>
            </MDBNavbar>


            <MDBModal tabIndex='-1' show={fullscreenXlModal} setShow={setFullscreenXlModal} >
                <MDBModalDialog size='fullscreen' className=''>
                    <MDBModalContent className=' '>
                        <MDBModalHeader >
                            <MDBModalTitle className='text-center ' style={{ marginLeft: "10vh" }}>Annuler rendez-vous</MDBModalTitle>
                            <MDBBtn
                                type='button'
                                className='btn-close'
                                color='none'
                                onClick={toggleShow}
                            ></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody className='bg-inf bg-img-modal px-auto ' >
                            <div className=' border my-4 bg-white shadow-lg p-3 mb-5 bg-body rounded w-75   mx-auto p-4'>
                                <Box sx={{ minWidth: 120 }} className="mb-2">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Service <span className='text-danger text-bold '>*</span> </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={serviceSectionCancel}
                                            label="Service"
                                            onChange={handleChange_A}

                                        >
                                            {
                                                service.length > 0  ? service.map((e,i)=>{
                                                    return(
                                                        <MenuItem value={e.Service} >{e.Service}</MenuItem>
                                                    )
                                                }) : "no service found"
                                            }
                                         
                                        </Select>
                                    </FormControl>
                                </Box>
                                <div className={sectionCancel}>
                                    <Form.Floating className=' mx-auto text-center mb-3 '  >
                                        <Form.Control
                                            id="floatingInputCustom"
                                            type="email"
                                            placeholder="Email address"
                                            ref={email}
                                        />
                                        <label htmlFor="floatingInputCustom">Email address <span className='text-danger'>*</span></label>
                                    </Form.Floating>
                                    <Form.Floating className=' mx-auto text-center mb-3 '>
                                        <Form.Control
                                            id="floatingInputCustom"
                                            type="text"
                                            placeholder="Code"
                                            ref={token}
                                        />
                                        <label htmlFor="floatingInputCustom">Code </label>
                                    </Form.Floating>

                                    <span className=' text-primary code-forget' onClick={toggleShowA} > Vous avez oublié votre code de confirmation? </span>
                                    <div className='d-flex justify-content-center mt-4'>
                                        <MDBBtn onClick={handlCancel} > <MDBIcon far icon="calendar-alt" className='' size='1x' /> Mes rendez-vous</MDBBtn>
                                    </div>
                                </div>
                                <div className={rdvSection} style={{ justifyContent: 'center', marginTop: '3vh' }} >
                                    <ul>
                                        {data.length > 0 ? data.map((e, i) => {
                                            return (
                                                <div>
                                                    <input type="hidden" readOnly value={e.id} ref={ID} />

                                                    <table className="table table-bordered border-primary " style={{ width:'50vw' }}>
                                                        <thead>
                                                            <tr key={i}  className='text-center'>
                                                                <th>Nom Complet</th>
                                                                <th>Service </th>
                                                                <th>Date</th>
                                                                <th>Heure</th>
                                                                <th>action</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            <tr key={i + 1} className='text-center'>
                                                                <td>{e.NomComplet} </td>
                                                                <td>{e.Service}  </td>
                                                                <td>{e.Date} </td>
                                                                <td>{e.Heure} </td>
                                                                <td className='p-0 m-0 text-center py-1'> <button onClick={RdvAnnuler} className='btn btn-outline-danger m-0' > Annuler</button> </td>
                                                            </tr>
                                                        </tbody>

                                                    </table>
                                                </div>
                                            )

                                        }) : ""}
                                    </ul>
                                </div>
                            </div>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn type='button' color='secondary' onClick={toggleShow}>
                                Closee
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

            {/* Modal Code Oublier */}


            <MDBModal show={optSmModalA} tabIndex='-1' className='' setShow={setOptSmModalA}>
                <MDBModalDialog size='fullscreen-sm-down'>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Renvoyer code de confirmation</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShowA}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <Box sx={{ minWidth: 120 }} className="mb-2">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Service <span className='text-danger text-bold '>*</span> </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={serviceSectionCancelForgot}
                                        label="Service"
                                        onChange={handleChange_B}

                                    >
                                       {
                                                service.length > 0  ? service.map((e,i)=>{
                                                    return(
                                                        <MenuItem value={e.Service} >{e.Service}</MenuItem>
                                                    )
                                                }) : "no service found"
                                            }
                                    </Select>
                                </FormControl>
                            </Box>
                            <Form.Floating className=' mx-auto text-center mb-3 '>
                                <Form.Control
                                    id="floatingInputCustom"
                                    type="email"
                                    placeholder="name@example.com"
                                    ref={emailF}
                                />
                                <label htmlFor="floatingInputCustom">Email address</label>
                            </Form.Floating>
                            <div className='d-flex justify-content-center'>
                                <MDBBtn onClick={Token} > <MDBIcon fas icon="location-arrow" /> Renvoyer</MDBBtn>
                            </div>

                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>


        </div >
    )
}

export default NavBar