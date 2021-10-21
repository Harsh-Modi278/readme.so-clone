import { useEffect, useState } from "react";
import styled from "styled-components";
import ReactMarkdownWrapper from "../components/ReactMarkdownWrapper";
import MonacoEditor from "@monaco-editor/react";
import SectionsColumn from "../components/SectionsColumn";
import initialData from "../initial-data";

const Container = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: flex-start;
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
  margin-right: 10px;
  overflow: scroll;
`;

const Editor = () => {
  const [markdown, setMarkdown] = useState("");
  const [totalMarkdown, setTotalMarkdown] = useState("");
  const [editorVisible, setEditorVisible] = useState(false);

  return (
    <Container>
      <SectionsColumn
        setMarkdown={setMarkdown}
        setTotalMarkdown={setTotalMarkdown}
        sections={initialData.sectionsOrdering.map(
          (sectionId) => initialData.sections[sectionId]
        )}
        markdownValue={markdown}
        setEditorVisible={setEditorVisible}
      />
      {editorVisible ? (
        <EditorWrapper>
          <MonacoEditor
            language="markdown"
            theme="vs-dark"
            value={markdown}
            loading="loading..."
            onChange={(value, e) => {
              setMarkdown(value);
              // console.log(currSectionInMarkdown);
            }}
            options={{
              lineNumbers: "off",
              minimap: {
                enabled: false,
              },
            }}
          />
        </EditorWrapper>
      ) : (
        <EditorWrapper>
          <h3>Select a section from the left sidebar to edit the contents</h3>
        </EditorWrapper>
      )}

      <Preview className="markdown-body">
        <ReactMarkdownWrapper body={totalMarkdown} />
      </Preview>
    </Container>
  );
};

export default Editor;
