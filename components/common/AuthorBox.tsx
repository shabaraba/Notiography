import React from 'react'
import axios from 'axios'
import useSWRImmutable from 'swr/immutable'
import {Link, Skeleton, Container, Box, Image, VStack, Tooltip, Icon, Text} from '@chakra-ui/react'
import {SiGithub, SiTwitter, SiQiita} from 'react-icons/si'

export default () => {
  const fetcher = async (url:string) => {
    console.log('fetching... -> ' + url)
    const result = await axios.get(url)
    console.log('result... -> ' + JSON.stringify(result))
    return result.data
  }

  const { data: fetchedData } = useSWRImmutable('https://api.github.com/users/shabaraba', fetcher)
  if (!fetchedData) return <Skeleton />

  const avatarUrl = fetchedData.avatar_url
  const iconSize = 6
  return (
    <Box
      p={5}
    >
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <Image
          borderRadius='full'
          boxSize='150px'
          alt='shabaraba'
          src={avatarUrl}
          filter='drop-shadow(3px 3px 3px rgba(0,0,0,0.2))'
        />
        <VStack
          align='center'
          justify='center'
          ml={5}
        >
          <Tooltip hasArrow label='Github' placement='right-start'>
            <Link href="https://github.com/shabaraba">
              <Icon as={SiGithub} w={iconSize} h={iconSize} filter='drop-shadow(3px 3px 3px rgba(0,0,0,0.2))' />
            </Link>
          </Tooltip>
          <Tooltip hasArrow label='Twitter' placement='right-start'>
            <Link href="https://twitter.com/shaba_raba">
              <Icon as={SiTwitter} w={iconSize} h={iconSize} filter='drop-shadow(3px 3px 3px rgba(0,0,0,0.2))' />
            </Link>
          </Tooltip>
          <Tooltip hasArrow label='Qiita' placement='right-start'>
            <Link href="https://qiita.com/shabaraba">
              <Icon as={SiQiita} w={iconSize} h={iconSize} filter='drop-shadow(3px 3px 3px rgba(0,0,0,0.2))' />
            </Link>
          </Tooltip>
        </VStack>
      </Box>
      <Box
        pt={5}
      >
        <Text fontSize='lg'>
          Author: ?????????
        </Text>
        <Text fontSize='xs'>
          ?????????????????????PHP???????????????<br />
          ????????????????????????????????????????????????<br />
          ???????????????3????????????????????????????????????????????????????????????<br />
          <br />
          ????????????????????????????????????????????????????????????????????????<br />
        </Text>
      </Box>

    </Box>
  )
}

