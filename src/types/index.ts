import { IconType } from 'react-icons'

export type CardDetails = {
  srcImage: string
  srcChanell: string
  srcImageAlt: string
  srcChanellAlt: string
  titleName: string
  chanellName: string
  channelId?: string
  viewsVideos: string
  videoDuration: number | string
  dateVideos: string
  publishedAt: Date | string
  liveBroadcastContent: string
  iconVideos?: IconType
  key?: string
  idVideo: string
}

export interface DataRoute {
  route: string
  title: string
  id: string
  iconOptions: IconType
}

export interface CategoryData {
  category: string
  id?: string
  dataRoute: DataRoute[]
}

export interface HistoryDetails {
  chanellName: string
  srcImage: string
  srcImageAlt: string
  titleName: string
  videoDuration: string | number
  publishedAt?: string | Date
  idVideo: string
  channelId?: string
}
export interface HistoryDetailsTest {
  videoId: string | undefined
  thumbnail: string | undefined
  channelHandle: string | undefined
  channelId: string | undefined
  channelThumbnail: string | undefined
  title: string | undefined
  viewCount: string | undefined | null
  publishDate: string | undefined
  publishedTimeText: string | undefined
  publishedAt?: string
}
export interface SubscriptionType {
  imgUrl: string
  title: string
  channelId: string
}

export interface PreferenceDetails {
  liked:PreferencesItem[]
  unLiked:PreferencesItem[]
}

export interface PreferencesItem {
  videoId: string | undefined
  thumbnail: string | undefined
  channelHandle: string | undefined
  channelId: string | undefined
  channelThumbnail: string | undefined
  title: string | undefined
  viewCount: string | undefined | null
  publishDate: string | undefined
  publishedTimeText: string | undefined
  publishedAt: string | undefined
  isLiked: boolean
}
