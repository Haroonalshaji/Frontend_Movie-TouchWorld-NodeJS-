import React, { useEffect, useState } from 'react'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand
} from 'mdb-react-ui-kit';

function Header() {

    const [search, setSearch] = useState("")

    useEffect(() => {
        console.log(search);
    }, [search])

    return (
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
                    <div>
                        <input style={{ borderRadius: '10px', width: '250px' }} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='  Search By Name....' />
                    </div>
                </MDBContainer>
            </MDBNavbar>
        </div>
    )
}

export default Header