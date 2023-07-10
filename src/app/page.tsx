import BlogPage from "@/app/blog";
import {Game} from "@/components/Game";
import {ToastContextProvider} from "@/components/ToastContext";
import {ProgressGame} from "@/components/ProgressGame";
import {Summary} from "@/components/Summary";

function Page() {

    return (
        <>
            <ToastContextProvider>
                <Game/>
            </ToastContextProvider>
            <ProgressGame/>
            <Summary/>
            <BlogPage/>
        </>
    )
}

export default Page