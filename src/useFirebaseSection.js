"use client";

import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "./firebase";

const db = getDatabase(app);

export function useFirebaseSection(sectionName, initialItems = []) {
  const [items, setItems] = useState(() => initialItems || []);
  const [loading, setLoading] = useState(() => !(initialItems || []).length);

  useEffect(() => {
    if (!sectionName) return;

    const sectionRef = ref(db, `Pages/${sectionName}`);
    setLoading((initialItems || []).length === 0);

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
