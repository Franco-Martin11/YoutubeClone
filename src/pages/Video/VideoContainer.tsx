import { Stack } from '@chakra-ui/react'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { VideoPlayer } from '..'
import { Loader, IsError } from '../../components'
import { useGetDetailVideosQuery } from '../../store/reducers/apiFetch'
import { DataDetailsVideos } from '../../types/typeAPI'
import DetailVideo from './components/DetailVideo'
import { useEffect } from 'react'
import { HandleScrollToTop } from '../../utils'

type Props = { params: { id: string } }

const VideoContainer = ({ params: { id } }: Props): JSX.Element => {
  const { data, isLoading, isError, error } = useGetDetailVideosQuery<{
    data: DataDetailsVideos
    error: FetchBaseQueryError | SerializedError
    isLoading: boolean
    isError: boolean
  }>({ videoId: id })

  useEffect(() => {
    HandleScrollToTop({ direction: 'top', behavior: '', coordinate: 0 })
  }, [])

  if (isLoading) return <Loader />
  if (isError) return <IsError error={error} />
  if (data) {
    return (
      <Stack mt={'1rem'}>
        <VideoPlayer id={id} />
        {data.items.map((v) => (
          <DetailVideo
            key={v.id}
            snippet={v.snippet}
            contentDetails={v.contentDetails}
            statistics={v.statistics}
            id={v.id}
          />
        ))}
      </Stack>
    )
  }

  // Retorno por defecto en caso de que ninguna condición se cumpla
  return <></>
}

export default VideoContainer
