// @vitest-environment jsdom
import { render } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders correctly', () => {
    render(
      <Header
        onMenuClick={() => {}}
        isDrawerOpen={false}
        mode="light" // もしくは "dark"
        onToggleTheme={() => {}}
      />
    );
  });
});
