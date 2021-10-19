import { React } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const ReactMarkdownWrapper = ({ body }) => {
  return (
    <ReactMarkdown
      children={body}
      linkTarget="_blank"
      remarkPlugins={[remarkGfm, remarkToc]}
    />
  );
};

export default ReactMarkdownWrapper;
