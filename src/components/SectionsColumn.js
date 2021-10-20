import React, { useState } from "react";
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
  const [data, setData] = useState(initialData);

  const handleDragStart = (start) => {
    console.log(start);
  };

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

    const newSectionIds = Array.from(data.sectionsOrdering);

    newSectionIds.splice(source.index, 1); //from the given index, remove 1 item from the array
    newSectionIds.splice(destination.index, 0, draggableId); // at destination index, add the draggableId (which is the taskId)

    const newState = {
      ...data,
      sectionsOrdering: newSectionIds,
    };

    setData(newState);
    return;
  };
  return (
    <>
      <Container>
        <DragDropContext
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          // onDragUpdate={handleDragUpdate}
        >
          <Typography variant="caption" component="div" gutterBottom>
            Click on a section below to edit the contents
          </Typography>
          <Column
            sections={data.sectionsOrdering.map(
              (sectionId) => data.sections[sectionId]
            )}
          />
        </DragDropContext>
        <Typography variant="caption" component="div" gutterBottom>
          Click on a section below to add it to your readme
        </Typography>
        <SectionList>
          {Array.from(
            data.sectionsOrdering.map((sectionId) => data.sections[sectionId])
          ).map((section) => (
            <CardWrapper key={section.id}>
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
