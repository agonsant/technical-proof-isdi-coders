import { ErrorList, ErrorMsgs } from './errors-list';

/**
 * Class for managing general errors
 */
export class GeneralError extends Error {
    private _code: string;
    private _status: number;

    constructor(status: number, code: ErrorList, msg: ErrorMsgs) {
        super(msg);
        this._code = code;
        this._status = status;
    }

    get code(): string {
        return this._code;
    }

    get status(): number {
        return this._status;
    }

    toString(): string {
        return `Error ${this.status} ${this.code}: ${this.message}
                ${this.stack}`;
    }

    toObject(): Record<string, unknown> {
        return {
            code: this.code,
            msg: this.message
        };
    }

}