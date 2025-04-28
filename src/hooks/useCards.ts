import { useState, useEffect, useRef, useCallback } from "react";

interface Card {
  id: string;
  title: string;
  text: string;
}

export const useCards = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchCards = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://node-test-server-production.up.railway.app/api/cards", {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error("Ошибка загрузки данных");
      }

      const data = await response.json();
      setCards(data.cards);
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setError(err.message || "Произошла ошибка");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCards();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchCards]);

  return { cards, loading, error, fetchCards };
};