import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box } from '@mui/material';
import type { Task } from '../types';

type Props = {
  task: Task; // 対象のタスクデータ（task.id を id として渡す）
  children: (dragHandleProps: ReturnType<typeof useSortable>) => React.ReactNode;
};

const SortableTaskItem = ({ task, children }: Props) => {
  const sortable = useSortable({ id: task.id.toString() });

  const style = {
    transform: CSS.Transform.toString(sortable.transform),
    transition: sortable.transition,
  };

  return (
    <Box ref={sortable.setNodeRef} style={style}>
      {children(sortable)}
    </Box>
  );
};

export default SortableTaskItem;
