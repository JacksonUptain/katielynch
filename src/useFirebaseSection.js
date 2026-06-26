import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import "./firebase"; // Ensure this initializes Firebase
const db = getDatabase();

export function useFirebaseSection(sectionName) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sectionName) return;

    const sectionRef = ref(db, `Pages/${sectionName}`);

    const unsubscribe = onValue(sectionRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        setItems([]);
        setLoading(false);
        return;
      }

      // Convert object -> array
      const array = Object.entries(data).map(([key, value]) => ({
        id: key,        // original key (useful!)
        ...value,       // all the fields inside
      }));

      setItems(array);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [sectionName]);

  return { items, loading };
}