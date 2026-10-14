import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "pups-vines-favorites";

function loadFavorites(): Set<number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return new Set(parsed as number[]);
  } catch {}
  return new Set();
}

function saveFavorites(favorites: Set<number>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites]));
  } catch {}
}

let sharedFavorites: Set<number> = loadFavorites();
const listeners = new Set<(snap: Set<number>) => void>();

function notify() {
  listeners.forEach((cb) => cb(sharedFavorites));
}

function toggleShared(id: number) {
  const next = new Set(sharedFavorites);
  if (next.has(id)) {
    next.delete(id);
  } else {
    next.add(id);
  }
  sharedFavorites = next;
  saveFavorites(sharedFavorites);
  notify();
}

export function useFavorites() {
  const [snapshot, setSnapshot] = useState<Set<number>>(sharedFavorites);

  useEffect(() => {
    const cb = (snap: Set<number>) => setSnapshot(snap);
    listeners.add(cb);
    return () => { listeners.delete(cb); };
  }, []);

  const isFavorite = useCallback((id: number) => snapshot.has(id), [snapshot]);
  const toggleFavorite = useCallback((id: number) => toggleShared(id), []);

  return { isFavorite, toggleFavorite, favoriteIds: snapshot };
}
