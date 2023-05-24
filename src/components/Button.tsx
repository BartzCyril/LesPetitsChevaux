type Button = {
    handleStart: () => void,
    buttonText: string;
}

export function Button({handleStart, buttonText}: Button) {

    return (
        <div>
            <button className="text-center bg-slate-800 p-3 text-white font-bold rounded-md" onClick={handleStart}>
                {buttonText}
            </button>
        </div>
    );
}