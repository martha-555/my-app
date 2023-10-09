import { HttpMethod } from "../feautures/api/types";

type Props = {
    path: string;
    parser: Function;
    request: Function
}

const nextTracksRequest = ({ path, parser, request }: Props) => {
    const makeNextRequest = async () => {
     const tracks = await request({
            payload: {
              method: HttpMethod.GET, 
              url: `${path}${
                path.includes("?") ? "&" : "?"
              }`,
            },
          },
          parser);
          return tracks
    }
  return  makeNextRequest()
}

export default nextTracksRequest;