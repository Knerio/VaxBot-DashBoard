import Image from "next/image";
import {useEffect, useState} from "react";

const Base64Image = ({promise, src}) => {
    const [base64String, setBase64String] = useState("");
    const [width, setWidth] = useState(50);
    const [height, setHeight] = useState(50);

    useEffect(() => {
        const fetchBase64String = async () => {
            try {
                const result = await promise;
                setBase64String(result.src);
                setWidth(result.width);
                setHeight(result.height);
            } catch (error) {
                console.error("Error fetching base64 string:", error);
            }
        };
        fetchBase64String();
    }, [promise]);

    return (
        <div>
            {(src && src.toString().startsWith("https://")) && (
                <img
                    className={"top-0 left-0 rounded-full"}
                    src={src}
                    alt="image"
                    height={width}
                    width={height}
                />
            )}
            {(src && !src.toString().startsWith("https://")) && (
                <img
                    className="rounded-full"
                    src={`data:image/jpeg;base64,${src}`}
                    alt="image"
                    width={width}
                    height={height}
                />
            )}
            {base64String && (
                <img
                    src={`data:image/jpeg;base64,${base64String}`}
                    alt="base64 image"
                    width={width}
                    height={height}
                />
            )}
        </div>
    );
};

export default Base64Image;