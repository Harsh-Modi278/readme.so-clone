import React, { useState } from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Section from "./Section";

const SectionList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  flex-grow: 1;
`;

const Column = (props) => {
  const {
    sections,
    handleSectionClick,
    handleSectionReset,
    handleSectionDelete,
    setEditorVisible,
  } = props;
  const [sectionIdClicked, setSectionIDClicked] = useState("section-1");
  return (
    <Droppable droppableId="sections">
      {(provided, snapshot) => (
        <SectionList
          ref={provided.innerRef}
          {...provided.droppableProps}
          isDragginOver={snapshot.isDraggingOver}
        >
          {Array.from(sections).map((section, index) => (
            <Section
              section={section}
              index={index}
              key={section.id}
              handleSectionClick={handleSectionClick}
              setSectionIDClicked={setSectionIDClicked}
              sectionIdClicked={sectionIdClicked}
              handleSectionReset={handleSectionReset}
              handleSectionDelete={handleSectionDelete}
              setEditorVisible={setEditorVisible}
            />
          ))}
          {provided.placeholder}
        </SectionList>
      )}
    </Droppable>
  );
};

export default Column;
