import { ReactElement, createContext, useState } from "react";

type TracksType = {
    selectedPage: number;
    getSelectedPage: (index:number) => number
}

export const TracksContext = createContext<TracksType>({
    selectedPage: 0,
    getSelectedPage: (index:number) => 0
})

const TracksProvider = (props: { children: ReactElement }) => {
const [selectedPage, setSelectedPage] = useState<number>(0)

return(
    <TracksContext.Provider
    value={{
    selectedPage,
    getSelectedPage: (index) => {
setSelectedPage(index);
return index
    }
    }}>
{props.children}
    </TracksContext.Provider>
)

}
export default TracksProvider;