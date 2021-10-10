import {ExponentialDistribution} from "./distributions/ExponentialDistribution";
import { randomInt } from 'mathjs'

const distribution = new ExponentialDistribution();
const parameter = randomInt(1, 50);
document.writeln(parameter.toString());
distribution.generate(10000, parameter);
distribution.getFunctionValue(1);
document.writeln(distribution.dispersion.toString());
document.writeln(distribution.mean.toString());
