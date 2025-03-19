import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle } from "lucide-react";

const ResultAlert = ({ result }) => (
    <Alert className={`p-6 ${result.correct ? "bg-green-900/50 border border-green-700" : "bg-red-900/50 border border-red-700"}`}>
        {result.correct ? (
            <CheckCircle className="h-6 w-6 text-green-400" />
        ) : (
            <XCircle className="h-6 w-6 text-red-400" />
        )}
        <AlertTitle className="text-xl font-bold text-white ml-2">
            {result.correct ? "Correct!" : "Incorrect!"}
        </AlertTitle>
        <AlertDescription className="text-gray-300 ml-2">
            {result.message}
            {result.correct && (
                <div className="mt-2 text-lg text-green-300 font-bold">+{result.pointsEarned} points!</div>
            )}
            {!result.correct && (
                <div className="mt-2 text-lg text-amber-300 font-bold">
                    Generate a new lyric snippet to continue playing!
                </div>
            )}
        </AlertDescription>
    </Alert>
);

export default ResultAlert;