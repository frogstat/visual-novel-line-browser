import {useEffect, useRef, useState} from "react";
import type {ContextView} from "../utils/types.ts";

const before = 49;
const after = 50;


export function useContextView(linesLength: number) {

    const [contextView, setContextView] = useState<ContextView | null>(null);

    const originLineRef = useRef<HTMLDivElement>(null);
    const contextMenuRef = useRef<HTMLDivElement>(null);



    function showContextView(originIndex: number) {
        setContextView({
            originIndex: originIndex,
            centerIndex: originIndex,
            results: getContext(linesLength, originIndex)
        });
    }

    function navigateContextView(delta: number) {
        if (!contextView) {
            return;
        }

        const newCenterView = contextView.centerIndex + delta;

        const newContextView: ContextView = {
            originIndex: contextView.originIndex,
            centerIndex: newCenterView,
            results: getContext(linesLength, newCenterView)
        }

        setContextView(newContextView);
    }

    function closeContext() {
        setContextView(null);
    }

    useEffect(() => {
        if (!contextView) {
            return;
        }

        if (originLineRef.current) {
            originLineRef.current.scrollIntoView({
                block: "center",
                behavior: "auto"
            });
        } else if (contextMenuRef.current) {
            contextMenuRef.current.scrollTop = 0;
        }


    }, [contextView]);

    return {
        contextView,
        showContextView,
        closeContext,
        navigateContextView,
        originLineRef,
        contextMenuRef
    }

}

export function getContext(linesLength: number, originIndex: number) {
    const start = Math.max(0, originIndex - before);
    const end = Math.min(linesLength, start + before + after);

    const results: number[] = [];
    for (let i = start; i < end; i++) {
        results.push(i);
    }
    return results
}