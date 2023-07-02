import BlogPage from "@/app/blog";
import {Game} from "@/components/Game";
import {ToastContextProvider} from "@/components/ToastContext";

function Page() {

    return (
        <>
            <ToastContextProvider>
                <Game/>
            </ToastContextProvider>
                <BlogPage/>
        </>
    )
}

export default Page