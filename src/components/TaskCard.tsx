import { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Select, Heading, Flex } from '@chakra-ui/react';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import type { Task } from '../types';

type Props = {
  date: string;
  onRemoveCard: (date: string) => void;
};

export default function TaskCard({ date, onRemoveCard }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const storageKey = `tasks-${date}`;

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [tasks, storageKey]);

  const handleAdd = (text: string) => {
    setTasks([...tasks, { text, done: false }]);
  };

  const toggleDone = (index: number) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const remove = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const filtered = tasks.filter((task) =>
    filter === 'all' ? true : filter === 'active' ? !task.done : task.done
  );

  return (
    <Card w="100%">
      <CardHeader>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size="sm">{date}</Heading>
          <button onClick={() => onRemoveCard(date)}>×</button>
        </Flex>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'completed')}
          mt={2}
        >
          <option value="all">全て</option>
          <option value="active">現在のタスク</option>
          <option value="completed">完了タスク</option>
        </Select>
      </CardHeader>

      <CardBody pt="0">
        <TaskList tasks={filtered} toggleDone={toggleDone} remove={remove} />
        <TaskInput onAdd={handleAdd} />
      </CardBody>
    </Card>
  );
}
