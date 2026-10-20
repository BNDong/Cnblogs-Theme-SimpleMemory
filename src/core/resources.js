const registries = new WeakMap();
const intervalOwners = new Map();
const timeoutOwners = new Map();

export function clearIntervalTimeId(id) {
    if (id == null) return;
    const release = intervalOwners.get(id);
    if (release) release();
    window.clearInterval(id);
}

export function clearTimeoutTimeId(id) {
    if (id == null) return;
    const release = timeoutOwners.get(id);
    if (release) release();
    window.clearTimeout(id);
}

export default function resources(_) {
    if (registries.has(_)) return registries.get(_);
    const cleanups = new Set();
    let disposed = false;

    function add(cleanup) {
        if (disposed) {
            cleanup();
            return () => {};
        }
        cleanups.add(cleanup);
        return () => cleanups.delete(cleanup);
    }

    function timer(kind, callback, delay, args) {
        if (disposed) return null;
        const owners = kind === 'interval' ? intervalOwners : timeoutOwners;
        const clear = kind === 'interval' ? clearIntervalTimeId : clearTimeoutTimeId;
        let id;
        const handler = kind === 'timeout' && typeof callback === 'function'
            ? function (...values) {
                const release = owners.get(id);
                if (release) release();
                if (!disposed) return callback.apply(this, values);
            }
            : callback;
        id = kind === 'interval'
            ? window.setInterval(handler, delay, ...args)
            : window.setTimeout(handler, delay, ...args);
        const unregister = add(() => clear(id));
        owners.set(id, () => {
            unregister();
            owners.delete(id);
        });
        return id;
    }

    const registry = {
        add,
        interval: (callback, delay, ...args) => timer('interval', callback, delay, args),
        timeout: (callback, delay, ...args) => timer('timeout', callback, delay, args),
        clearInterval: clearIntervalTimeId,
        clearTimeout: clearTimeoutTimeId,
        on(target, type, handler, options) {
            if (disposed) return;
            target.addEventListener(type, handler, options);
            add(() => target.removeEventListener(type, handler, options));
        },
        onJQuery(target, ...args) {
            if (disposed) return target;
            target.on(...args);
            add(() => target.off(...args));
            return target;
        },
        subscribe(handlers, callback) {
            if (disposed) return;
            handlers.push(callback);
            add(() => {
                const index = handlers.indexOf(callback);
                if (index !== -1) handlers.splice(index, 1);
            });
        },
        frame(callback) {
            if (disposed) return null;
            let unregister;
            const id = window.requestAnimationFrame(time => {
                unregister();
                if (!disposed) callback(time);
            });
            unregister = add(() => window.cancelAnimationFrame(id));
            return id;
        },
        dispose() {
            if (disposed) return;
            disposed = true;
            Object.keys(_.__timeIds || {}).forEach(key => clearIntervalTimeId(_.__timeIds[key]));
            // 单项清理失败不应中断其余资源释放。
            const errors = [];
            Array.from(cleanups).reverse().forEach(cleanup => {
                try { cleanup(); } catch (error) { errors.push(error); }
            });
            cleanups.clear();
            errors.forEach(error => console.error('SimpleMemory cleanup', error));
        },
    };
    registries.set(_, registry);
    return registry;
}
