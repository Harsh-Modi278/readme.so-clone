import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import initialData from "../initial-data";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

const Container = styled.div`
  margin-top: 2px;
  margin-left: 15px;
  margin-right: 15px;
  border: 2px solid lightgrey;
  border-radius: 2px;
  width: 25vw;
  height: 80vh;
  background-color: white;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: space-between;

  overflow: scroll;
`;

const SectionList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDragginOver ? "skyblue" : "inherit")};
  flex-grow: 1;
`;

const CardWrapper = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  padding: 4px;
  border-radius: 5px;
  margin-bottom: 5px;
  width: auto;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    background: #dcdcdc;
    cursor: pointer;
  }
`;

const SectionsColumn = (props) => {
  const { setMarkdown, setTotalMarkdown, markdownValue } = props;
  const [currSectionInMarkdown, setCurrSectionInMarkdown] =
    useState("section-1");
  const [data, setData] = useState(initialData);
  const [editableSections, setEditableSections] = useState(
    localStorage.getItem("editable-sections")
      ? [...JSON.parse(localStorage.getItem("editable-sections"))]
      : [initialData.sections["section-1"]]
  );

  const handleSectionClick = (e, sectionId) => {
    // set markdown in editor to the clicked section's (with 'sectionId') markdown
    setCurrSectionInMarkdown(sectionId);
    setMarkdown(
      editableSections.filter((sec) => sec.id === sectionId)[0].markdown
    );
  };

  const handleSectionReset = (e, sectionId) => {
    let updatedEditableSections = editableSections;
    updatedEditableSections = updatedEditableSections.map((sec) => {
      if (sec.id !== sectionId) {
        return sec;
      }
      return initialData.sections[sectionId];
    });
    setMarkdown(initialData.sections[sectionId]);
    setEditableSections(updatedEditableSections);
    localStorage.setItem(
      "editable-sections",
      JSON.stringify(updatedEditableSections)
    );
  };

  useEffect(() => {
    let newSections = Array.from(editableSections);
    const newUnusedSections = data.sectionsOrdering.filter(
      (sectionId) => newSections.map((sec) => sec.id).indexOf(sectionId) === -1
    );
    setData({
      ...data,
      sectionsOrdering: newUnusedSections,
    });

    setMarkdown(editableSections[0].markdown);
    setCurrSectionInMarkdown(editableSections[0].id);

    setTotalMarkdown(newSections.map((section) => section.markdown).join(" "));
  }, []);

  useEffect(() => {
    // console.log("component did update:", { markdownValue, editableSections });
    setMarkdown(
      editableSections.filter((sec) => sec.id === currSectionInMarkdown)[0]
        .markdown
    );
  });

  useEffect(() => {
    let newSections = Array.from(editableSections);
    newSections = newSections.map((sec) => {
      if (sec.id !== currSectionInMarkdown) {
        return sec;
      }
      return { ...sec, markdown: markdownValue };
    });

    setEditableSections(newSections);
    setMarkdown(
      newSections.filter((sec) => sec.id === currSectionInMarkdown)[0].markdown
    );
    setTotalMarkdown(newSections.map((section) => section.markdown).join(" "));

    localStorage.setItem("editable-sections", JSON.stringify(newSections));
  }, [markdownValue]);

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId && // dragged from and dropped in same context
      destination.index === source.indx // at same location
    ) {
      // no need for any changes
      return;
    }

    const newSections = Array.from(editableSections);

    newSections.splice(source.index, 1); //from the given index, remove 1 item from the array
    newSections.splice(
      destination.index,
      0,
      ...editableSections.filter((curr) => curr.id === draggableId)
    ); // at destination index, add the draggableId (which is the taskId)

    setEditableSections(newSections);

    const newUnusedSections = data.sectionsOrdering.filter(
      (sectionId) => newSections.map((sec) => sec.id).indexOf(sectionId) === -1
    );
    setData({
      ...data,
      sectionsOrdering: newUnusedSections,
    });

    setMarkdown(newSections[destination.index].markdown);
    setCurrSectionInMarkdown(newSections[destination.index].id);
    setTotalMarkdown(newSections.map((section) => section.markdown).join(" "));

    return;
  };
  return (
    <>
      <Container>
        <DragDropContext
          onDragEnd={handleDragEnd}
          // onDragStart={handleDragStart}
          // onDragUpdate={handleDragUpdate}
        >
          <Typography variant="caption" component="div" gutterBottom>
            Click on a section below to edit the contents
          </Typography>
          <Column
            sections={editableSections}
            handleSectionClick={handleSectionClick}
            handleSectionReset={handleSectionReset}
          />
        </DragDropContext>
        <Typography variant="caption" component="div" gutterBottom>
          Click on a section below to add it to your readme
        </Typography>
        <SectionList>
          {Array.from(
            data.sectionsOrdering.map((sectionId) => data.sections[sectionId])
          ).map((section) => (
            <CardWrapper
              key={section.id}
              onClick={(e) => {
                const newSections = Array.from(editableSections);
                newSections.push(section);
                setEditableSections(newSections);

                const newUnusedSections = data.sectionsOrdering.filter(
                  (sectionId) =>
                    newSections.map((sec) => sec.id).indexOf(sectionId) === -1
                );
                setData({
                  ...data,
                  sectionsOrdering: newUnusedSections,
                });

                setMarkdown(section.markdown);
                setCurrSectionInMarkdown(section.id);
                setTotalMarkdown(
                  newSections.map((section) => section.markdown).join(" ")
                );
              }}
            >
              <Typography
                variant="subtitle1"
                component="div"
                gutterBottom
                sx={{ paddingLeft: 1 }}
              >
                {section.title}
              </Typography>
            </CardWrapper>
          ))}
        </SectionList>
      </Container>
    </>
  );
};

export default SectionsColumn;
