import { AspectRatio, Box, HStack, Heading, Image, Stack, Tag, Text } from '@chakra-ui/react'
import { useGetDetailChannelQuery } from '../../../store/reducers/apiFetch'
import { Snippet, Statistics } from './responseRaw'
import { IsError, Loader } from '../../../components'

export interface IChannelDetailProps {
  avatarImage?: boolean
}

const ChannelBanner = ({
  bannerUrl,
  channelTitle
}: {
  bannerUrl: string
  channelTitle: string
}) => (
  <AspectRatio height="250px" ratio={16 / 9}>
    <Image src={bannerUrl} alt={channelTitle} aria-label={channelTitle} />
  </AspectRatio>
)

const ChannelAvatar = ({
  avatarUrl,
  snippetTitle
}: {
  avatarUrl: string
  snippetTitle: string
}) => (
  <Box
    borderRadius={'xl'}
    bg="#d9d9d9"
    border="2px solid #555555"
    flexShrink="0"
    w="88px"
    h="88px"
    position="relative"
  >
    <Image borderRadius={'xl'} src={avatarUrl} alt={snippetTitle} aria-label={snippetTitle} />
  </Box>
)

const ChannelInfo = ({ snippet, statistics }: { snippet: Snippet; statistics: Statistics }) => (
  <Stack
    spacing={0}
    display="flex"
    flexDirection="column"
    gap="0"
    alignItems="start"
    justifyContent="center"
    position="relative"
    w={'full'}
  >
    <Heading fontSize="2xl" color="#fafafa" display="flex" alignItems="center">
      {snippet.title}
    </Heading>
    <HStack gap="2" flexWrap="wrap">
      <Text fontSize="xl" color="#fefefe" display="block">
        {snippet.customUrl}
      </Text>
      <HStack
        display="flex"
        flexDirection="row"
        gap="2"
        alignItems="center"
        justifyContent="start"
        flexShrink="0"
        position="relative"
      >
        <Tag borderRadius={'full'} py={1} px={2}>
          <Text>Subscribers:</Text>
          <Text fontSize="light" color="#fcfcfc" display="block">
            {statistics.subscriberCount}
          </Text>
        </Tag>

        <Tag borderRadius={'full'} py={1} px={2}>
          <Text>Videos:</Text>
          <Text fontSize="light" color="#fcfcfc" display="block">
            {statistics.videoCount}
          </Text>
        </Tag>
      </HStack>
    </HStack>
  </Stack>
)

const ChannelDetails = ({ channelId }: { channelId: string }): JSX.Element => {
  const { data: useQueryStateResult, isLoading, isError } = useGetDetailChannelQuery({ channelId })
  if (isLoading) return <Loader />
  if (isError) return <IsError error={isError} />
  return (
    <>
      {useQueryStateResult?.items?.map(({ brandingSettings, id, snippet, statistics }) => (
        <Stack key={id} as="section">
          {brandingSettings?.image?.bannerExternalUrl && (
            <ChannelBanner
              bannerUrl={brandingSettings.image.bannerExternalUrl}
              channelTitle={brandingSettings.channel.title}
            />
          )}

          <Box
            rounded="lg"
            p="2.5"
            display="flex"
            flexDirection="row"
            gap="15px"
            alignItems="center"
            justifyContent="start"
            w="390px"
            position="relative"
          >
            <ChannelAvatar
              avatarUrl={snippet.thumbnails.medium.url || snippet.thumbnails.high.url}
              snippetTitle={snippet.title}
            />
            <ChannelInfo snippet={snippet} statistics={statistics} />
          </Box>
        </Stack>
      ))}
    </>
  )
}

export default ChannelDetails
