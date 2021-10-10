import {Distribution} from "./Distribution";
import {log, random, mean, variance, pow, e, divide} from 'mathjs'

export class ExponentialDistribution extends Distribution{
    public generate(amount:number, lambda:number) {
        for (let i = 0; i < amount; i++) {
            this.numbers.push(this.getSpecifiedExpression(lambda))
        }
    }

    private getSpecifiedExpression(lambda: number) {
        return -log(random(0, 1)) / lambda
    }

    public getFunctionValue(x: number):number {
        this._mean = mean(...this.numbers);
        this._dispersion = variance(...this.numbers);
        const lambda = this.getLambda();
        return 1 - Number(pow(e, -x * lambda));
    }

    private getLambda() {
        return divide(divide(1, this.mean) + divide(1, this.dispersion), 2);
    }
}