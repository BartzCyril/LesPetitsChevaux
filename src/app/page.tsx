import BlogPage from "@/app/blog";
import {Game} from "@/components/Game";
import {ToastContextProvider} from "@/components/ToastContext";
import {ProgressGame} from "@/components/ProgressGame";

function Page() {

    return (
        <>
            <ToastContextProvider>
                <Game/>
            </ToastContextProvider>
                <ProgressGame/>
                <BlogPage/>
        </>
    )
}

export default Page