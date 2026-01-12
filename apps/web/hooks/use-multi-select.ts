import { useState, useCallback } from "react";

interface UseMultiSelectOptions<T> {
  /** Function to get the ID from an item */
  getId: (item: T) => string;
  /** All items available for selection */
  items: T[];
}

interface UseMultiSelectReturn<T> {
  /** Set of selected IDs */
  selectedIds: Set<string>;
  /** Check if an item is selected */
  isSelected: (id: string) => boolean;
  /** Toggle a single item's selection */
  toggle: (id: string) => void;
  /** Toggle with shift-click range selection */
  toggleWithShift: (id: string, event: React.MouseEvent) => void;
  /** Select all items */
  selectAll: () => void;
  /** Clear all selections */
  clearSelection: () => void;
  /** Number of selected items */
  selectedCount: number;
  /** Check if all items are selected */
  isAllSelected: boolean;
  /** Check if some (but not all) items are selected */
  isIndeterminate: boolean;
  /** Get all selected items */
  getSelectedItems: () => T[];
}

/**
 * Hook for managing multi-select functionality with shift-click range selection
 */
export function useMultiSelect<T>({
  getId,
  items,
}: UseMultiSelectOptions<T>): UseMultiSelectReturn<T> {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [lastSelectedId, setLastSelectedId] = useState<string | null>(null);

  const isSelected = useCallback(
    (id: string) => selectedIds.has(id),
    [selectedIds],
  );

  const toggle = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
    setLastSelectedId(id);
  }, []);

  const toggleWithShift = useCallback(
    (id: string, event: React.MouseEvent) => {
      if (event.shiftKey && lastSelectedId && lastSelectedId !== id) {
        // Shift-click: select range
        const ids = items.map(getId);
        const lastIndex = ids.indexOf(lastSelectedId);
        const currentIndex = ids.indexOf(id);

        if (lastIndex !== -1 && currentIndex !== -1) {
          const start = Math.min(lastIndex, currentIndex);
          const end = Math.max(lastIndex, currentIndex);
          const rangeIds = ids.slice(start, end + 1);

          setSelectedIds((prev) => {
            const next = new Set(prev);
            rangeIds.forEach((rangeId) => next.add(rangeId));
            return next;
          });
          setLastSelectedId(id);
          return;
        }
      }

      // Normal click: toggle single item
      toggle(id);
    },
    [items, getId, lastSelectedId, toggle],
  );

  const selectAll = useCallback(() => {
    const allIds = items.map(getId);
    setSelectedIds(new Set(allIds));
  }, [items, getId]);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
    setLastSelectedId(null);
  }, []);

  const selectedCount = selectedIds.size;
  const isAllSelected = items.length > 0 && selectedCount === items.length;
  const isIndeterminate = selectedCount > 0 && selectedCount < items.length;

  const getSelectedItems = useCallback(() => {
    return items.filter((item) => selectedIds.has(getId(item)));
  }, [items, getId, selectedIds]);

  return {
    selectedIds,
    isSelected,
    toggle,
    toggleWithShift,
    selectAll,
    clearSelection,
    selectedCount,
    isAllSelected,
    isIndeterminate,
    getSelectedItems,
  };
}
