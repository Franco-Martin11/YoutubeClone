import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { rawObjectResponse } from '../../pages/Channel/components/responseRaw'
import { ChannelVideoRaw } from '../../types/ChannelVideoRaw'

const apiKey: string = import.meta.env.VITE_API_KEY
const apiHost: string = import.meta.env.VITE_API_HOST
const MAX_RESULT = '25'

export const youtubeAPI = createApi({
  reducerPath: 'youtubeAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://youtube-v31.p.rapidapi.com',
    prepareHeaders: (headers) => {
      // Agregar los encabezados personalizados aquí
      headers.set('X-RapidAPI-Key', apiKey)
      headers.set('X-RapidAPI-Host', apiHost)
      return headers
    }
  }),
  endpoints: (builder) => ({
    getSearchVideos: builder.query({
      query: ({ search }) => `search?q=${search}&part=id%2Csnippet&maxResults=50`
    }),
    getDetailVideos: builder.query({
      query: ({ videoId }) => `videos?part=contentDetails%2Csnippet%2Cstatistics&id=${videoId}`
    }),
    getDetailChannel: builder.query<rawObjectResponse, { channelId: string }>({
      query: ({ channelId }) => `channels?part=snippet%2Cstatistics&id=${channelId}`,
      keepUnusedDataFor: 600000
    }),
    getDetailChannelVideos: builder.query<
      ChannelVideoRaw,
      { channelId: string; part: string; order: string; token?: string }
    >({
      query: ({ channelId, part = 'snippet,id', order = 'date', token }) =>
        `search?part=${part}&channelId=${channelId}${
          token ? '&pageToken=' + token : ''
        }&order=${order}&maxResults=${MAX_RESULT}`
    })
  })
})

export const {
  useGetSearchVideosQuery,
  useGetDetailVideosQuery,
  useGetDetailChannelQuery,
  useGetDetailChannelVideosQuery
} = youtubeAPI
