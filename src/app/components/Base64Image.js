import Image from "next/image";
import {useEffect, useState} from "react";

const Base64Image = ({promise, src}) => {
    const [width, setWidth] = useState(50);
    const [height, setHeight] = useState(50);
    const [source, setSource] = useState(src);

    useEffect(() => {
        const fetchBase64String = async () => {
            try {
                const result = await promise;
                setSource(result.src);
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
            {(source && source.toString().startsWith("https://")) && (
                <img
                    className={"top-0 left-0 rounded-full"}
                    src={source}
                    alt="image"
                    height={width}
                    width={height}
                />
            )}
            {(source && !source.toString().startsWith("https://")) && (
                <img
                    className="rounded-full"
                    src={`data:image/jpeg;base64,${source}`}
                    alt="image"
                    width={width}
                    height={height}
                />
            )}
        </div>
    );
};

export default Base64Image;