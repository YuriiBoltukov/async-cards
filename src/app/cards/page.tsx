'use client';

import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { useCards } from '@/hooks/useCards';

export default function Page() {
  const { cards, loading, error, fetchCards } = useCards();

  const handleRefresh = () => {
    fetchCards();
  };

  const renderContent = () => {
    if (loading) {
      return <p>Загрузка карточек...</p>;
    }

    if (error) {
      return (
        <div className="text-red-500">
          <p>{error}</p>
          <button
            onClick={handleRefresh}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
          >
            Повторить
          </button>
        </div>
      );
    }

    const sortedCards = [...cards].sort((a, b) => {
      if (a.title === b.title) {
        return a.title.length - b.title.length;
      }
      return a.title.localeCompare(b.title);
    });

    const displayedCards = sortedCards.slice(0, 7);
    const placeholdersCount = 7 - displayedCards.length;

    return (
      <div className="flex flex-wrap justify-center gap-4">
        {displayedCards.map((card) => (
          <div
            key={card.id}
            className="flex flex-col w-48 h-48 bg-blue-100 items-center justify-center text-center"
          >
            <span>{card.title}</span>
            <span>{card.text}</span>
          </div>
        ))}
        {Array.from({ length: placeholdersCount }).map((_, index) => (
          <div
            key={`placeholder-${index}`}
            className="w-48 h-48 bg-gray-200 flex items-center justify-center text-center text-gray-500"
          >
            Пусто
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen pt-16">
      <Header onRefresh={handleRefresh} disabled={loading} />

      <main className="flex-1 flex flex-col justify-center items-center p-4">
        {renderContent()}
      </main>

      <Footer />
    </div>
  );
}
