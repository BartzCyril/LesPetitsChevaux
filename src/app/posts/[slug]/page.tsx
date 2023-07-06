import fs from "fs";
import Markdown from "markdown-to-jsx";
import matter from "gray-matter";
import getPostMetadata from "../../../components/getPostMetadata";

const getPostContent = (slug: string) => {
    const folder = "posts/";
    const file = `${folder}${slug}.md`;
    const content = fs.readFileSync(file, "utf8");
    const matterResult = matter(content);
    return matterResult;
};

export const generateStaticParams = async () => {
    const posts = getPostMetadata();
    return posts.map((post) => ({
        slug: post.slug,
    }));
};

const PostPage = (props: any) => {
    const slug = props.params.slug;
    const post = getPostContent(slug);
    return (
        <div>
            <div className="text-center">
                <h2 className="mb-8 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl md:text-3xl">{post.data.title}</h2>
            </div>

            <article className="prose">
                <Markdown>{post.content}</Markdown>
            </article>
        </div>
    );
};

export default PostPage;