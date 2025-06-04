// タスクのドラッグ＆ドロップによる移動・並び替え + 日付またぎ用にDragOverlay対応
import { useState, useEffect } from 'react';
import { useSensor, useSensors, TouchSensor } from '@dnd-kit/core';
import type { DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import type { Task } from '../types';

type UseDragAndDropReturn = {
  sensors: ReturnType<typeof useSensors>; // ドラッグ操作を検知するためのセンサー
  activeTask: Task | null; // ドラッグ中のタスク（DragOverlay用）
  handleDragStart: (event: DragStartEvent) => void; // ドラッグ開始時の処理
  handleDragEnd: (event: DragEndEvent) => void; // ドラッグ終了時の処理
};

export const useDragAndDrop = (
  tasks: Task[],
  onReorder: (newTasks: Task[]) => void // 並び替え後に呼び出すコールバック
): UseDragAndDropReturn => {
  // 1. ユーザーの入力を検知するセンサーを設定
  const sensors = useSensors(
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150, // 少しの長押しで発動
        tolerance: 10, // 少し動かしても許容
      },
    })
  );

  // 2. 現在ドラッグ中のタスク（DragOverlayの表示用）
  const [activeTask, setActiveTask] = useState<Task | null>(null);

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

  // 3. ドラッグ開始時の処理（DragOverlay 表示のために activeTask をセット）
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === Number(active.id));
    if (task) {
      setActiveTask(task); // DragOverlay に表示するためのタスクを記憶
    }
  };

  // 4. ドラッグ終了時の処理（並び替え処理 + DragOverlay リセット）
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // DragOverlay をクリア
    setActiveTask(null);

    // over.id が存在しない、または同じ位置なら何もしない
    if (!over || active.id === over.id) return;

    // oldIndex, newIndex: 並び替え前後のインデックスを取得
    const oldIndex = tasks.findIndex((task) => task.id === Number(active.id));
    const newIndex = tasks.findIndex((task) => task.id === Number(over.id));

    // 該当のタスクが見つからなければ中断
    if (oldIndex === -1 || newIndex === -1) return;

    // タスクの順番を並び替えて上位コンポーネントへ通知
    const newTasks = arrayMove(tasks, oldIndex, newIndex);
    onReorder(newTasks);
  };

  // 5. 必要な値を返す（センサー、DragOverlay用のタスク、イベントハンドラ）
  return { sensors, activeTask, handleDragStart, handleDragEnd };
};
