import React from "react"
import { Text, Code, Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'
import { ParagraphBlockType, TextType } from "core/types/PostBlockType";

type Props = { entity: ParagraphBlockType };
export const ParagraphComponent: React.FC<Props> = ({ entity }: Props) => {
  if (entity.content.texts.length === 0) return <br />

  type _Props = {
    apply?: boolean,
    color: string,
    backgroundColor: string,
    href?: string,
    fontSize: {
      base: string,
      md: string,
      lg: string,
    },
    children?: React.ReactNode
  }

  const LinkText: React.FC<_Props> = ({ color, backgroundColor, href, fontSize, children }: _Props) => {
    if (href == null) return <>{children}</>
    return <Link
      href={href}
      color={color}
      background={backgroundColor}
      fontSize={fontSize}
      overflowWrap='anywhere'
      isExternal> {children}<ExternalLinkIcon mx='2px' /> </Link>
  }

  const Bold: React.FC<_Props> = ({ apply, color, backgroundColor, fontSize, children }: _Props) => {
    if (!apply) return <>{children}</>
    return <Text
      as='strong'
      fontWeight='bold'
      color={color}
      background={backgroundColor}
      fontSize={fontSize}
      overflowWrap='anywhere'>{children}</Text>
  }

  const Italic: React.FC<_Props> = ({ apply, color, backgroundColor, fontSize, children }: _Props) => {
    if (!apply) return <>{children}</>
    return <Text 
      as='i' 
      color={color} 
      background={backgroundColor} 
      fontSize={fontSize}
      overflowWrap='anywhere'>{children}</Text>
  }

  const Underline: React.FC<_Props> = ({ apply, color, backgroundColor, fontSize, children }: _Props) => {
    if (!apply) return <>{children}</>
    return <Text 
      as='u' 
      color={color} 
      background={backgroundColor} 
      fontSize={fontSize}
      overflowWrap='anywhere'>{children}</Text>
  }

  const Strikethrough: React.FC<_Props> = ({ apply, color, backgroundColor, fontSize, children }: _Props) => {
    if (!apply) return <>{children}</>
    return <Text 
      as='s' 
      color={color} 
      background={backgroundColor} 
      fontSize={fontSize}
      overflowWrap='anywhere'>{children}</Text>
  }

  const CodeText: React.FC<_Props> = ({ apply, color, backgroundColor, fontSize, children }: _Props) => {
    if (!apply) return <>{children}</>
    return <Code 
      colorScheme={'red'} 
      background={backgroundColor} 
      display='inline' 
      overflowWrap='anywhere' 
      fontSize={fontSize}
      children={children} />
  }

  const RichText = ({ text }: {text: TextType}) => {
    if (text.content == null) return <br />

    let content = text.content ?? ''
    let color = null
    let backgroundColor = null
    if (text.annotations.color.match('_background')) backgroundColor = text.annotations.color.split('_background')[0] + '.500'
    else color = text.annotations.color + '.500'

    return (
      <Text
        as='span'
        color={color}
        backgroundColor={backgroundColor}
        fontSize={{ base: '12px', md: '14px', lg: '16px' }}
      >
        <LinkText
          color={color}
          backgroundColor={backgroundColor}
          href={text.href}
          fontSize={{ base: '12px', md: '14px', lg: '16px' }}
        >
          <Bold
            apply={text.annotations.bold}
            color={color}
            backgroundColor={backgroundColor}
            fontSize={{ base: '12px', md: '14px', lg: '16px' }}
          >
            <Italic
              apply={text.annotations.italic}
              color={color}
              backgroundColor={backgroundColor}
              fontSize={{ base: '12px', md: '14px', lg: '16px' }}
            >
              <Underline
                apply={text.annotations.underline}
                color={color}
                backgroundColor={backgroundColor}
                fontSize={{ base: '12px', md: '14px', lg: '16px' }}
              >
                <Strikethrough
                  apply={text.annotations.strikethrough}
                  color={color}
                  backgroundColor={backgroundColor}
                  fontSize={{ base: '12px', md: '14px', lg: '16px' }}
                >
                  <CodeText
                    apply={text.annotations.code}
                    color={color}
                    backgroundColor={backgroundColor}
                    fontSize={{ base: '12px', md: '14px', lg: '16px' }}
                  >
                    {content}
                  </CodeText>
                </Strikethrough>
              </Underline>
            </Italic>
          </Bold>
        </LinkText>
      </Text>
    )
  }

  type _LineType = TextType[];
  const _getLineEntities = (entity: ParagraphBlockType): _LineType[] => {
    const lineEntities: _LineType[] = [];
    let wordEntities: TextType[] = [];
    entity.content.texts.forEach((text: TextType) => {
      const lineList: string[] = text.content.split('\n');
      lineList.forEach((line: string, index: number) => {
        // 各行ごとのword block
        let wordEntity: TextType = _.cloneDeep(text);
        wordEntity.content = line;

        wordEntities.push(wordEntity);
        if (index != lineList.length - 1) {
          lineEntities.push(wordEntities);
          wordEntities = [];
        }
      });
    });
    lineEntities.push(wordEntities);
    return lineEntities;
  }

  const lineEntities: _LineType[] = _getLineEntities(entity)

  return (
    <Text>
      {lineEntities.map((line: _LineType) =>
        <Text as='span' key={uuidv4()}>
          {line.map((word: TextType) => <RichText key={uuidv4()} text={word} />)} 
          <br />
        </Text>
      )}
    </Text>
  )
}

