// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { expect, test } from 'vitest';

test('タイトルが正しく表示される', () => {
  render(<Header />);
  const titleElement = screen.getByText(/Todo リスト/i);
  expect(titleElement).toBeInTheDocument();
});