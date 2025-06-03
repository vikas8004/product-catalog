
import { Loader } from 'lucide-react';

export default function LoadingSpinner() {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-75 z-50">
            <Loader className="animate-spin text-primary w-12 h-12" />
        </div>
    );
}
