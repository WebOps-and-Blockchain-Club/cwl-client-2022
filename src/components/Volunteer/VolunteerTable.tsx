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
} from '@material-ui/core'

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
const VolunteerTable = (props: any) => {
  const { volunteer } = props.props
  const classes = useStyles()
  // eslint-disable-next-line

  return (
    <div style={{ display: 'flex', width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
      <TableContainer elevation={24} component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} style={{ margin: 'auto' }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}></TableCell>
              <TableCell className={classes.tableHeaderCell}>Name</TableCell>
              <TableCell className={classes.tableHeaderCell} align='center'>
                Contact No.
              </TableCell>
              <TableCell className={classes.tableHeaderCell} align='center'>
                Ready to Provide
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* eslint-disable-next-line */}
            {volunteer.map((row: any) => {
              return (
                <TableRow key={row.username}>
                  <TableCell>
                    {' '}
                    <Avatar alt={row.username} src='.' className={classes.avatar} />
                  </TableCell>
                  <TableCell className={classes.name} component='th' scope='row'>
                    {row.username}
                  </TableCell>

                  <TableCell className={classes.name1} align='center'>
                    {row.phoneNumber}
                  </TableCell>
                  <TableCell className={classes.name1} align='center'>
                    {JSON.parse(row.tags).map((e: string) => e + ',')}
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
export default VolunteerTable
