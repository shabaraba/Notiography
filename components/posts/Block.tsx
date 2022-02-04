import * as Blocks from './blocks'

// $BJ8;zNs$N$^$^%+%9%?%`%?%0$K;XDj$9$k$H(Bhtml$B%?%0$H$7$FFI$^$l$F$7$^$&(B
// $B$=$N$?$aJ8;zNs$H%3%s%]!<%M%s%H$rI3IU$1$kAX$,I,MW(B
const Component = {
  Paragraph: Blocks.Paragraph,
  Heading1: Blocks.Heading1,
  Heading2: Blocks.Heading2,
  Heading3: Blocks.Heading3,
  Code: Blocks.Code,
  Callout: Blocks.Callout,
  Image: Blocks.Image,
}

export default function Block({entity}: {entity: any}) {
  console.log("rending block...")
  console.log(entity)
  const BlockComponent = Component[entity.type]
  console.log(BlockComponent)
  return <BlockComponent entity={ entity } />
}


