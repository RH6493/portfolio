
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppData, AppTheme } from '../types';
import { INITIAL_DATA } from '../constants';

interface StoreContextType {
  data: AppData;
  updateData: (newData: Partial<AppData>) => void;
  updateTheme: (newTheme: Partial<AppTheme>) => void;
  resetData: () => void;
  exportData: () => void;
  importData: (file: File) => void;
  storageError: string | null;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio_data_v1';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize from local storage if available, else use constants
  const [data, setData] = useState<AppData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        
        // VERSION CHECK: If INITIAL_DATA version is newer or different, prioritize it.
        // This allows the user to see changes made in constants.ts automatically.
        if (parsed.version !== INITIAL_DATA.version) {
          console.log(`Version mismatch: Local(${parsed.version}) vs Code(${INITIAL_DATA.version}). Syncing to code.`);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
          return INITIAL_DATA;
        }
        return parsed;
      }
    } catch (e) {
      console.error("Failed to load from local storage", e);
    }
    return INITIAL_DATA;
  });

  const [storageError, setStorageError] = useState<string | null>(null);

  // Persist to local storage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setStorageError(null);
    } catch (e) {
      setStorageError('Failed to save changes to local storage. Quota might be exceeded.');
      console.error(e);
    }
  }, [data]);

  const updateData = (newData: Partial<AppData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const updateTheme = (newTheme: Partial<AppTheme>) => {
    setData(prev => ({
      ...prev,
      theme: { ...prev.theme, ...newTheme }
    }));
  };

  const resetData = () => {
    if (window.confirm('Are you sure you want to reset all data to the version in constants.ts? Your manual edits in the dashboard will be lost.')) {
      setData(INITIAL_DATA);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importData = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json && json.profile && json.skills) {
           setData(json);
           alert('Data imported successfully!');
        } else {
           alert('Invalid data format: Missing profile or skills.');
        }
      } catch (e) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <StoreContext.Provider value={{ data, updateData, updateTheme, resetData, exportData, importData, storageError }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
