import React from "react"
import { Grid, GridItem } from '@chakra-ui/react'
import { _IconComponent as IconComponent } from "./_Icon"
import { _DescriptionComponent as DescriptionComponent } from "./_Description"
import { CalloutBlockType } from "core/types/PostBlockType"

const GridStyle = {
  mt: 5,
  mb: 5,
  p: 2,
  borderRadius: 10,
  filter: 'drop-shadow(3px 3px 10px rgba(0,0,0,0.2))',
  backgroundColor :  '#CE6857',
  color: '#f7f7f7',
  templateColumns: 'repeat(10, 1fr)',
  gap: 2,
}

const GridItemIconStyle = {
  colSpan: 1,
  display: "flex",
  justifyContent: 'center',
  alignItems: 'center',
}

const GridItemDescriptionStyle = {
  colStart: 2,
  colEnd: 11,
  p: 2,
}

type Props = {
  entity: CalloutBlockType
}

export const CalloutComponent: React.FC<Props> = ({entity}: Props) => {
  return (
    <Grid {...GridStyle} >
      <GridItem {...GridItemIconStyle} >
        <IconComponent entity={entity.content} />
      </GridItem>
      <GridItem {...GridItemDescriptionStyle} >
        <DescriptionComponent entity={entity}/>
      </GridItem>
    </Grid>
  )
}

