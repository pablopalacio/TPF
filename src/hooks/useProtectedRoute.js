import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../libs/firebase";

export function useProtectedRoute(requiredRole) {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUserRole(null);
        setAuthorized(false);
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const role = userDoc.data().rol;
          setUserRole(role);
          setAuthorized(role === requiredRole);
        } else {
          setUserRole(null);
          setAuthorized(false);
        }
      } catch (err) {
        console.error("Error verificando rol:", err);
        setUserRole(null);
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, [requiredRole]);

  return { userRole, authorized, loading };
}