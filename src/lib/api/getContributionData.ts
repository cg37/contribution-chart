import { POST } from "./common";
import { AnyType } from "@/model/common";

interface IUserResponse {
  user: AnyType;
}

export const getContributionData = async (user: string, token: string) => {
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
    userName: user
  };

  return POST({
    url: "https://api.github.com/graphql",
    data: {
      query,
      variables
    },
    config: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  })
    .then((res) => res?.data as IUserResponse)
    .catch((err) => Promise.reject(err));
};
