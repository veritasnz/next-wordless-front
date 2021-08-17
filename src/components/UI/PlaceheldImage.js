import Image from "next/image";

export function PlaceheldImage(props) {
    const { placeholder: css, imageProps } = props;

    return (
        <>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    transform: "scale(1.5)",
                    filter: "blur(40px)",
                    ...css,
                }}
            />
            <Image {...imageProps} alt={imageProps.alt || ""} />
        </>
    );
}
