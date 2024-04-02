import React, { useEffect, useState } from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand
} from 'mdb-react-ui-kit';
import axios from 'axios'
import { Link } from 'react-router-dom';

function Body() {
    const [search, setSearch] = useState("")
    const [state, setState] = useState([])

    // api fetching
    const base_url = "http://localhost:8000"

    const fetchData = async () => {
        const result = await axios.get(`${base_url}/get-all-data`)
        console.log(result.data.datafrmdb);
        setState(result.data.datafrmdb)
    }

    const deleteData = async (id) => {
        const result = await axios.delete(`${base_url}/delete-an-item/${id}`)
        alert(result.data.message);
        fetchData()
    }


    console.log(state);

    useEffect(() => {
        fetchData()
        console.log(search);
    }, [search])


    return (
        <div>
            <div>
                <MDBNavbar light bgColor='light'>
                    <MDBContainer fluid>
                        <MDBNavbarBrand href='/'>
                            <img
                                src='https://i.pinimg.com/736x/aa/f7/05/aaf705e06726ce3881288ae4be3ac5fe.jpg'
                                height='40'
                                alt=''
                                loading='lazy'
                            />
                            Movie
                        </MDBNavbarBrand>
                        <div >
                            <Link to={'/add'}><MDBBtn className='mx-2'>Add Movie</MDBBtn></Link>
                            <input style={{ borderRadius: '10px', width: '250px' }} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='  Search By Name....' />
                        </div>
                    </MDBContainer>
                </MDBNavbar>
            </div>
            <div className='d-flex'>
                <MDBRow>
                    {
                        state.filter((item => item.title.toLowerCase().includes(search.toLowerCase()))).map((item) => (

                            <MDBCol>
                                <MDBCard style={{ width: '300px', margin: '20px' }}>
                                    <MDBCardBody>
                                        <MDBCardTitle  >{item.title}</MDBCardTitle>
                                        <MDBCardText>
                                            {item.director}
                                        </MDBCardText>
                                        <MDBCardText>
                                            {item.release_date}
                                        </MDBCardText>
                                        <MDBCardText>
                                            {item.rating}
                                        </MDBCardText>
                                        <div className='d-flex justify-content-between'>
                                            <Link to={`/view/${item.id}`}>
                                                <MDBBtn className='btn btn-success' href='#'>View</MDBBtn>
                                            </Link>
                                            <Link to={`/edit/${item.id}`}>
                                                <MDBBtn className='btn btn-primary' href='#'>Edit</MDBBtn>
                                            </Link>
                                            <MDBBtn className='btn btn-danger' onClick={() => deleteData(item.id)} href='#'>Delete</MDBBtn>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>

                        ))
                    }
                </MDBRow>
            </div>
        </div>
    )
}

export default Body