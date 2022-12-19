import axios from "axios";
import { useState } from "react";

const RIOT_API_KEY = "RGAPI-8e68ae5b-3aea-45fa-bd69-ebfd43f93f1a";
const PUUID =
  "zoHvzkJJ_yEH86LGa4O3dyrbmbTWr5aO8FMQSDw6t-x9IRDqLGiYhbIo1g2D8ig6iYPuR5DBxolrSw";

const useData = () => {
  const [matchData, setMatchData] = useState<any>([]);
  const fetchMatches = async () => {
    try {
      const response = await axios.get(
        "https://europe.api.riotgames.com/tft/match/v1/matches/by-puuid/zoHvzkJJ_yEH86LGa4O3dyrbmbTWr5aO8FMQSDw6t-x9IRDqLGiYhbIo1g2D8ig6iYPuR5DBxolrSw/ids?start=0&count=5",
        { params: { api_key: RIOT_API_KEY } }
      );
      fetchMatchData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchMatchData = async (matches: string[]) => {
    let promises: any[] = [];
    matches.forEach((matchId: any) => {
      promises.push(
        axios.get(
          `https://europe.api.riotgames.com/tft/match/v1/matches/${matchId}`,
          { params: { api_key: RIOT_API_KEY } }
        )
      );
    });
    Promise.all(promises).then((res) => {
      res.forEach((response) => {
        setMatchData((data: any) => [...data, response.data]);
        console.log(response.data);
      });
    });
  };
  return { matchData, fetchMatches };
};

export default useData;
