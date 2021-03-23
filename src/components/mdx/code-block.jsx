/* eslint-disable */
import React from 'react';
import { useColorMode } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Highlight, { defaultProps } from 'prism-react-renderer';
import duotoneLight from 'prism-react-renderer/themes/duotoneLight';
import oceanicNext from 'prism-react-renderer/themes/oceanicNext';

const StyledTagWrapper = styled.div`
  position: relative;
  margin: 1em 0;
  &::after {
    content: "${(props) => props.language}";
    display: inline-block;
    position: absolute;
    top: 0rem;
    right: 1rem;
    padding: 0.1rem 0.5rem;
    border-radius: 0px 0px 0.25rem 0.25rem;
    background: rgb(217, 215, 224);
    color: rgb(35, 33, 41);
    text-transform: uppercase;
    font-size: 0.7rem;
    letter-spacing: 0.025rem;
    line-height: 1.2rem;
  }
`;

const StyledPre = styled.pre`
  border-radius: .3em;
  padding: 1.5em;
  text-align: left;
  overflow: scroll;
`;

const Line = styled.div`
  display: table-row;
`;

const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`;

const LineContent = styled.span`
  display: table-cell;
  padding-right: 1.5em;
`;

const CodeBlock = ({ children }) => {
  const { colorMode } = useColorMode();
  const language = children.props.className.replace(/language-/, '') || '';

  return (
    <StyledTagWrapper language={language}>
      <Highlight
        {...defaultProps}
        code={children.props.children.trim()}
        language={language}
        theme={colorMode === 'dark' ? oceanicNext : duotoneLight}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <StyledPre className={className} style={style}>
            {tokens.map((line, i) => (
              <Line {...getLineProps({ line, key: i })}>
                <LineNo>{i + 1}</LineNo>
                <LineContent>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </LineContent>
              </Line>
            ))}
          </StyledPre>
        )}
      </Highlight>
    </StyledTagWrapper>
  );
};

export default CodeBlock;
