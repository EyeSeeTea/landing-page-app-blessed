import React, { useEffect, useRef } from "react";
import { useLoading } from "../loading";

const styles = {
    iframe: { width: "100%", height: 1000 },
};

export const IFrame: React.FC<IFrameProps> = ({ src, customize, builder }) => {
    const ref = useRef<HTMLIFrameElement>(null);
    const loading = useLoading({ isLoading: true });

    useEffect(() => {
        if (customize) {
            ref.current?.addEventListener("load", () => customize(ref.current, builder).then(() => loading.hide()));
        } else loading.hide();
    }, [customize, builder, loading]);

    return <iframe key={"iframe"} ref={ref} src={src} title={"IFrame"} style={styles.iframe} />;
};

export interface IFrameProps {
    src: string;
    customize?: (iframe: HTMLIFrameElement | null, builder: any) => Promise<void>;
    builder?: any;
}
