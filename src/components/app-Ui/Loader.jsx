import { ThreeDots } from 'react-loader-spinner'

export default function Loader() {
    return (
        <div className="flex items-center justify-center h-screen">
            <ThreeDots
                visible={true}
                height="120"
                width="120"
                color="#000"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}
