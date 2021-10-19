import { useState } from "react";
import styled from "styled-components";
import ReactMarkdownWrapper from "../components/ReactMarkdownWrapper";
import MonacoEditor from "@monaco-editor/react";

const Container = styled.div`
  display: flex;
`;

const Preview = styled.div`
  border: 2px solid black;
  border-radius: 2px;
  width: 35vw;
  height: 80vh;
  margin-left: 10px;
  padding: 16px;
  overflow: scroll;
`;

const Editor = () => {
  const [markdown, setMarkdown] = useState("");

  return (
    <Container>
      <MonacoEditor
        height="85vh"
        language="markdown"
        width="40vw"
        theme="vs-dark"
        value={markdown}
        loading="loading..."
        onChange={(value, e) => setMarkdown(value)}
        options={{
          lineNumbers: "off",
          minimap: {
            enabled: false,
          },
        }}
      />
      <Preview className="markdown-body">
        <ReactMarkdownWrapper body={markdown} />
      </Preview>
    </Container>
  );
};

export default Editor;
