import React from "react";
import { Draggable } from "react-beautiful-dnd";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteIcon from "@mui/icons-material/Delete";
import CachedIcon from "@mui/icons-material/Cached";

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
  border: ${(props) => (props.isDragging ? "3px solid lightgreen" : "none")};
  background: ${(props) => (props.isDragging ? "white" : "inherit")};

  display: flex;
`;

const IconWrapper = styled.div`
  margin-top: 3px;
  border: ${(props) => (props.isDragging ? "3px solid lightgreen" : "none")};
  border-radius: 5px;
`;

const Section = (props) => {
  const {
    section,
    index,
    handleSectionClick,
    sectionIdClicked,
    setSectionIDClicked,
    handleSectionReset,
    handleSectionDelete,
    setEditorVisible,
  } = props;
  return (
    <Draggable draggableId={section.id} index={index} key={section.id}>
      {(provided, snapshot) => (
        <CardWrapper
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          onClick={(e) => {
            // console.log("here:", e.currentTarget);
            setSectionIDClicked(section.id);
            handleSectionClick(e, section.id);
            setEditorVisible(true);
          }}
          onFocus={(e) => {
            console.log("here");
          }}
        >
          <IconWrapper
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
          >
            <DragIndicatorIcon />
          </IconWrapper>
          <Typography
            variant="subtitle1"
            component="div"
            gutterBottom
            sx={{ paddingLeft: 1 }}
          >
            {section.title}
          </Typography>
          {sectionIdClicked === section.id && (
            <>
              <div style={{ flexGrow: "1" }}></div>
              <IconWrapper
                onClick={(e) => {
                  console.log("here:", e.target);
                  handleSectionReset(e, section.id);
                }}
              >
                <CachedIcon />
              </IconWrapper>
              <IconWrapper
                onClick={(e) => {
                  handleSectionDelete(e, section.id);
                }}
              >
                <DeleteIcon />
              </IconWrapper>
            </>
          )}
        </CardWrapper>
      )}
    </Draggable>
  );
};

export default Section;
