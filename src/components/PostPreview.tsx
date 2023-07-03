import Link from "next/link";
import {PostMetadata} from "@/interface/PostMetaData";
import Image from "next/image";

const PostPreview = (props: PostMetadata) => {
    return (
        <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <Link href={`/posts/${props.slug}`}>
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.title}</h2>
            </Link>
            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">{props.subtitle}</p>
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Image width={0} height={0} src="./img/me.jpg" alt="Image de cyril bartz" className="w-7 h-7 rounded-full"/>
                    <span className="font-medium dark:text-white">
                          Cyril BARTZ
                      </span>
                </div>
                <Link href={`/posts/${props.slug}`}>
                    <div className="flex items-center">
                        <h3>En savoir plus</h3>
                        <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            ></path>
                        </svg>
                    </div>
                </Link>
            </div>
        </article>
    )
};

export default PostPreview;