function useFetch<T>(url: string) {
  
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState<T | null>(null)
  const [error, setError] = React.useState(false)

  const getFetch = async (url: string) => {
    setLoading(true)
    setError(false)
    try {
      const response = await fetch(url)
      if (response.status === 200) {
        const data = await response.json()
        setData(data)
      }
      else if (response.status >= 400 && response.status <= 500) {
        throw new Error('error response code')
      }
    }
    catch (err) {
      setError(true)
    }
    setLoading(false)
  }

  React.useEffect(() => {

    getFetch(url)

  }, [url])

  return {
    loading,
    data,
    error
  }
}

