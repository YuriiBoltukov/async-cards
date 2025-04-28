'use client';

interface HeaderProps {
  onRefresh: () => void;
  disabled: boolean;
}

export const Header = ({ onRefresh, disabled }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-white shadow-md flex items-center justify-between px-6 z-50">
      <h1 className="text-xl font-bold">Карточки</h1>
      <button
        onClick={onRefresh}
        disabled={disabled}
        className={`px-4 py-2 rounded-md text-white ${
          disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        Обновить
      </button>
    </header>
  );
};