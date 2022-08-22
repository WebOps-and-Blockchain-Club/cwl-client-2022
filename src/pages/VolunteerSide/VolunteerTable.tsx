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

function createData(username: string, contact: number, location: string, helpRequired: string) {
  return { username, location, contact, helpRequired }
}

const rows = [
  createData('Someone', 1234567890, 'somewhere', 'food'),
  createData('Something', 1234577890, 'somewhere else', 'groceries, food'),
  createData('Somewhere', 1234567790, 'another somewhere', 'shelter'),
  createData('Sometime', 1234567779, 'any somewhere', 'food, shelter, groceries'),
]

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align='right'>contact</TableCell>
            <TableCell align='right'>Fat&nbsp;(g)</TableCell>
            <TableCell align='right'>Carbs&nbsp;(g)</TableCell>
            <TableCell align='right'>Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.username} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row'>
                {row.username}
              </TableCell>
              <TableCell align='right'>{row.location}</TableCell>
              <TableCell align='right'>{row.contact}</TableCell>
              <TableCell align='right'>{row.helpRequired}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
