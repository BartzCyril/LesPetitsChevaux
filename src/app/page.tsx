import BlogPage from "@/app/blog";
import {ColorSelector} from "@/components/ColorSelector";
import {GameBoard} from "@/components/GameBoard";

function Page() {
    return (
        <>
            <GameBoard></GameBoard>
            <BlogPage></BlogPage>
        </>
    )
}

export default Page