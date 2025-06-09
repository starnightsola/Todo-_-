import { useEffect, useState, useCallback } from 'react';
import { useTaskContext } from '../context/useTaskContext';

export const useCards = () => {
  // 1. 日付ごとのカード（表示）管理
  const [cards, setCards] = useState<string[]>([]);
  // 追加されたカード（日付文字列）の配列

  const [newDate, setNewDate] = useState('');
  // ユーザーが <Input type="date" /> で選んだ日付（1枚追加する用）
  // 初期値は空文字列 '' です。

  // 2. ローカルストレージからカードを読み込む
  // localStorage から cards を読み込み
  useEffect(() => {
    const stored = localStorage.getItem('cards');
    if (stored) {
      setCards(JSON.parse(stored));
    }
  }, []);

  // 3. カードの変更をローカルストレージに保存
  // cards が変わるたびに保存
  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

  // 4. 新しいカード（日付）を追加（重複は無視）
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

  // 5. UIからカードを削除（cards 配列から）
  const { dispatch } = useTaskContext();

  const deleteCardByDate = useCallback(
    (targetDate: string) => {
      console.log('🗑️ カード削除', { date: targetDate });
      setCards((prev) => prev.filter((d) => d !== targetDate));
      dispatch({ type: 'deleteCard', payload: { date: targetDate } });
    },
    [dispatch]
  );

  return {
    cards,
    setCards,
    newDate,
    setNewDate,
    addCard,
    deleteCardByDate,
  };
};
