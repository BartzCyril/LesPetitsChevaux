'use client'

import {
    ComponentProps,
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useRef,
    useState,
} from "react";
import { Toast } from "./Toast";
import { AnimatePresence, motion } from "framer-motion";

type Params = ComponentProps<typeof Toast> & { duration?: number };
type ToastItem = {
    id: number;
    timer: ReturnType<typeof setTimeout>;
    title?: string;
    type?: "success" | "danger" | "default";
    content: string;
};

const defaultPush = (toast: Params) => {};

const defaultValue = {
    pushToastRef: { current: defaultPush },
};

const ToastContext = createContext(defaultValue);

export function ToastContextProvider({ children }: PropsWithChildren) {
    const pushToastRef = useRef(defaultPush);
    return (
        <ToastContext.Provider value={{ pushToastRef }}>
            <Toasts />
            {children}
        </ToastContext.Provider>
    );
}

export function useToasts() {
    const { pushToastRef } = useContext(ToastContext);
    return {
        pushToast: useCallback(
            (toast: Params) => {
                pushToastRef.current(toast);
            },
            [pushToastRef]
        ),
    };
}

export function Toasts() {
    const [toasts, setToasts] = useState(null as ToastItem | null);
    const { pushToastRef } = useContext(ToastContext);
    pushToastRef.current = ({ duration, ...props }: Params) => {
        const id = Date.now();
        const timer = setTimeout(() => {
            setToasts(null);
        }, (duration ?? 5) * 1000);
        const toast = { ...props, id, timer };
        setToasts(toast as ToastItem)
    };

    const onRemove = (toast: ToastItem) => {
        clearTimeout(toast.timer);
        setToasts(null);
    };
    return (
        <div className="toast-container">
            <AnimatePresence>
                {toasts && (
                    <motion.div
                        onClick={() => onRemove(toasts)}
                        key={toasts.id}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                    >
                        <Toast {...toasts} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
