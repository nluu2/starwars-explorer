import { createContext, ReactNode, useContext } from "react";
import { RootStore } from "./RootStore";

const StoreContext = createContext<RootStore | null>(null);

interface StoreProviderProps {
    store: RootStore;
    children: ReactNode;
}

export const StoreProvider = ({ store, children }: StoreProviderProps) => (
    <StoreContext.Provider value={store}>
        {children}
    </StoreContext.Provider>
);

export const useStore = (): RootStore => {
    const store = useContext(StoreContext);
    if (!store) {
        throw new Error("useStore must be used within a StoreProvider");
    }
    return store;
};