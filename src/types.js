export type DoneFunction = (?Error) => void;
export type RunnableFunction = (?DoneFunction) => ?Promise;
