import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { Platform, ToastAndroid, Alert } from 'react-native';
import { Song } from '../types/song';
import { downloadSong, isSongDownloaded, deleteDownloadedSong } from '../utils/download';

export type DownloadStatus = 'idle' | 'downloading' | 'completed' | 'error';

interface DownloadState {
  trackId: number;
  status: DownloadStatus;
  progress: number;
}

interface DownloadContextType {
  downloads: Map<number, DownloadState>;
  downloadSong: (song: Song) => Promise<void>;
  deleteSong: (song: Song) => Promise<void>;
  checkDownloadStatus: (song: Song) => Promise<void>;
  getDownloadStatus: (trackId: number) => DownloadState | undefined;
  isDownloaded: (trackId: number) => boolean;
}

const DownloadContext = createContext<DownloadContextType | undefined>(undefined);

export const DownloadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [downloads, setDownloads] = useState<Map<number, DownloadState>>(new Map());
  const downloadsRef = useRef(downloads);

  const showToast = useCallback((message: string) => {
    if (!message) {
      return;
    }
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert('Download', message);
    }
  }, []);

  useEffect(() => {
    downloadsRef.current = downloads;
  }, [downloads]);

  const updateDownloadState = useCallback((trackId: number, updates: Partial<DownloadState>) => {
    setDownloads(prev => {
      const current = prev.get(trackId) || { trackId, status: 'idle', progress: 0 };
      const next = { ...current, ...updates };

      if (current.status === next.status && current.progress === next.progress) {
        return prev;
      }

      const newMap = new Map(prev);
      newMap.set(trackId, next);
      return newMap;
    });
  }, []);

  const handleDownload = useCallback(async (song: Song) => {
    const trackId = song.trackId;

    const currentState = downloadsRef.current.get(trackId);
    if (currentState?.status === 'downloading') {
      showToast('Download already in progress');
      return;
    }
    if (currentState?.status === 'completed') {
      showToast('Song already downloaded');
      return;
    }

    const downloaded = await isSongDownloaded(song);
    if (downloaded) {
      updateDownloadState(trackId, { status: 'completed', progress: 1 });
      showToast('Song already downloaded');
      return;
    }

    updateDownloadState(trackId, { status: 'downloading', progress: 0 });

    try {
      const filePath = await downloadSong(song, (progress) => {
        updateDownloadState(trackId, { progress });
      });

      if (filePath) {
        updateDownloadState(trackId, { status: 'completed', progress: 1 });
        showToast(`${song.trackName} downloaded`);
        setTimeout(() => {
          updateDownloadState(trackId, { status: 'idle', progress: 0 });
        }, 1200);
      } else {
        updateDownloadState(trackId, { status: 'error', progress: 0 });
        showToast('Download failed. Please try again.');
      }
    } catch (error) {
      console.error('Download error:', error);
      updateDownloadState(trackId, { status: 'error', progress: 0 });
      showToast('Download failed. Please try again.');
    }
  }, [updateDownloadState, showToast]);

  const handleDelete = useCallback(async (song: Song) => {
    const trackId = song.trackId;
    const success = await deleteDownloadedSong(song);
    if (success) {
      setDownloads(prev => {
        const newMap = new Map(prev);
        newMap.delete(trackId);
        return newMap;
      });
    }
  }, []);

  const checkDownloadStatus = useCallback(async (song: Song) => {
    const trackId = song.trackId;
    const downloaded = await isSongDownloaded(song);
    if (downloaded) {
      updateDownloadState(trackId, { status: 'idle', progress: 0 });
    } else {
      const currentState = downloadsRef.current.get(trackId);
      if (currentState?.status !== 'downloading') {
        updateDownloadState(trackId, { status: 'idle', progress: 0 });
      }
    }
  }, [updateDownloadState]);

  const getDownloadStatus = useCallback((trackId: number): DownloadState | undefined => {
    return downloads.get(trackId);
  }, [downloads]);

  const isDownloaded = useCallback((trackId: number): boolean => {
    const state = downloads.get(trackId);
    return state?.status === 'completed';
  }, [downloads]);

  return (
    <DownloadContext.Provider
      value={{
        downloads,
        downloadSong: handleDownload,
        deleteSong: handleDelete,
        checkDownloadStatus,
        getDownloadStatus,
        isDownloaded,
      }}
    >
      {children}
    </DownloadContext.Provider>
  );
};

export const useDownload = (): DownloadContextType => {
  const context = useContext(DownloadContext);
  if (!context) {
    throw new Error('useDownload must be used within a DownloadProvider');
  }
  return context;
};

