import {
  get,
  getDatabase,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAt,
} from 'firebase/database'

import { useEffect, useState } from 'react'

export default function useVideoList(page) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [videos, setVideos] = useState([])
  const [hasMore, setHasMore] = useState([true])

  useEffect(() => {
    async function fetchVideos() {
      const db = getDatabase()
      const videosRef = ref(db, 'videos')
      const videoQuery = query(
        videosRef,
        orderByKey(),
        startAt('' + page),
        limitToFirst(8)
      )
      try {
        setError(false)
        setLoading(true)
        console.log(videoQuery)
        const snapshot = await get(videoQuery)
        console.log(snapshot)
        setLoading(false)
        if (snapshot.exits()) {
          setVideos((prevVideos) => {
            return [...prevVideos, Object.values(snapshot.val())]
          })
        } else {
          setHasMore(false)
        }
      } catch (error) {
        console.log(error)
        setLoading(false)
        setError(true)
      }
    }

    setTimeout(() => {
      fetchVideos()
    }, 2000)
  }, [page])

  return {
    loading,
    error,
    videos,
    hasMore,
  }
}
