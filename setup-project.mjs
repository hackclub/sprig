import { execSync } from "child_process";

const projectId = "PVT_kwHOBMVTAs4BZ4Sq";

// get token
const token = execSync("gh auth token").toString().trim();

async function runGraphQL(query, variables) {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}

async function createField(name, type, options = null) {
  let query = `
    mutation($projectId: ID!, $dataType: ProjectV2CustomFieldType!, $name: String!, $options: [ProjectV2SingleSelectFieldOptionInput!]) {
      createProjectV2Field(input: {
        projectId: $projectId,
        dataType: $dataType,
        name: $name,
        singleSelectOptions: $options
      }) {
        projectV2Field {
          ... on ProjectV2Field { id name }
          ... on ProjectV2SingleSelectField { id name }
        }
      }
    }
  `;

  if (!options) {
    query = `
      mutation($projectId: ID!, $dataType: ProjectV2CustomFieldType!, $name: String!) {
        createProjectV2Field(input: {
          projectId: $projectId,
          dataType: $dataType,
          name: $name
        }) {
          projectV2Field {
            ... on ProjectV2Field { id name }
          }
        }
      }
    `;
  }

  const variables = { projectId, dataType: type, name, options };
  console.log(`Creating field: ${name}...`);
  try {
    const res = await runGraphQL(query, variables);
    if (res.errors) {
       console.error(`GraphQL Error on ${name}:`, JSON.stringify(res.errors));
    } else {
       console.log("Success:", res.data);
    }
  } catch (err) {
    console.error(`Failed to create ${name}: ${err.message}`);
  }
}

async function main() {
  const states = [
    { name: "Ready for Playtest", description: "Reviewer playtest needed", color: "PURPLE" },
    { name: "Needs Author", description: "Waiting on author", color: "YELLOW" },
    { name: "Ready for Maintainer", description: "Awaiting final maintainer review", color: "BLUE" },
    { name: "Claimed", description: "Currently claimed by a reviewer", color: "ORANGE" },
    { name: "Stale", description: "Inactive for over 30 days", color: "RED" },
    { name: "Merged", description: "PR Merged", color: "GREEN" },
    { name: "Closed", description: "PR Closed", color: "GRAY" },
    { name: "Verified", description: "Playtested successfully", color: "GREEN" },
    { name: "Unsorted", description: "Newly opened or unsure", color: "GRAY" }
  ];

  await createField("Review State", "SINGLE_SELECT", states);
  await createField("Next Action", "TEXT");
  await createField("Triager", "TEXT");
  await createField("Age Days", "NUMBER");
  await createField("Play Link", "TEXT");
  await createField("Raw Link", "TEXT");
  await createField("Review Decision", "TEXT");
  await createField("Triage Note", "TEXT");

  console.log("Done creating fields!");
}

main();
