// src/types.ts

// タスク1件のデータ型
export type Task = {
  id: number;
  text: string; // タスクの内容
  done: boolean; // 完了状態（true: 完了 / false: 未完了）
  isEditing: boolean; // 現在編集モード中かどうか
  date: string;
};

// ステートを1日付ごとの配列として管理
export type TaskState = Record<string, Task[]>;

// 編集時に必要な最小情報
export type TaskEditInput = {
  id: number;
  text: string;
};

// 新しく追加：タスク移動用のアクション
export type MoveTaskInput = {
  fromDate: string;
  toDate: string;
  fromIndex: number;
  toIndex: number;
};

// パッチ処理：idは必須、他は任意
export type TaskPatchInput = Partial<Omit<Task, 'id'>> & { id: number };

export type NewTaskInput = {
  text: string;
  date: string;
};

export type Action =
  | { type: 'add'; payload: { text: string; date: string } }
  | { type: 'toggle'; payload: number }
  | { type: 'remove'; payload: number }
  | { type: 'load'; payload: TaskState }
  | { type: 'edit'; payload: { id: number; text: string } }
  | { type: 'startEdit'; payload: number }
  | { type: 'cancelEdit'; payload: number }
  | { type: 'patch'; payload: TaskPatchInput }
  | { type: 'replace'; payload: { date: string; tasks: Task[] } }
  | { type: 'loadOne'; payload: { date: string; tasks: Task[] } };
// Header コンポーネント用の props 型
export type HeaderProps = {
  onMenuClick: () => void;
  isDrawerOpen: boolean;
  mode: 'light' | 'dark';
  onToggleTheme: () => void;
};

export type NavProps = {
  open: boolean;
  onClose: () => void;
  onFilterChange: (filter: DateFilter) => void;
};

// 状態フィルター
export type StatusFilter = 'all' | 'active' | 'completed';
export type TaskListProps = {
  date: string;
  statusFilter: StatusFilter;
  tasks: Task[]; // ✅ 日付ごとに渡されたタスク一覧
  onReorder: (newTasks: Task[]) => void;
};
export type TaskCardProps = {
  date: string;
  statusFilter: StatusFilter;
  tasks: Task[]; // ✅ この日付のタスクだけを受け取る
  onRemoveCard: (date: string) => void;
  onReorder: (newTasks: Task[]) => void;
};

// 日付フィルター
export type DateFilter = 'all' | 'today' | 'week';

// 表示用ラベル
export const dateFilterLabels: Record<DateFilter, string> = {
  all: 'すべての予定',
  today: '今日の予定',
  week: '一週間の予定',
};
