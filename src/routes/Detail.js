import { useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
//useState

function Detail() {
  //const [detail, setDetail] = useState([]);
  const { id } = useParams();
  const getDetail = useCallback(async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json);
    //setDetail(json);

    window.location = json.data.movie.url;
  }, [id]);
  useEffect(() => {
    getDetail();
  }, [getDetail]);
  return (
    <div>
      <h1>Redirect to YTS.MX...</h1>
    </div>
  );
}
export default Detail;
