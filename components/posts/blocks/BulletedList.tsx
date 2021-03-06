import React from "react"
import { Center, UnorderedList, ListItem, Text } from '@chakra-ui/react'
import Block from '../Block';
import type { BulletedList as BulletedListEntity, BulletedListItem as BulletedListItemEntity  } from '../../../entities/notion/blocks';
import { Paragraph } from './Paragraph'
import {v4 as uuidv4} from 'uuid';

export function BulletedList({entity}: {entity: BulletedListEntity}) {
  const unorderedTypeMap = ['disc', 'circle', 'square']

  return (
    <UnorderedList listStyleType={unorderedTypeMap[entity.nest % 3]}>
      {entity.listItem.map((item: BulletedListItemEntity) => 
        <BulletedListItem entity={item} key={uuidv4()} />
      )}
    </UnorderedList>
  )
}

export function BulletedListItem({entity}: {entity: BulletedListItemEntity}) {
  return (
    <ListItem>
      <Paragraph entity={entity}/>
      {entity.children?.map((child: any) => {
        return <Block entity={child} key={uuidv4()} />
      })}
    </ListItem>
  )
}

