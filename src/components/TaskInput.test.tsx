// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskInput from './TaskInput';
import { vi } from 'vitest';
import { expect, test } from 'vitest';


test('入力して追加ボタンを押すと onAdd が呼ばれる', async () => {
  const onAdd = vi.fn(); // モック関数を作成
  render(<TaskInput date="2025-05-01" onAdd={onAdd} />);

  const input = screen.getByPlaceholderText('タスクを入力');
  const button = screen.getByRole('button', { name: '追加' });

  await userEvent.type(input, '買い物');
  await userEvent.click(button);

  expect(onAdd).toHaveBeenCalledWith('買い物', '2025-05-01');
});