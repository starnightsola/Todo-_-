import { useEffect, useState, useCallback } from 'react';
import type { Task } from '../types';

export const useCards = () => {
  // ① 日付ごとのカード（表示）管理
  const [cards, setCards] = useState<string[]>([]);
  // 追加されたカード（日付文字列）の配列

  const [newDate, setNewDate] = useState('');
  // ユーザーが <Input type="date" /> で選んだ日付（1枚追加する用）
  // 初期値は空文字列 '' です。

  // ② ローカルストレージからカードを読み込む
  // localStorage から cards を読み込み
  useEffect(() => {
    const stored = localStorage.getItem('cards');
    if (stored) {
      setCards(JSON.parse(stored));
    }
  }, []);

  // ③ カードの変更をローカルストレージに保存
  // cards が変わるたびに保存
  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

  // ④ 新しいカード（日付）を追加（重複は無視）
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

  // ⑤ UIからカードを削除（cards 配列から）
  const handleRemoveCardUI = useCallback(
    (target: string) => {
      setCards((prev) => prev.filter((d) => d !== target));
    },
    [] // または [cards]、依存に応じて
  );

  // ⑥ タスク（中身）の管理
  const [tasksByDate, setTasksByDate] = useState<Record<string, Task[]>>({});

  // ⑦ 並び替え処理：日付ごとのタスクリストを更新
  const handleReorder = (date: string, newTasks: Task[]) => {
    setTasksByDate((prev) => ({
      ...prev,
      [date]: newTasks,
    }));
  };

  // ⑧ タスクデータを削除（cards UI側と連携する想定）
  const handleRemoveCardData = (date: string) => {
    setTasksByDate((prev) => {
      const newState = { ...prev };
      delete newState[date];
      return newState;
    });
  };
  // ⑨ UI とデータの削除をまとめ
  const handleRemoveCard = (date: string) => {
    handleRemoveCardUI(date);
    handleRemoveCardData(date);
  };

  return {
    cards,
    newDate,
    setNewDate,
    addCard,
    handleRemoveCard,
    tasksByDate,
    setTasksByDate,
    handleReorder,
  };
};
