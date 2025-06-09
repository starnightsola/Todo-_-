// タスクのドラッグ＆ドロップによる移動・並び替え + 日付をまたぐ移動対応
import { useState, useEffect } from 'react';
import { useSensor, useSensors, TouchSensor, PointerSensor } from '@dnd-kit/core';
import type { DragStartEvent, DragEndEvent, DragOverEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import type { Task } from '../types';

type UseDragAndDropReturn = {
  sensors: ReturnType<typeof useSensors>; // ドラッグ操作を検知するためのセンサー
  activeTask: Task | null; // ドラッグ中のタスク（DragOverlay用）
  handleDragStart: (event: DragStartEvent) => void; // ドラッグ開始時の処理
  handleDragEnd: (event: DragEndEvent) => void; // ドラッグ終了時の処理
  handleDragOver: (event: DragOverEvent) => void;
};

export const useDragAndDrop = (
  allTasks: Record<string, Task[]>, // 全日付のタスク（dateをキーにしたオブジェクト）
  onReorder: (date: string, newTasks: Task[]) => void, // 同一日付内での並び替え時に呼ぶ
  moveTask: (fromDate: string, toDate: string, task: Task) => void // 日付をまたいでタスクを移動させる処理
): UseDragAndDropReturn => {
  // 1. ユーザーの入力を検知するセンサーを設定
  const sensors = useSensors(
    useSensor(PointerSensor), // PCなどのマウス操作
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 10 } })
  );

  // 2. 現在ドラッグ中のタスク（DragOverlayの表示用）
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // 3. ドラッグ中はページスクロールを止める（SP対応）
  useEffect(() => {
    if (activeTask) {
      document.body.style.overflow = 'hidden'; // ドラッグ中はスクロール無効
    } else {
      document.body.style.overflow = ''; // 通常に戻す
    }

    return () => {
      document.body.style.overflow = ''; // クリーンアップ（再レンダリング時）
    };
  }, [activeTask]);

  // 4. ドラッグ開始時の処理
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const fromDate = active.data.current?.date;
    // 🔍 dragStart時のデータ確認（ここに追加）
    console.log('🎯 dragStart: ', active.data.current);
    if (!fromDate) return;

    const task = allTasks[fromDate]?.find((t) => t.id === Number(active.id));
    if (task) {
      setActiveTask(task);
    }
  };

  // 5. ドラッグ終了時の処理
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null); // DragOverlay表示のクリア

    // over が null または同じ要素なら処理不要
    if (!over || active.id === over.id) return;

    const fromDate = active.data.current?.date;
    const overId = over.id.toString();
    const toDate = overId.startsWith('card-')
      ? overId.replace('card-', '')
      : over.data.current?.date;

    if (!fromDate || !toDate) return;

    const task = allTasks[fromDate]?.find((t) => t.id === Number(active.id));
    if (!task) return;

    // ✅ 日付が同じ → 並び替え
    if (fromDate === toDate) {
      const fromTasks = allTasks[fromDate] || [];
      const oldIndex = fromTasks.findIndex((t) => t.id === Number(active.id));
      const newIndex = fromTasks.findIndex((t) => t.id === Number(over.id));

      if (oldIndex === -1 || newIndex === -1) return;

      const reordered = arrayMove(fromTasks, oldIndex, newIndex);
      onReorder(fromDate, reordered);
    } else {
      // ✅ 日付が異なる → タスク移動（別のカードへ）
      moveTask(fromDate, toDate, task);
    }
  };
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const fromDate = active.data.current?.date;
    const overId = over.id.toString();
    const toDate = overId.startsWith('card-')
      ? overId.replace('card-', '')
      : over.data.current?.date;

    if (fromDate && toDate && fromDate !== toDate) {
      console.log(`🔁 onDragOver: ${fromDate} → ${toDate}`);
    }
  };

  // 6. 必要な値を返す（センサー、DragOverlay用のタスク、イベントハンドラ）
  return { sensors, activeTask, handleDragStart, handleDragEnd, handleDragOver };
};
