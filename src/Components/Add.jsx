import React, { useState } from 'react'
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBCardTitle
} from 'mdb-react-ui-kit';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Add() {

    const base_url = "http://localhost:8000/add-movie"

    const location = useNavigate();

    const [id, setId] = useState("")
    const [title, setTitle] = useState("")
    const [director, setDirector] = useState("")
    const [release_date, setRelease_date] = useState("")
    const [rating, setRating] = useState("")



    const addMovie = async (e) => {
        e.preventDefault()
        // add employee - API Call
        console.log(id, title, director, release_date, rating);
        // api call to add employee details into the mongodb
        const body = { id, title, director, release_date, rating }
        const result = await axios.post(base_url, body).then((result) => {
            console.log(result);
            alert(result.data.message)
            location('/body')
        }).catch((error) => {
            alert('Cannot be added ' + error)
        })

    }


    return (
        <div>
            <Header />
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4 m-3 shadow">
                    <div>
                        <form>
                            <MDBCardTitle className='text-center m-3'>Add Movie</MDBCardTitle>
                            <MDBInput onChange={(e) => setId(e.target.value)} wrapperClass='mb-4' id='form6Example3' label='id' />
                            <MDBInput onChange={(e) => setTitle(e.target.value)} wrapperClass='mb-4' id='form6Example3' label='Movie name' />
                            <MDBInput onChange={(e) => setDirector(e.target.value)} wrapperClass='mb-4' id='form6Example4' label='Director' />
                            <MDBInput onChange={(e) => setRelease_date(e.target.value)} wrapperClass='mb-4' type='text' id='form6Example5' label='Release Date' />
                            <MDBInput onChange={(e) => setRating(e.target.value)} wrapperClass='mb-4' type='text' id='form6Example6' label='Rating (out of 5)' />

                            <MDBBtn onClick={(e) => addMovie(e)} className='mb-4' type='submit' block>
                                Submit
                            </MDBBtn>
                        </form>
                    </div>
                </div>
                <div className="col-4"></div>
            </div>
        </div>
    )
}

export default Add