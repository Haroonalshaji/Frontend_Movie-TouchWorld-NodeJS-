import React, { useEffect, useState } from 'react'
import Header from './Header'
import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardLink,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';



function View() {

    const { id } = useParams();
    console.log(id);

    const [items, setItems] = useState([])

    const base_url = "http://localhost:8000"

    const getAnItem = async (id) => {
        const result = await axios.get(`${base_url}/get-an-item/${id}`);
        console.log(result.data.datafrmdb);
        setItems(result.data.datafrmdb)
    }

    console.log(items);

    useEffect(() => {
        getAnItem(id)
    }, [])

    return (
        <div>
            <Header />
            <div>
                <div>
                    <MDBCard style={{ width: '600px', margin: '200px' }}>
                        <MDBCardBody>
                            <MDBCardTitle>{items.title}</MDBCardTitle>
                            <MDBCardText>
                                {items.director}
                            </MDBCardText>
                        </MDBCardBody>
                        <MDBListGroup flush>
                            <MDBListGroupItem>Release Date : {items.release_date}</MDBListGroupItem>
                            <MDBListGroupItem>Rating : {items.rating}</MDBListGroupItem>
                        </MDBListGroup>
                        <MDBCardBody>
                            <Link to={'/body'}>
                                <MDBCardLink className='btn btn-primary mx-5'>Back Home</MDBCardLink>
                            </Link>
                        </MDBCardBody>
                    </MDBCard>
                </div>
            </div>
        </div>
    )
}

export default View