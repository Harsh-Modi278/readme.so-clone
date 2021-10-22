import { useState } from "react";
import styled from "styled-components";
import ReactMarkdownWrapper from "../components/ReactMarkdownWrapper";
import Header from "../components/Header";
import MonacoEditor from "@monaco-editor/react";
import SectionsColumn from "../components/SectionsColumn";
import initialData from "../initial-data";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Switch from "@mui/material/Switch";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Preview = styled.div`
  border: 1px solid black;
  border-radius: 2px;
  width: 35vw;
  height: 75vh;
  padding: ${(props) => (props.editorContent ? "none" : "16px")};
  overflow: scroll;
`;

const EditorWrapper = styled.div`
  margin-left: 10px;
  margin-right: 10px;
`;

const ButtonWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }

  color: ${(props) => (props.isClicked ? "limegreen" : "inherit")};
`;

const Editor = () => {
  const [markdown, setMarkdown] = useState("");
  const [totalMarkdown, setTotalMarkdown] = useState("");
  const [editorVisible, setEditorVisible] = useState(false);
  const [isPreview, setIsPreview] = useState(true);
  const [darkTheme, setDarkTheme] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  return (
    <>
      <Header totalMarkdown={totalMarkdown} />
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
            <div style={{ display: "flex" }}>
              <h4>Editor</h4>
              <div style={{ flexGrow: 1 }}></div>
              <h4>Light</h4>
              <Switch
                checked={darkTheme}
                defaultChecked
                sx={{ marginTop: 1.2 }}
                onChange={() => {
                  setDarkTheme(!darkTheme);
                }}
              />
              <h4>Dark</h4>
            </div>
            <div style={{ border: "1px solid black" }}>
              <MonacoEditor
                language="markdown"
                theme={darkTheme ? "vs-dark" : "light"}
                value={markdown}
                width="35vw"
                height="75vh"
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
            </div>
          </EditorWrapper>
        ) : (
          <EditorWrapper>
            <div style={{ display: "flex" }}>
              <h4>Editor</h4>
              <div style={{ flexGrow: 1 }}></div>
              <h4>Light</h4>
              <Switch
                checked={darkTheme}
                defaultChecked
                sx={{ marginTop: 1.2 }}
                onChange={() => {
                  setDarkTheme(!darkTheme);
                }}
              />
              <h4>Dark</h4>
            </div>
            <div style={{ width: "35vw", height: "75vh" }}>
              <h3>
                Select a section from the left sidebar to edit the contents
              </h3>
            </div>
          </EditorWrapper>
        )}

        <EditorWrapper>
          <div style={{ display: "flex" }}>
            <ButtonWrapper
              isClicked={isPreview}
              onClick={() => {
                setIsPreview(true);
              }}
            >
              <h4>Preview</h4>
            </ButtonWrapper>
            <div style={{ flexGrow: 1 }}></div>
            <ButtonWrapper
              isClicked={!isPreview}
              onClick={() => {
                setIsPreview(false);
              }}
            >
              <h4>Raw</h4>
            </ButtonWrapper>
            <Button
              onClick={async () => {
                navigator.clipboard.writeText(totalMarkdown).then(
                  () => {
                    setSnackbarOpen(true);
                  },
                  () => {
                    //unable to copy message scenario
                  }
                );
              }}
            >
              <ContentCopyIcon />
            </Button>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={(e, reason) => {
                setSnackbarOpen(false);
              }}
              action={
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={(e, reason) => {
                    if (reason === "clickaway") {
                      return;
                    }
                    setSnackbarOpen(false);
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
              message="Markdown copied"
            />
          </div>
          {isPreview ? (
            <Preview className="markdown-body">
              <ReactMarkdownWrapper body={String.raw`${totalMarkdown}`} />
            </Preview>
          ) : (
            <Preview editorContent={true}>
              <MonacoEditor
                theme={darkTheme ? "vs-dark" : "light"}
                value={totalMarkdown}
                loading="loading..."
                // width="35vw"
                // height="75vh"
                options={{
                  lineNumbers: "off",
                  minimap: {
                    enabled: false,
                  },
                  readOnly: true,
                }}
              />
            </Preview>
          )}
        </EditorWrapper>
      </Container>
    </>
  );
};

export default Editor;
