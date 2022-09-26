import React, { useState } from 'react'
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
import { DoneAllOutlined, DeleteOutlined } from '@mui/icons-material'
import { useMutation } from '@apollo/client'
import { UpdateIssueDocument } from '../../generated'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

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
// eslint-disable-next-line
export default function CompliantTable(props: any) {
  const { issues } = props.props
  const classes = useStyles()
  const [issueID, setIssueID] = useState('')
  const [selectedIssue, setSelectedIssue] = useState(null)
  const [selectedIssueDeleted, setSelectedIssueDeleted] = useState('')
  // eslint-disable-next-line
  const [updateIssue, { data }] = useMutation(UpdateIssueDocument, {
    variables: {
      id: issueID || '',
    },
  })

  const handleUpdateIssue = async (issueID: string) => {
    if (issueID === '') return
    try {
      await updateIssue({
        variables: {
          id: issueID,
        },
      })
      setSelectedIssueDeleted(issueID)
      setTimeout(() => {
        setSelectedIssueDeleted('')
      }, 2000)
    } catch (error) {
      console.error(error)
    }
  }

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
              <TableCell className={classes.tableHeaderCell}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* eslint-disable-next-line */}
            {issues.map((row: any) => {
              return (
                <TableRow key={row.username}>
                  <TableCell>
                    <Avatar alt={row.username} src='.' className={classes.avatar} />
                  </TableCell>
                  <TableCell className={classes.name} component='th' scope='row'>
                    {row.username}
                  </TableCell>
                  <TableCell className={classes.name1} align='center'>
                    ({JSON.parse(row.location).lat},{JSON.parse(row.location).lng})
                  </TableCell>
                  <TableCell className={classes.name1} align='center'>
                    {row.phoneNumber}
                  </TableCell>
                  <TableCell className={classes.name1} align='center'>
                    {JSON.parse(row.tags).map((e: string) => e + ',')}
                  </TableCell>
                  <TableCell align='center'>
                    <Checkbox
                      checked={selectedIssue === row.id}
                      {...label}
                      onChange={(e) => {
                        e.preventDefault()
                        if (selectedIssue === row.id) setSelectedIssue(null)
                        else setSelectedIssue(row.id)
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {selectedIssue === row.id && (
                      <DeleteOutlined
                        onClick={(e) => {
                          e.preventDefault()
                          setIssueID(row.id)
                          handleUpdateIssue(row.id)
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {selectedIssueDeleted === row.id && (
                      <DoneAllOutlined style={{ color: '#42f54b' }} />
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
