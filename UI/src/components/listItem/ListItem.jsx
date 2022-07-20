import { Link } from "react-router-dom";
import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const getMovie = async () => {
    try {
      const res = await axios.get(`/movies/find/${item}`, {
        headers: {
          token:
            "Bearers eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDQ4ZTcyZjllNzZiZWZlNzJiMjI5OCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1ODE1NzMyNSwiZXhwIjoxNjU4NTg5MzI1fQ.aTDjXOdv8G9Pnv0p1xSUJ9bugtmJEjWId1Mjgt4Bbh4",
        },
        cancelToken: source.token,
      });
      setMovie(res.data);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("successfully aborted");
      } else {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getMovie();
    return () => {
      // cancel the request before component unmounts
      source.cancel();
    };
  }, [item]);

  return (
    <Link to="/watch" state={{ movie }}>
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie.img} alt="" />
        {isHovered && (
          <>
            <video src={movie.trailer} autoPlay={true} loop muted />
            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownOutlined className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>{movie.duration}</span>
                <span className="limit">+{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className="desc">{movie.desc}</div>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
