import React from "react";
import { Draggable } from "react-beautiful-dnd";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

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

const HandleWrapper = styled.div`
  margin-top: 2;
  border: ${(props) => (props.isDragging ? "3px solid lightgreen" : "none")};
  border-radius: 5px;
`;

const Section = (props) => {
  const { section, index } = props;
  return (
    <Draggable draggableId={section.id} index={index} key={section.id}>
      {(provided, snapshot) => (
        <CardWrapper
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <HandleWrapper
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
          >
            <DragIndicatorIcon />
          </HandleWrapper>
          <Typography
            variant="subtitle1"
            component="div"
            gutterBottom
            sx={{ paddingLeft: 1 }}
          >
            {section.title}
          </Typography>
        </CardWrapper>
      )}
    </Draggable>
  );
};

export default Section;
