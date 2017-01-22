import { compose } from "./combinator";

export namespace Map {
    export const empty = () => null;

    export const set = (key: string, value: any) =>
        (obj: (key: string) => any) =>
            (queryKey: string) =>
                key === queryKey ?
                    value :
                    Map.get(queryKey)(obj);

    export const get = (key: string) =>
        (obj: (key: string) => any) =>
            obj(key);
}

