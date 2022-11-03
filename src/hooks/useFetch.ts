import { useState, useEffect } from 'react'
import Volunteer from '../interfaces/Volunteer'

interface Response {
  data: Volunteer[] | null
  isPending: boolean
  error: string
}

const useFetch = (url: string): Response => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const abortCont = new AbortController()

    async function getData(): Promise<void> {
      await fetch(url, { signal: abortCont.signal })
        .then((res) => {
          if (!res.ok) {
            // error coming back from server
            throw Error('could not fetch the data for that resource')
          }
          return res.json()
        })
        .then((data) => {
          setIsPending(false)
          setData(data)
          // console.log(data)
          setError('')
        })
        .catch((err) => {
          if (err.name === 'AbortError') {
            console.log('fetch aborted')
          } else {
            // auto catches network / connection error
            setIsPending(false)
            setError(err.message)
          }
        })
    }
    getData()

    // abort the fetch
    return () => abortCont.abort()
  }, [url])

  return { data, isPending, error }
}

export default useFetch
