import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Paper,
  Checkbox,
} from '@material-ui/core'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

import createData from '../../utils/createData'
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
    align: 'center',
  },
  tableContainer: {
    borderRadius: 15,
    margin: '10px 10px',
    maxWidth: 1000,
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.dark,
    fontSize: 'medium',
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
  name: {
    fontWeight: 'bold',
    color: theme.palette.secondary.dark,
    textTransform: 'capitalize',
    fontSize: '16px',
  },
  name1: {
    textTransform: 'capitalize',
    fontSize: '15px',
  },
}))

const rows = [
  createData('Someone', 1234567890, 'somewhere', 'food'),
  createData('Something', 1234577890, 'somewhere else', 'groceries, food'),
  createData('Somewhere', 1234567790, 'another somewhere', 'shelter'),
  createData('Sometime', 1234567779, 'any somewhere', 'food, shelter, groceries'),
]

export default function VolunteerTable() {
  const classes = useStyles()
  return (
    <div style={{ display: 'flex', width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
      <TableContainer elevation={24} component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} style={{ margin: 'auto' }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}></TableCell>
              <TableCell className={classes.tableHeaderCell}>Name</TableCell>
              <TableCell className={classes.tableHeaderCell} align='center'>
                Location
              </TableCell>
              <TableCell className={classes.tableHeaderCell} align='center'>
                Contact No.
              </TableCell>
              <TableCell className={classes.tableHeaderCell} align='center'>
                Help Required
              </TableCell>
              <TableCell className={classes.tableHeaderCell} align='center'>
                Status
              </TableCell>
              <TableCell className={classes.tableHeaderCell}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.username}>
                <TableCell>
                  {' '}
                  <Avatar alt={row.username} src='.' className={classes.avatar} />
                </TableCell>
                <TableCell className={classes.name} component='th' scope='row'>
                  {row.username}
                </TableCell>
                <TableCell className={classes.name1} align='center'>
                  {row.location}
                </TableCell>
                <TableCell className={classes.name1} align='center'>
                  {row.contact}
                </TableCell>
                <TableCell className={classes.name1} align='center'>
                  {row.helpRequired}
                </TableCell>
                <TableCell align='center'>
                  <Checkbox {...label} />
                </TableCell>
                <TableCell>
                  {' '}
                  <DeleteOutlinedIcon />{' '}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
