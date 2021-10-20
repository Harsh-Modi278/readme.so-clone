const initialData = {
  sections: {
    "section-1": {
      id: "section-1",
      title: "Title and Description",
      markdown: `
# Project Title

A brief description of what this project does and who it's for`,
    },
    "section-2": {
      id: "section-2",
      title: "Demo",
      markdown: `
## Demo

Insert gif or link to demo`,
    },
    "section-3": {
      id: "section-3",
      title: "Deployment",
      markdown: `
## Deployment

To deploy this project run

\`\`\`bash
npm run deploy
\`\`\`  `,
    },
    "section-4": {
      id: "section-4",
      title: "Contributing",
      markdown: `
## Contributing

Contributions are always welcome!

See \`contributing.md\` for ways to get started.

Please adhere to this project's \`code of conduct\`.`,
    },
    "section-5": {
      id: "section-5",
      title: "Screenshots",
      markdown: `
## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)`,
    },
    "section-6": {
      id: "section-6",
      title: "Environmental variables",
      markdown: `
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

\`API_KEY\`

\`ANOTHER_API_KEY\``,
    },
    "section-7": {
      id: "section-7",
      title: "Run locally",
      markdown: `        
## Run Locally

Clone the project

\`\`\`bash
git clone https://link-to-project
\`\`\`

Go to the project directory

\`\`\`bash
cd my-project
\`\`\`

Install dependencies

\`\`\`bash
npm install
\`\`\`

Start the server

\`\`\`bash
npm run start
\`\`\``,
    },
    "section-8": {
      id: "section-8",
      title: "Tech",
      markdown: `
## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express            `,
    },
    "section-9": {
      id: "section-9",
      title: "Installation",
      markdown: `
## Installation

Install my-project with npm

\`\`\`bash
npm install my-project
cd my-project
\`\`\``,
    },
  },
  sectionsOrdering: [
    "section-1",
    "section-2",
    "section-3",
    "section-4",
    "section-5",
    "section-6",
    "section-7",
    "section-8",
    "section-9",
  ],
};

export default initialData;
