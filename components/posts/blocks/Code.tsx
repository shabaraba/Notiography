// import SyntaxHighlighter from "react-syntax-highlighter";
import { CodeBlock, dracula } from "react-code-blocks";
import { Box } from '@chakra-ui/react'
import type { Code as CodeEntity, } from '../../../entities/notion/blocks';

export function Code({entity}: {entity: CodeEntity}) {
  const text = entity.texts.reduce((prev, cur) => {
    return prev === '' ? cur.content : prev + cur.content
  }, '')
  return (
    <Box
      mt={15}
      mb={15}
      fontSize='sm'
    >
      <CodeBlock
        text={text}
        language={entity.language}
        showLineNumbers={true}
        theme={dracula}
        customStyle={{
          borderRadius: 5,
          width: '100%',
          maxWidth: '90vw',
          overflow: 'auto'
        }}
      />
    </Box>
  )

      // <SyntaxHighlighter
      //   language={entity.language}
      //   style={atomOneDark}
      //   wrapLongLines={false}
      //   showLineNumbers={true}
      //   customStyle={{
      //     borderRadius: 5,
      //     filter: 'drop-shadow(3px 3px 10px rgba(0,0,0,0.2))',
      //     fontSize: '14px'
      //   }}
      // >
      //   {entity.texts.map(text => text.content)}
      // </SyntaxHighlighter>
}


