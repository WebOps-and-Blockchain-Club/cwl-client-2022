import { useEffect, useState } from 'react'
// import { BetaAnalyticsDataClient } from '@google-analytics/data'
import { GetWaterDataDocument } from '../generated'
import { useMutation } from '@apollo/client'
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
  }
  useEffect(() => {
    // runReport(data[0])
    dashboardWaterData()
  }, [])

  return <div>Hi</div>
}
export default Admin
