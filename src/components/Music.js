import React, { useEffect, useState } from "react";
import "./music.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  InputGroup,
  Button,
  FormControl,
  Row,
  Card,
} from "react-bootstrap";

const CLIENT_ID = "4ad1ae9c4a9047f695d3bdd6de921209";
const CLIENT_SECRET = "616a11b3572d426d8cfdab73eb468bdc";

const Music = () => {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [recommendationData, setRecommendationData] = useState([]);
  useEffect(() => {
    //API ACCESS TOKEN
    let authParameters = {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };

    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((res) => res.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);
  //Search

  async function Search() {
    console.log("Search for ", searchInput);

    //Get request for Artist ID
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    const artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
      searchParameters
    )
      .then((res) => res.json())
      .then((data) => {
        return data.artists.items[0].id;
      });
    //Get request with Artist ID to grab all the albums
    const albums = await fetch(
      "https://api.spotify.com/v1/artists/" +
        artistID +
        "/albums" +
        "?include_groups=album&market=US&limit=50",
      searchParameters
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRecommendationData(data.items);
      });

    //Display those albums to the user
  }
  return (
    <div className="music">
      <div className="music__header">
        <Container>
          <InputGroup className="mb-3" size="lg">
            <FormControl
              placeholder="Search for Artists"
              type="input"
              onKeyDown={(event) => {
                if (event.key == "Enter") {
                  Search();
                }
              }}
              onChange={(event) => setSearchInput(event.target.value)}
            />
            <Button onClick={Search}>Search</Button>
          </InputGroup>
        </Container>
      </div>
      <div className="music__body">
        <Container>
          <Row className="mx-2 row row-cols-4">
            {recommendationData.length > 0 &&
              recommendationData.map((data, i) => {
                console.log(data);
                return (
                  <Card key={i}>
                    <Card.Img src={data.images[0].url} alt="Album Cover" />
                    <Card.Body>
                      <Card.Title>{data.name}</Card.Title>
                    </Card.Body>
                  </Card>
                );
              })}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Music;
