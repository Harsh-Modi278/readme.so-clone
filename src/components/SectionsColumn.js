import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import initialData from "../initial-data";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import CachedIcon from "@mui/icons-material/Cached";

const Container = styled.div`
  margin-left: 15px;
  margin-right: 15px;
  border-radius: 2px;
  width: 25vw;
  height: 80vh;
  background-color: inherit;
  display: flex;
  flex-direction: column;
  align-items: space-between;

  overflow: scroll;
`;

const IconWrapper = styled.div`
  display: flex;
  &:hover {
    cursor: pointer;
  }
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
  const { setMarkdown, setTotalMarkdown, markdownValue, setEditorVisible } =
    props;
  const [currSectionInMarkdown, setCurrSectionInMarkdown] =
    useState("section-1");
  const [data, setData] = useState(initialData);
  const [editableSections, setEditableSections] = useState(
    localStorage.getItem("editable-sections")
      ? [...JSON.parse(localStorage.getItem("editable-sections"))]
      : [initialData.sections["section-1"]]
  );
  const firstUpdate = useRef(true);

  const handleSectionClick = (e, sectionId) => {
    // set markdown in editor to the clicked section's (with 'sectionId') markdown
    setCurrSectionInMarkdown(sectionId);
    setMarkdown(
      editableSections.filter((sec) => sec.id === sectionId)[0].markdown
    );
  };

  const handleSectionReset = (e, sectionId) => {
    console.log(sectionId);
    let updatedEditableSections = editableSections;
    updatedEditableSections = updatedEditableSections.map((sec) => {
      if (sec.id !== sectionId) {
        return sec;
      }
      return initialData.sections[sectionId];
    });
    setEditableSections(updatedEditableSections);
    setMarkdown(initialData.sections[sectionId]);
    localStorage.setItem(
      "editable-sections",
      JSON.stringify(updatedEditableSections)
    );
  };

  const handleSectionDelete = (e, sectionId) => {
    let updatedEditableSections = editableSections;
    updatedEditableSections = updatedEditableSections.filter(
      (sec) => sec.id !== sectionId
    );
    setTotalMarkdown(
      updatedEditableSections.map((section) => section.markdown).join("\n")
    );

    setEditableSections(updatedEditableSections);
    localStorage.setItem(
      "editable-sections",
      JSON.stringify(updatedEditableSections)
    );
    setCurrSectionInMarkdown("");
    setEditorVisible(false);

    const newUnusedSections = data.sectionsOrdering.filter(
      (sectionId) =>
        updatedEditableSections.map((sec) => sec.id).indexOf(sectionId) === -1
    );
    newUnusedSections.push(data.sections[sectionId].id);

    newUnusedSections.sort((secId1, secId2) => {
      const secTitle1 = data.sections[secId1].title;
      const secTitle2 = data.sections[secId2].title;
      return secTitle1 < secTitle2 ? -1 : 1;
    });
    setData({
      ...data,
      sectionsOrdering: newUnusedSections,
    });
  };

  useEffect(() => {
    let newSections = Array.from(editableSections);

    const newUnusedSections = data.sectionsOrdering.filter(
      (sectionId) => newSections.map((sec) => sec.id).indexOf(sectionId) === -1
    );
    newUnusedSections.sort((secId1, secId2) => {
      const secTitle1 = data.sections[secId1].title;
      const secTitle2 = data.sections[secId2].title;
      return secTitle1 < secTitle2 ? -1 : 1;
    });
    setData({
      ...data,
      sectionsOrdering: newUnusedSections,
    });
    if (
      newSections.filter((sec) => sec.id === currSectionInMarkdown).length > 0
    ) {
      setMarkdown(
        newSections.filter((sec) => sec.id === currSectionInMarkdown)[0]
          .markdown
      );
      setCurrSectionInMarkdown(
        newSections.filter((sec) => sec.id === currSectionInMarkdown)[0].id
      );
    } else {
      setEditorVisible(false);
    }

    setTotalMarkdown(newSections.map((section) => section.markdown).join("\n"));
  }, []);

  useEffect(() => {
    const currSection = editableSections.filter(
      (sec) => sec.id === currSectionInMarkdown
    );
    if (currSection.length > 0) {
      setMarkdown(currSection[0].markdown);
    } else {
      setEditorVisible(false);
    }
  });

  useEffect(() => {
    if (firstUpdate.current) {
      // skipping the first update
      firstUpdate.current = false;
      return;
    }
    let newSections = Array.from(editableSections);

    newSections = newSections.map((sec) => {
      if (sec.id !== currSectionInMarkdown) {
        return sec;
      }
      return { ...sec, markdown: markdownValue };
    });

    if (
      newSections.filter((sec) => sec.id === currSectionInMarkdown).length > 0
    ) {
      setMarkdown(
        newSections.filter((sec) => sec.id === currSectionInMarkdown)[0]
          .markdown
      );
    } else {
      setEditorVisible(false);
    }
    setTotalMarkdown(newSections.map((section) => section.markdown).join("\n"));
    setEditableSections(newSections);

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
    newUnusedSections.sort((secId1, secId2) => {
      const secTitle1 = data.sections[secId1].title;
      const secTitle2 = data.sections[secId2].title;
      return secTitle1 < secTitle2 ? -1 : 1;
    });
    setData({
      ...data,
      sectionsOrdering: newUnusedSections,
    });

    setMarkdown(newSections[destination.index].markdown);
    setCurrSectionInMarkdown(newSections[destination.index].id);
    setTotalMarkdown(newSections.map((section) => section.markdown).join("\n"));

    return;
  };
  return (
    <Container>
      <div style={{ display: "flex", marginLeft: "10px", marginRight: "10px" }}>
        <h4>Sections</h4>
        <div style={{ flexGrow: 1 }}></div>
        <IconWrapper
          onClick={(e) => {
            if (
              !window.confirm(
                "All sections of your readme will be removed; to continue, click OK"
              )
            ) {
              return;
            }
            let updatedEditableSections = editableSections;
            updatedEditableSections = [];
            setTotalMarkdown(
              updatedEditableSections
                .map((section) => section.markdown)
                .join("\n")
            );

            setEditableSections(updatedEditableSections);
            localStorage.setItem(
              "editable-sections",
              JSON.stringify(updatedEditableSections)
            );
            setCurrSectionInMarkdown("");
            setEditorVisible(false);

            const newUnusedSections = initialData.sectionsOrdering;

            newUnusedSections.sort((secId1, secId2) => {
              const secTitle1 = data.sections[secId1].title;
              const secTitle2 = data.sections[secId2].title;
              return secTitle1 < secTitle2 ? -1 : 1;
            });
            setData({
              ...data,
              sectionsOrdering: newUnusedSections,
            });
          }}
        >
          <CachedIcon style={{ marginTop: "18px", marginRight: "5px" }} />
          <h4>Reset</h4>
        </IconWrapper>
      </div>
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
          handleSectionDelete={handleSectionDelete}
          setEditorVisible={setEditorVisible}
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
              // TODO: save previous values of sections which were once used then deleted in local storage. Use those values when use re-add these sections.
              newSections.push(section);
              setEditableSections(newSections);

              const newUnusedSections = data.sectionsOrdering.filter(
                (sectionId) =>
                  newSections.map((sec) => sec.id).indexOf(sectionId) === -1
              );
              newUnusedSections.sort((secId1, secId2) => {
                const secTitle1 = data.sections[secId1].title;
                const secTitle2 = data.sections[secId2].title;
                return secTitle1 < secTitle2 ? -1 : 1;
              });
              setData({
                ...data,
                sectionsOrdering: newUnusedSections,
              });

              setMarkdown(section.markdown);
              setCurrSectionInMarkdown(section.id);
              setTotalMarkdown(
                newSections.map((section) => section.markdown).join("\n")
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
  );
};

export default SectionsColumn;
