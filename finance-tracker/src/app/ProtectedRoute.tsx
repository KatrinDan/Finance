import { onAuthStateChanged } from "firebase/auth";
import { useEffect, type ReactNode } from "react";
import { auth } from "../services/firebase";

type Props = { children: ReactNode };

export default function ProtectedRoute({ children }: Props) {
    useEffect(() => {
        console.log("ProtectedRoute mounted");
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("currentUser", currentUser);
        });
        return () => unsubscribe();
    }, []);

    return <>{children}</>;
}