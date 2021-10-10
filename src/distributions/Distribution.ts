export abstract class Distribution {
    public numbers: number[] = [];
    protected _mean: number = -1;
    protected _dispersion: number = -1;

    constructor() {
    }

    get mean():number {
        return this._mean;
    }
    get dispersion():number {
        return this._dispersion;
    }
}