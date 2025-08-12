import {
    createContext,
    useContext,
    useMemo,
    useState,
    ReactNode,
  } from 'react';
  
  interface FavoritedGifsContextValue {
    ids: string[];
    idsById: Record<string, boolean>;
    add: (id: string) => void;
    remove: (id: string) => void;
    toggle: (id: string) => void;
    isFavorited: (id: string) => boolean;
  }
  
  const FavoritedGifsContext = createContext<FavoritedGifsContextValue | undefined>(undefined);
  
  export function FavoritedGifsProvider({ children }: { children: ReactNode }) {
    const [ids, setIds] = useState<string[]>([]);
  
    // Build a lookup map whenever ids change.
    const idsById = useMemo(
      () =>
        ids.reduce<Record<string, boolean>>((acc, id) => {
          acc[id] = true;
          return acc;
        }, {}),
      [ids]
    );
  
    const add = (id: string) =>
      setIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  
    const remove = (id: string) =>
      setIds((prev) => prev.filter((gifId) => gifId !== id));
  
    const toggle = (id: string) =>
      setIds((prev) =>
        prev.includes(id) ? prev.filter((gifId) => gifId !== id) : [...prev, id]
      );
  
    const isFavorited = (id: string) => !!idsById[id];
  
    const value = useMemo(
      () => ({ ids, idsById, add, remove, toggle, isFavorited }),
      [ids, idsById]
    );
  
    return (
      <FavoritedGifsContext.Provider value={value}>
        {children}
      </FavoritedGifsContext.Provider>
    );
  }
  
  export function useFavoritedGifs() {
    const context = useContext(FavoritedGifsContext);
    if (!context) {
      throw new Error('useFavoritedGifs must be used within a FavoritedGifsProvider');
    }
    return context;
  }