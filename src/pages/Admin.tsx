import { useEffect, useState } from 'react'
// import { BetaAnalyticsDataClient } from '@google-analytics/data'
import { GetWaterDataDocument } from '../generated'
import { useMutation } from '@apollo/client'
import { visuallyHidden } from '@mui/utils'
import moment from 'moment/moment'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
} from '@mui/material'

interface Data {
  date: string
  depth: number
  flagged: string
  image: string
  location: unknown
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array?.map((el, index) => [el, index] as [T, number])
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis?.map((el) => el[0])
}

interface HeadCell {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'depth',
    numeric: true,
    disablePadding: false,
    label: 'Depth (cm)',
  },
  {
    id: 'flagged',
    numeric: true,
    disablePadding: false,
    label: 'Flagged Status',
  },
  {
    id: 'image',
    numeric: true,
    disablePadding: false,
    label: 'Image Submitted',
  },
  {
    id: 'location',
    numeric: true,
    disablePadding: false,
    label: 'Latitude , Longitude',
  },
]

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void
  order: Order
  orderBy: string
  rowCount: number
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, rowCount, onRequestSort } = props
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontSize: '18px' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

function EnhancedTableToolbar() {
  return (
    <Toolbar>
      <Typography
        color='primary'
        sx={{ fontSize: '25px', flex: '1 1 100%' }}
        variant='h6'
        id='tableTitle'
        component='div'
      >
        User Data
      </Typography>
    </Toolbar>
  )
}

const Admin = () => {
  // const [data, setData] = useState(['pathPage', 'deviceCategory', 'userGender'])
  const [getWaterData] = useMutation(GetWaterDataDocument)
  const [remarks, setRemarks] = useState<Array<string | undefined | null>>([])
  const [images, setImages] = useState(0)
  const [flagged, setFlagged] = useState(0)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [waterData, setWaterData] = useState<any>([])
  // const analyticsDataClient = new BetaAnalyticsDataClient()
  // async function runReport(props: string) {
  //   const [response] = await analyticsDataClient.runReport({
  //     property: `properties/${process.env.REACT_APP_propertyId}`,
  //     dateRanges: [
  //       {
  //         startDate: '2022-01-31',
  //         endDate: 'today',
  //       },
  //     ],
  //     dimensions: [
  //       {
  //         name: props,
  //       },
  //     ],
  //     metrics: [
  //       {
  //         name: 'activeUsers',
  //       },
  //     ],
  //   })
  //   response?.rows?.forEach((row: any) => {
  //     console.log(row?.dimensionValues[0], row?.metricValues[0])
  //     return
  //   })
  // }

  const dashboardWaterData = async () => {
    const waterData = await getWaterData({
      variables: { interval: 1000, depth: 0 },
    })

    let remarks: Array<string | undefined | null> = []
    let count = 0
    let flagged = 0
    setWaterData(waterData?.data?.getWaterData)
    waterData?.data?.getWaterData?.forEach((water) => {
      if (water?.remarks && water?.remarks !== '') {
        remarks = [...remarks, water?.remarks]
      }
      if (water.image && water.image !== '') {
        count++
      }
      if (water.flagged) {
        flagged++
      }
    })
    setRemarks(remarks)
    setImages(count)
    setFlagged(flagged)
    console.log(remarks, count, flagged)
    console.log(waterData?.data?.getWaterData)
  }
  useEffect(() => {
    // runReport(data[0])
    dashboardWaterData()
  }, [])

  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof Data>('date')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(25)

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }
  const getLatLn = (obj: any) => {
    // eslint-disable-next-line prefer-const
    let latLn = JSON.parse(obj)
    return latLn?.lat.toString() + ' , ' + latLn?.lng.toString()
  }
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Box sx={{ paddingTop: '15px', paddingLeft: '35px', width: '100%' }}>
      <Paper sx={{ alignContent: 'center', width: '95%', mb: 1 }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table sx={{ minWidth: 700 }} aria-labelledby='tableTitle'>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={waterData.length}
            />
            <TableBody>
              {stableSort(waterData, getComparator(order, orderBy))
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={row.date}>
                      <TableCell component='th' id={labelId} scope='row' padding='normal'>
                        {moment(row.date).format('MMMM Do YYYY, h:mm:ss a')}
                      </TableCell>
                      <TableCell align='center'>{row.depth}</TableCell>
                      <TableCell align='center'>
                        {row.flagged ? (
                          <Typography sx={{ color: 'green' }}> Yes</Typography>
                        ) : (
                          <Typography sx={{ color: 'red' }}> No</Typography>
                        )}
                      </TableCell>
                      <TableCell align='center'>
                        {row.image === '' ? 'Not Submitted' : 'Submitted'}
                      </TableCell>
                      <TableCell align='center'>{getLatLn(row.location)}</TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[25, 35, 45]}
          component='div'
          count={waterData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}
export default Admin
