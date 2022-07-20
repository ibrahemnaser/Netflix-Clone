import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  useEffect(() => {
    const getRandomList = async () => {
      try {
        const res = await axios.get(
          `lists${type ? `?type=${type}` : ""}${
            genre ? `&genre=${genre}` : ""
          }`,
          {
            headers: {
              token:
                "Bearers eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDQ4ZTcyZjllNzZiZWZlNzJiMjI5OCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1ODE1NzMyNSwiZXhwIjoxNjU4NTg5MzI1fQ.aTDjXOdv8G9Pnv0p1xSUJ9bugtmJEjWId1Mjgt4Bbh4",
            },
          }
        );
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomList();
  }, [type, genre]);
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} />
      {lists.map((list, indx) => (
        <List key={list._id} list={list} />
      ))}
    </div>
  );
};

export default Home;
