import { useState } from "react";
import styled from "styled-components";
import ReactMarkdownWrapper from "../components/ReactMarkdownWrapper";
import MonacoEditor from "@monaco-editor/react";

const Container = styled.div`
  display: flex;
  margin-top: 20px;
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

const EditorWrapper = styled.div`
  width: 35vw;
  height: 80vh;
  margin-left: 10px;
  overflow: scroll;
`;

const Editor = () => {
  const [markdown, setMarkdown] = useState("");

  return (
    <Container>
      <EditorWrapper>
        <MonacoEditor
          language="markdown"
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
      </EditorWrapper>
      <Preview className="markdown-body">
        <ReactMarkdownWrapper body={markdown} />
      </Preview>
    </Container>
  );
};

export default Editor;
