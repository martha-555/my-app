import { ReactElement, createContext, useState } from "react";
import { TrackData } from "../../types/deezer";


type Pages = {
  splicedTracks:TrackData[][],
  // getPages: (tracks: TrackData[]) => TrackData[][]
}
export const PagesContext = createContext<Pages> ({
  splicedTracks: [],
  // getPages: (tracks) => []
  });

const PagesProvider = (props: { children: ReactElement }) => {
  const [splicedTracks, setSplicedTracks] = useState<TrackData[][]>([])

    return(
        <PagesContext.Provider value={{
          splicedTracks,
          // getPages: (tracks) => {
          //   const copyTracks = [...tracks];
          //   const spliced = getSplicedTracks(copyTracks);
          //   setSplicedTracks(spliced);
          //   return spliced
          // }
        }}
        >  {props.children}</PagesContext.Provider>
    )
}
export default PagesProvider