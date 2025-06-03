export default function ErrorMessage({ message }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center p-4">
            <div
                className="max-w-md bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded relative text-center shadow-lg"
                role="alert"
                style={{ wordWrap: "break-word" }}
            >
                <strong className="font-bold block mb-1">Oops! Something went wrong.</strong>
                <span className="block">
                    {message || "Please try refreshing the page or come back later."}
                </span>
            </div>
        </div>
    );
}
