import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  tableCellClasses,
} from '@mui/material'
import { styled } from '@mui/material/styles';

import createData from '../../utils/createData'
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  // '&:last-child td, &:last-child th': {
  //   border: 0,
  // },
}));

const rows = [
  createData('Someone', 1234567890, 'somewhere', 'food'),
  createData('Something', 1234577890, 'somewhere else', 'groceries, food'),
  createData('Somewhere', 1234567790, 'another somewhere', 'shelter'),
  createData('Sometime', 1234567779, 'any somewhere', 'food, shelter, groceries'),
]

export default function VolunteerTable() {
  return (
    // <TableContainer component={Paper}>
    //   <Table sx={{ minWidth: 650 }} aria-label='simple table' style={{ border: '1px solid black' }}>
    //     <TableHead>
    //       <TableRow>
    //         <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
    //         <TableCell style={{ fontWeight: 'bold' }} align='center'>
    //           Location
    //         </TableCell>
    //         <TableCell style={{ fontWeight: 'bold' }} align='center'>
    //           Contact
    //         </TableCell>
    //         <TableCell style={{ fontWeight: 'bold' }} align='center'>
    //           Help Required
    //         </TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {rows.map((row) => (
    //         <TableRow key={row.username} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
    //           <TableCell component='th' scope='row'>
    //             {row.username}
    //           </TableCell>
    //           <TableCell align='center'>{row.location}</TableCell>
    //           <TableCell align='center'>{row.contact}</TableCell>
    //           <TableCell align='center'>{row.helpRequired}</TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
<div >
<TableContainer  >
<Table sx={{ minWidth:500, maxWidth:1300,borderRadius: '10px' }}aria-label="customized table">
  <TableHead>
    <TableRow>
      <StyledTableCell>Name</StyledTableCell>
      <StyledTableCell align="center">Location</StyledTableCell>
      <StyledTableCell align="center">Contact No.</StyledTableCell>
      <StyledTableCell align="center">Help Required</StyledTableCell>
      
    </TableRow>
  </TableHead>
  <TableBody>
    {rows.map((row) => (
      <StyledTableRow key={row.username}>
        <StyledTableCell component="th" scope="row">
          {row.username}
        </StyledTableCell>
        <StyledTableCell align="center">{row.location}</StyledTableCell>
        <StyledTableCell align="center">{row.contact}</StyledTableCell>
        <StyledTableCell align="center">{row.helpRequired}</StyledTableCell>
      </StyledTableRow>
    ))}
  </TableBody>
</Table>
</TableContainer>
</div>
  )
}
