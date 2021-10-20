import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Section from "./Section";

const SectionList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  flex-grow: 1;
`;

const Column = (props) => {
  const { sections } = props;
  return (
    <Droppable droppableId="sections">
      {(provided, snapshot) => (
        <SectionList
          ref={provided.innerRef}
          {...provided.droppableProps}
          isDragginOver={snapshot.isDraggingOver}
        >
          {sections.map((section, index) => (
            <Section section={section} index={index} key={section.id} />
          ))}
          {provided.placeholder}
        </SectionList>
      )}
    </Droppable>
  );
};

export default Column;
