import { useEffect, useState, useCallback } from 'react';

export const useCards = () => {
  const [cards, setCards] = useState<string[]>([]);
  // 追加されたカード（日付文字列）の配列

  const [newDate, setNewDate] = useState('');
  // ユーザーが <Input type="date" /> で選んだ日付（1枚追加する用）
  // 初期値は空文字列 '' です。

  // localStorage から cards を読み込み
  useEffect(() => {
    const stored = localStorage.getItem('cards');
    if (stored) {
      setCards(JSON.parse(stored));
    }
  }, []);

  // cards が変わるたびに保存
  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

  const addCard = () => {
    if (!newDate || cards.includes(newDate)) return;
    // 入力が空、またはすでに同じ日付が追加済みなら何もしない（return）
    // newDate === ''（空）→ !'' → true
    // Array.prototype.includes() は、配列の中に特定の値が含まれているかどうかをチェックするためのメソッド

    // カード追加＋ソート（昇順）
    const updated = [...cards, newDate].sort();
    setCards(updated);
    setNewDate('');
  };

  // 関数をメモ化
  const handleRemoveCard = useCallback(
    (target: string) => {
      setCards((prev) => prev.filter((d) => d !== target));
    },
    [] // または [cards]、依存に応じて
  );

  return { cards, newDate, setNewDate, addCard, handleRemoveCard };
};
