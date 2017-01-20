interface Pattern {
    add: (exp1: Expression, exp2: Expression) => number;
    mul: (exp1: Expression, exp2: Expression) => number;
    num: (num: number) => number;
}

interface Expression {
    calc(pattern: Pattern): number;
}

export class Num implements Expression {
    private num: number;

    constructor(num: number) {
        this.num = num;
    }

    calc(pattern: Pattern): number {
        return pattern.num(this.num);
    }
}

export class Add implements Expression {
    private exp1: Expression;
    private exp2: Expression;

    constructor(exp1: Expression, exp2: Expression) {
        this.exp1 = exp1;
        this.exp2 = exp2;
    }

    calc(pattern: Pattern): number {
        return pattern.add(this.exp1, this.exp2);
    }
}

export class Mul implements Expression {
    private exp1: Expression;
    private exp2: Expression;

    constructor(exp1: Expression, exp2: Expression) {
        this.exp1 = exp1;
        this.exp2 = exp2;
    }

    calc(pattern: Pattern): number {
        return pattern.mul(this.exp1, this.exp2);
    }
}


const match = <T, R>(data: Expression, pattern: Pattern) =>
    data.calc(pattern);

export const calculate = (exp: Expression) =>
    match(exp, {
        num: (n: number) => n,
        add: (expL: Expression, expR: Expression) => calculate(expL) + calculate(expR),
        mul: (expL: Expression, expR: Expression) => calculate(expL) * calculate(expR)
    });