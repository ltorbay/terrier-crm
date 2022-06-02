import dynamic from "next/dynamic";
const DefaultError = dynamic<any>(
    () => import("next/error"),
    {ssr: false}
);

export default function Error({errorCode}: { errorCode: number }) {
    return <DefaultError statusCode={errorCode}/>
}