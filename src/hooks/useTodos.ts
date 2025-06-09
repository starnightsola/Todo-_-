import { useCallback } from 'react';
import { useTaskContext } from '../context/useTaskContext';
import type { TaskEditInput, TaskPatchInput, NewTaskInput } from '../types';

export const useTodos = () => {
  const { tasks, dispatch } = useTaskContext();

  // ✅ 新規追加
  const addTask = useCallback(
    (task: NewTaskInput) => {
      dispatch({ type: 'add', payload: task });
    },
    [dispatch]
  );

  // ✅ 完了状態の切り替え
  const toggleTask = useCallback(
    (id: number) => {
      dispatch({ type: 'toggle', payload: id });
    },
    [dispatch]
  );

  // ✅ 削除
  const deleteTask = useCallback(
    (id: number) => {
      for (const date in tasks) {
        if (tasks[date].some((t) => t.id === id)) {
          console.log('🗑️ タスク削除', { id, date, task: tasks[date].find((t) => t.id === id) });
          dispatch({ type: 'delete', payload: { date, id } });
          break;
        }
      }
    },
    [dispatch, tasks]
  );

  // ✅ 編集確定
  const editTask = useCallback(
    (input: TaskEditInput): void => {
      dispatch({ type: 'edit', payload: input });
    },
    [dispatch]
  );

  // ✅ 編集開始（isEditing = true）
  const startEdit = useCallback(
    (id: number) => {
      dispatch({ type: 'startEdit', payload: id });
    },
    [dispatch]
  );

  // ✅ 編集キャンセル（isEditing = false）
  const cancelEdit = useCallback(
    (id: number) => {
      dispatch({ type: 'cancelEdit', payload: id });
    },
    [dispatch]
  );

  // ✅ 一部だけ変更（patch型）
  const patchTask = useCallback(
    (patch: TaskPatchInput): void => {
      dispatch({ type: 'patch', payload: patch });
    },
    [dispatch]
  );

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    startEdit,
    cancelEdit,
    patchTask,
  };
};
