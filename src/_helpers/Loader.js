import React from 'react'

export const useLoader = () => {
  const [loading, setLoading] = React.useState(false)

  return {
    isLoading: () => loading,
    loaded: (cb = () => null) => {
      setLoading(false)
      cb()
    },
    loading: () => setLoading(true)
  }
}