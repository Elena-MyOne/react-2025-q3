import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SelectedItems from '../components/SelectedItems';
import { Provider } from 'react-redux';
import { setSelectedItems } from '../redux/slices/selectedItemsSlice';
import { mockCharacter } from '../mocks/mockCharacter';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../theme/ThemeProvider';
import { setupTestStore } from '../mocks/setupTestStore';

const store = setupTestStore({
  selectedItems: {
    selectedItems: [mockCharacter],
  },
});

const MockSelectedItems = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider>
          <SelectedItems />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
};

describe('SelectedItems component', () => {
  it('renders with selected items', () => {
    render(<MockSelectedItems />);
    expect(screen.getByText(/1 items selected/i)).toBeInTheDocument();
    expect(screen.getByText(/Download/i)).toBeInTheDocument();
  });

  it('deletes items when "Unselect all" button clicked', () => {
    store.dispatch = vi.fn();
    render(<MockSelectedItems />);
    const button = screen.getByText(/Unselect all/i);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(store.dispatch).toHaveBeenCalledWith(setSelectedItems([]));
  });
});
