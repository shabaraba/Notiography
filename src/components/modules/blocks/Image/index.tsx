import NextjsImage from 'next/image'
import { Center, Skeleton } from '@chakra-ui/react'
import useSWRImmutable from 'swr/immutable'
import axios from 'axios'

import { ImageBlockType, ImageType } from 'core/types/PostBlockType';
import { IImageBlock } from 'core/types/NotionApiResponses';

type Props = { entity: ImageBlockType };

export const ImageComponent: React.FC<Props> = ({ entity }: Props) => {
  const fetcher = async (url: string) => {
    const result = await axios.get(url)
    return result.data
  }

  const { data: fetchedBlockImage } = useSWRImmutable(`/api/notion/blocks/${entity.id}`, fetcher)

  if (!fetchedBlockImage) return <Skeleton height={600} />

  const fetchedImageEntity = fetchedBlockImage as ImageType;
  const caption = (fetchedImageEntity.captions?.length > 0) ? fetchedImageEntity.captions[0].content : ''

  const imageStyle = {
    src: fetchedImageEntity.url,
    height: 600,
    width: 800,
    alt: caption,
    objectFit: "contain",
  }

  return (
    <Center filter='drop-shadow(3px 3px 3px rgba(0,0,0,0.2))' >
      <NextjsImage {...imageStyle} />
    </Center>
  )
}
