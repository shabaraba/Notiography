import React from 'react'
import { useBreakpointValue, Container, Box, HStack, Text, Icon, Grid, GridItem, Link as ChakraLink } from '@chakra-ui/react'
import {SiNotion, SiNetlify, SiNextdotjs} from 'react-icons/si'
import Sticky from 'react-sticky-el'
import Head from 'next/head'
import styles from './layout.module.css'
import Link from 'next/link'

export const siteTitle = 'Coffee Break Point'
export const siteDescription = 'コーヒー休憩にちょうどよい技術よみものを目指して'

const HeadTag: React.FC = () => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content={siteDescription}
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={'crossOrigin'} />
      <link href="https://fonts.googleapis.com/css2?family=Caveat&display=swap" rel="stylesheet" />
    </Head>
  )
}

const SiteLogo: React.FC = () => {
  return (
    <header
      style={{
        background: '#FFF5F3'
      }}
    >
      <Link href="/">
        <ChakraLink
          pt={3}
          fontSize='4xl'
          position='relative'
          display='inline-block'
          textDecoration='none'
          style={{
            fontFamily: "'Caveat', cursive",
            transform: "rotate(-5deg)"
          }}
          _hover={{
            textDecoration: 'underline',
            transition: 'transform .3s',
          }}
        >
          {siteTitle}
        </ChakraLink>
      </Link>
    </header>
  )
}


export default function Layout({
  children,
  leftside,
  home
}: {
  children: React.ReactNode
  leftside?: React.ReactNode
  home?: boolean
}) {
  const isMobile = useBreakpointValue({lg: false, sm: true, base: true})
                    // background: '#e8cfc1'
  return (
    <>
      <HeadTag />
      <Box maxW='100vw' bg='#FFF5F3'>
        <main>
          <Grid templateColumns={{lg: 'repeat(12, 1fr)', base: '1fr'}} gap={25} w='100%'>
            <GridItem colSpan={{lg: 3, base: 1}} >
              <Container>
                {!isMobile?
                  <Sticky disabled={isMobile}>
                    <SiteLogo />
                    {leftside}
                  </Sticky>
                :
                  <>
                    <SiteLogo />
                    {leftside}
                  </>
                }
              </Container>
            </GridItem>
            <GridItem 
              colSpan={{lg: 9, base: 1}} 
            >
              <Container maxW='container.lg'>
                {children}
              </Container>
            </GridItem>
          </Grid>
        </main>
        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
        )}
        <Sticky>
          <Footer />
        </Sticky>
      </Box>
    </>
  )
}

const Footer = () => {
  return (
    <Container
      p={5}
      fontSize='sm'
    >
      <Text textAlign='center'>
        ©from-garage 2022 All Rights Reserved.
      </Text>
      <HStack
        align='center'
        justify='center'
      >
        <Text as='span'> powered by</Text>
        <Icon as={SiNextdotjs} />
        <Icon as={SiNetlify} />
        <Icon as={SiNotion} />
      </HStack>
    </Container>
  )
}
