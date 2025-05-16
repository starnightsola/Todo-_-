import React from 'react';
import { useEffect } from 'react'; // ✅ useState を追加
import { Card, CardHeader, CardBody, Heading, Flex } from '@chakra-ui/react';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import { useTaskContext } from '../context/useTaskContext';

type Filter = 'all' | 'active' | 'completed';
type Props = {
  date: string;
  filter: Filter;
  onRemoveCard: (date: string) => void;
};

const TaskCard = ({ date, filter, onRemoveCard }: Props) => {
  // console.log(`${date} カードが再レンダリングされました！`);
  console.count(`TaskCard ${date}`);
  const { tasks, dispatch } = useTaskContext();

  const storageKey = `tasks-${date}`;

    useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      dispatch({ type: 'load', payload: JSON.parse(stored) });
    }
  },  [storageKey, dispatch]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [tasks, storageKey]);
  // useEffect(() => {
  //   console.log(`${date} useEffectでレンダリングされた`);
  // }, [date]);
  return (
    <Card w="100%">
      <CardHeader>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size="sm">{date}</Heading>
          <button onClick={() => onRemoveCard(date)}>×</button>
        </Flex>
        
      </CardHeader>

      <CardBody pt="0">
        <TaskList filter={filter} date={date} />
        <TaskInput date={date} />
      </CardBody>
    </Card>
  );
}
// ✅ メモ化することで、dateやonRemoveCardが変わらない限り、再レンダリングされない！
export default React.memo(TaskCard, (prevProps, nextProps) => {
  return (
    prevProps.date === nextProps.date &&
    prevProps.filter === nextProps.filter
  );
});