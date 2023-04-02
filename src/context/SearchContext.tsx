import { ReactNode, createContext, useMemo, useState } from "react";


interface SearchContextState {
  data: string;
  setData: (data:string) => void;
}

export const SearchContext = createContext<SearchContextState>({
  data: 'tashkent',
  setData: () => { }
});



const SearchContextProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<string>('');

  const value = useMemo(
    () => ({
      data, 
      setData
    }),

    //eslint-disable-next-line
    [data]
  );

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
