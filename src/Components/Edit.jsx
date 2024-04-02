import React, { useEffect, useState } from 'react';
import Header from './Header';
import { MDBInput, MDBBtn, MDBCardTitle } from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Edit() {
    const location = useNavigate();
    const { id } = useParams();
    const base_url = "http://localhost:8000";

    const [movieId, setMovieId] = useState("");
    const [movieTitle, setMovieTitle] = useState("");
    const [movieDirector, setMovieDirector] = useState("");
    const [movieReleaseDate, setMovieReleaseDate] = useState("");
    const [movieRating, setMovieRating] = useState("");

    const getAMovie = async (id) => {
        const result = await axios.get(`${base_url}/get-an-item/${id}`);
        const movieData = result.data.datafrmdb;
        setMovieId(movieData.id);
        setMovieTitle(movieData.title);
        setMovieDirector(movieData.director);
        setMovieReleaseDate(movieData.release_date);
        setMovieRating(movieData.rating);
    };

    useEffect(() => {
        getAMovie(id);
    }, []);

    const updateMovie = async (e) => {
        e.preventDefault();
        const body = {
            id: movieId,
            title: movieTitle,
            director: movieDirector,
            release_date: movieReleaseDate,
            rating: movieRating
        };
        const result = await axios.post(`${base_url}/update-movie/${id}`, body);
        console.log(result);
        alert(result.data.message);
        location('/body');
    };

    return (
        <div>
            <Header />
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4 m-3 shadow">
                    <div>
                        <form>
                            <MDBCardTitle className='text-center m-3'>Edit Movie</MDBCardTitle>
                            <MDBInput value={movieId} onChange={(e) => setMovieId(e.target.value)} wrapperClass='mb-4' id='form6Example3' label='ID' />
                            <MDBInput value={movieTitle} onChange={(e) => setMovieTitle(e.target.value)} wrapperClass='mb-4' id='form6Example3' label='Movie name' />
                            <MDBInput value={movieDirector} onChange={(e) => setMovieDirector(e.target.value)} wrapperClass='mb-4' id='form6Example4' label='Director' />
                            <MDBInput value={movieReleaseDate} onChange={(e) => setMovieReleaseDate(e.target.value)} wrapperClass='mb-4' type='text' id='form6Example5' label='Release Date' />
                            <MDBInput value={movieRating} onChange={(e) => setMovieRating(e.target.value)} wrapperClass='mb-4' type='text' id='form6Example6' label='Rating (out of 5)' />

                            <MDBBtn onClick={(e) => updateMovie(e)} className='mb-4' type='submit' block>
                                Submit
                            </MDBBtn>
                        </form>
                    </div>
                </div>
                <div className="col-4"></div>
            </div>
        </div>
    );
}

export default Edit;
