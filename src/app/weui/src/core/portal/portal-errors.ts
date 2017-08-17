import { WeUIError } from '../errors/error';

/**
 * Exception thrown when attempting to attach a null portal to a host.
 * @docs-private
 */
export class NullPortalError extends WeUIError {
    constructor() {
        super('Must provide a portal to attach');
    }
}

/**
 * Exception thrown when attempting to attach a portal to a host that is already attached.
 * @docs-private
 */
export class PortalAlreadyAttachedError extends WeUIError {
    constructor() {
        super('Host already has a portal attached');
    }
}

/**
 * Exception thrown when attempting to attach a portal to an already-disposed host.
 * @docs-private
 */
export class PortalHostAlreadyDisposedError extends WeUIError {
    constructor() {
        super('This PortalHost has already been disposed');
    }
}

/**
 * Exception thrown when attempting to attach a portal to a null host.
 * @docs-private
 */
export class NullPortalHostError extends WeUIError {
    constructor() {
        super('Attempting to attach a portal to a null PortalHost');
    }
}

/**
 * Exception thrown when attempting to detach a portal that is not attached.
 * @docs-private
 */
export class NoPortalAttachedError extends WeUIError {
    constructor() {
        super('Attempting to detach a portal that is not attached to a host');
    }
}
