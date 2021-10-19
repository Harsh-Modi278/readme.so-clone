import styled from "styled-components";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

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
`;
const Title = styled.h3`
  padding: 8px;
`;

const SectionList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDragginOver ? "skyblue" : "inherit")};
  flex-grow: 1;
  overflow: scroll;
`;

const sectionsColumn = (props) => {
  const { sections } = props;

  return (
    <Container>
      <SectionList>
        {Array.from(sections).map((section) => (
          <Card sx={{ marginBottom: 2 }} key={section.id}>
            <CardActionArea>
              <Typography
                variant="subtitle1"
                component="div"
                gutterBottom
                sx={{ paddingLeft: 1 }}
              >
                {section.title}
              </Typography>
            </CardActionArea>
          </Card>
        ))}
      </SectionList>
    </Container>
  );
};

export default sectionsColumn;
