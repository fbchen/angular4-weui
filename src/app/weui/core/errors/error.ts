// TODO(kara): Revisit why error messages are not being properly set.

/**
 * Wrapper around Error that sets the error message.
 * @docs-private
 */
export class WeUIError extends Error {
    constructor(value: string) {
        super();
        this.message = value;
    }
}
