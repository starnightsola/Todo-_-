import { useCallback } from 'react';
import { useTaskContext } from '../context/useTaskContext';
import type { TaskEditInput, TaskPatchInput, NewTaskInput} from '../types';



export const useTodos = () => {
  const { tasks, dispatch } = useTaskContext();

  // ✅ 新規追加
  const addTask = useCallback((task: NewTaskInput) => {
    dispatch({ type: 'add', payload: task });
  }, [dispatch]);

  // ✅ 完了状態の切り替え
  const toggleTask = useCallback((id: number) => {
    dispatch({ type: 'toggle', payload: id });
  }, [dispatch]);

  // ✅ 削除
  const removeTask = useCallback((id: number) => {
    dispatch({ type: 'remove', payload: id });
  }, [dispatch]);

  // ✅ 編集確定
  const editTask = useCallback((input: TaskEditInput): void => {
    dispatch({ type: 'edit', payload: input });
  }, [dispatch]);

  // ✅ 編集開始（isEditing = true）
  const startEdit = useCallback((id: number) => {
    dispatch({ type: 'startEdit', payload: id });
  }, [dispatch]);

  // ✅ 編集キャンセル（isEditing = false）
  const cancelEdit = useCallback((id: number) => {
    dispatch({ type: 'cancelEdit', payload: id });
  }, [dispatch]);

  // ✅ 一部だけ変更（patch型）
  const patchTask = useCallback((patch: TaskPatchInput): void => {
    dispatch({ type: 'patch', payload: patch });
  }, [dispatch]);

  return {
    tasks,
    addTask,
    toggleTask,
    removeTask,
    editTask,
    startEdit,
    cancelEdit,
    patchTask,
  };
};
