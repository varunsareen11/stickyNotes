import React, { useEffect, useState } from 'react';
import "./style.css";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
const API = "http://54.87.14.216/api";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    // [`&.${tableCellClasses.head}`]: {
    //     backgroundColor: theme.palette.common.black,
    //     color: theme.palette.common.white,
    // },
    // [`&.${tableCellClasses.body}`]: {
    //     fontSize: 14,
    // },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // '&:nth-of-type(odd)': {
    //     backgroundColor: theme.palette.action.hover,
    // },
    // // hide last border
    // '&:last-child td, &:last-child th': {
    //     border: 0,
    // },
}));


function User() {
    const [userinfo, setUserInfo] = useState([]);
    const getToken = JSON.parse(localStorage.getItem("user-info"));
    const [q, setQ] = useState("");
    const [searchTerm] = useState(["last_name"]);
    const token = getToken?.token;
    useEffect(() => {
        getUserInfo();
    }, [])
    //   get User Info
    const getUserInfo = (data) => {
        return fetch(`${API}/get-user-listing`, {
            method: "POST",
            headers: {
                "x-access-token": token,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((json) => {
                let reverseTaskList = json;
                setUserInfo(reverseTaskList);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    function search(items) {
        return items.filter((item) => {
            return searchTerm.some((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(q.toLowerCase()) > -1
                );
            });
        });
    }
    return (
        <>
            <div className='main-body'>
                <h2 className='dasshboard_heading'>Users</h2>
                <div className='card'>
                    <div className='cmn_table'>
                        <div className='tableHeading'>
                            <h3>User Table</h3>
                            <input
                                type="text"
                                placeholder="Search by Nachname"
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                            />
                        </div>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>KdNr.</StyledTableCell>
                                        <StyledTableCell >Benutzername</StyledTableCell>
                                        <StyledTableCell >Nachname</StyledTableCell>
                                        <StyledTableCell >Firma</StyledTableCell>
                                        <StyledTableCell >Paket</StyledTableCell>
                                        <StyledTableCell >Status</StyledTableCell>
                                        <StyledTableCell align="right"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {search(userinfo).map((row, index) =>
                                    (
                                        <StyledTableRow key={index + 1}>
                                            <StyledTableCell>{index + 1}</StyledTableCell>
                                            <StyledTableCell >{row.first_name}</StyledTableCell>
                                            <StyledTableCell >{row.last_name}</StyledTableCell>
                                            <StyledTableCell >{row.company_name}</StyledTableCell>
                                            <StyledTableCell >Started</StyledTableCell>
                                            <StyledTableCell >inProgress</StyledTableCell>
                                            <StyledTableCell align="right"> <Link className="btn cmn_red_bg" to={`/user/${row._id}`}>Bearbeiten </Link></StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </>
    )
}

export default User