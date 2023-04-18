/** @format */
export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
}

export type DeezerRequestBody = {
  payload: {
    method: HttpMethod;
    url: string;
  };
};

export type YouTubeRequestBody = {
  type: "Mp3";
  payload: {
    query: string;
  };
};

export type BackendRequestBody = DeezerRequestBody | YouTubeRequestBody;
export type Routes = {
  name: string;
  path: string;
};
