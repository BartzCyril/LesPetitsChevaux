type Props = {
    title?: string;
    content: string;
    type?: "success" | "danger" | "default";
};

export function Toast({ title, content, type = "default" }: Props) {
    return (
        <div className={`toast toast--${type}`}>
            {title && (
                <p>
                    <strong>{title}</strong>
                </p>
            )}
            <p>{content}</p>
        </div>
    );
}