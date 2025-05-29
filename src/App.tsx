// 日付を選んで「カード（＝その日付のタスク一覧）」を追加する
// 追加された各カードには、個別にタスク入力・完了チェック・削除・フィルター機能がある（←これは TaskCard.tsx に実装済）

import { useState, useEffect, useCallback } from 'react';
import { VStack, SimpleGrid, Input, Button, Select } from '@chakra-ui/react';
import Header from './components/Header';
import TaskCard from './components/TaskCard';

type Filter = 'all' | 'active' | 'completed';

export default function App() {
  const [cards, setCards] = useState<string[]>([]);
  // 追加されたカード（日付文字列）の配列

  const [newDate, setNewDate] = useState('');
  // ユーザーが <Input type="date" /> で選んだ日付（1枚追加する用）
  // 初期値は空文字列 '' です。

  const [filter, setFilter] = useState<Filter>('all');

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

  return (
    <VStack spacing={6} p={6}>
      <Header />
      <VStack>
        <Input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} w="200px" />
        <Button onClick={addCard} colorScheme="green">
          カード追加
        </Button>
      </VStack>
      {/* ✅ カードを横3列、スマホは1列で表示 */}
      <Select
        value={filter}
        onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'completed')}
        w="200px"
      >
        <option value="all">すべて</option>
        <option value="active">未完了</option>
        <option value="completed">完了済み</option>
      </Select>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} maxWidth="1024px">
        {cards.map((date) => (
          <TaskCard
            key={date}
            date={date}
            filter={filter}
            // ✅ カード削除関数を内部にまとめた形式
            onRemoveCard={handleRemoveCard}
            // onRemoveCard={(target) =>
            //   setCards(cards.filter((d) => d !== target))
            // }
          />
        ))}
      </SimpleGrid>
    </VStack>
  );
}
