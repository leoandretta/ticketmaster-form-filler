import { createStore, type StoreApi } from "zustand";
import { persist } from "zustand/middleware";

type StoreState<T> = {
    items: T[],
    setItems: (items: T[]) => void;
}

class StoredList<T>
{
    private store: StoreApi<StoreState<T>>

    constructor(starting_items: T[] = [])
    {
        this.store = createStore<StoreState<T>>()(
            persist(
                (set) => ({
                    items: starting_items,
                    setItems: (items) => set({ items })
                }),
                {
                    name: 'ticketmaster-form-profiles',
                    storage: {
                        getItem: (key) => {
                            const value = localStorage.getItem(key);
                            return value ? JSON.parse(value) : null;
                        },
                        setItem: (key, value) => {
                            localStorage.setItem(key, JSON.stringify(value));
                        },
                        removeItem: (key) => {
                            localStorage.removeItem(key);
                        }
                    }

                }
            )
        )
    }
    
    public list = (): T[] => this.store.getState().items

    public add = (item: T): void => this.store.getState().setItems([...this.list(), item])

    public remove = (index: number): void => this.store.getState().setItems(this.list().filter((_, i) => index !== i))

    public clear = (): void => this.store.getState().setItems([]);

    public getStore = (): StoreApi<StoreState<T>> => this.store;
}

export default StoredList