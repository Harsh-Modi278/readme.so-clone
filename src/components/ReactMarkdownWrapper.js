import { React } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";

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
