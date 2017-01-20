import {Cons, Empty, head, tail} from "./list";

console.log(head(new Cons(1, new Cons(2, new Empty()))));
console.log(head(new Empty()));

