import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import createData from '../../utils/createData'

const rows = [
  createData('Someone', 1234567890, 'somewhere', 'food'),
  createData('Something', 1234577890, 'somewhere else', 'groceries, food'),
  createData('Somewhere', 1234567790, 'another somewhere', 'shelter'),
  createData('Sometime', 1234567779, 'any somewhere', 'food, shelter, groceries'),
]

export default function VolunteerTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table' style={{ border: '1px solid black' }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
            <TableCell style={{ fontWeight: 'bold' }} align='center'>
              Location
            </TableCell>
            <TableCell style={{ fontWeight: 'bold' }} align='center'>
              Contact
            </TableCell>
            <TableCell style={{ fontWeight: 'bold' }} align='center'>
              Help Required
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.username} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row'>
                {row.username}
              </TableCell>
              <TableCell align='center'>{row.location}</TableCell>
              <TableCell align='center'>{row.contact}</TableCell>
              <TableCell align='center'>{row.helpRequired}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
