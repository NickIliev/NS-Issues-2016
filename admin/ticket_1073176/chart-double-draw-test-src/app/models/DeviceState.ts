
class DeviceState {
    private _temperature: number
    private _ts: Date

    constructor(temperature: number, ts: Date) {
        this._temperature = temperature
        this._ts = ts
    }

    public get temperature(): number {
        return this._temperature
    }

    public set temperature(v: number) {
        this._temperature = v;
    }

    public get ts(): Date {
        return this._ts
    }

    public set ts(v: Date) {
        this._ts = v;
    }
}

export { DeviceState }