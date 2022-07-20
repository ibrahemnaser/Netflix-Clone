import { ArrowBackOutlined } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import "./watch.scss";

export default function Watch() {
  const location = useLocation();
  const movie = location.state.movie;
  return (
    <div className="watch">
      <div className="back">
        <Link to="/home">
          <ArrowBackOutlined />
          Home
        </Link>
      </div>
      <video
        className="video"
        autoPlay
        progress="true"
        controls
        src={movie.video}
      />
    </div>
  );
}
