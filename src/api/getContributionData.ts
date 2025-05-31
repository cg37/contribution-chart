import { POST } from "./common";
import { GITHUBTOKEN, GITHUBUSER } from "./env";
const TOKEN = GITHUBTOKEN;
const USER = GITHUBUSER;

const query = `
  query($userName: String!) {
    user(login: $userName) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              weekday
            }
          }
        }
      }
    }
  }
`;

const variables = {
  userName: USER
};

export const getContributionData = async () => {
  return POST({
    url: "https://api.github.com/graphql",
    data: {
      query,
      variables
    },
    config: {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    }
  })
    .then((res) => res)
    .catch((err) => Promise.reject(err));
};
