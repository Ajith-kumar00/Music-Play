import RNFS from 'react-native-fs';
import { Song } from '../types/song';
import { Platform, PermissionsAndroid, Alert } from 'react-native';

const DOWNLOAD_DIR = Platform.OS === 'ios'
  ? `${RNFS.DocumentDirectoryPath}/Music`
  : `${RNFS.DownloadDirectoryPath}/Music`;

export interface DownloadProgress {
  trackId: number;
  progress: number;
  status: 'downloading' | 'completed' | 'error' | 'idle';
}

export const ensureDownloadDir = async (): Promise<void> => {
  try {
    const dirExists = await RNFS.exists(DOWNLOAD_DIR);
    if (!dirExists) {
      await RNFS.mkdir(DOWNLOAD_DIR);
    }
  } catch (error) {
    console.error('Error creating download directory:', error);
  }
};

export const requestStoragePermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') {
    return true;
  }

  try {
    if (Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
        {
          title: 'Storage Permission',
          message: 'App needs access to storage to download music files',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'App needs access to storage to download music files',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn('Permission request error:', err);
    return false;
  }
};

export const getSongFilePath = (song: Song): string => {
  const fileName = `${song.trackId}_${song.trackName.replace(/[^a-z0-9]/gi, '_')}.m4a`;
  return `${DOWNLOAD_DIR}/${fileName}`;
};

export const isSongDownloaded = async (song: Song): Promise<boolean> => {
  try {
    const filePath = getSongFilePath(song);
    return await RNFS.exists(filePath);
  } catch (error) {
    console.error('Error checking if song is downloaded:', error);
    return false;
  }
};

export const downloadSong = async (
  song: Song,
  onProgress?: (progress: number) => void
): Promise<string | null> => {
  try {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Storage permission is required to download songs.');
      return null;
    }

    await ensureDownloadDir();

    const filePath = getSongFilePath(song);
    const exists = await RNFS.exists(filePath);
    if (exists) {
      Alert.alert('Already Downloaded', 'This song is already downloaded.');
      return filePath;
    }

    const downloadUrl = song.previewUrl;
    if (!downloadUrl) {
      Alert.alert('Error', 'No download URL available for this song.');
      return null;
    }

    const downloadResult = await RNFS.downloadFile({
      fromUrl: downloadUrl,
      toFile: filePath,
      progressDivider: 1,
      progress: (res) => {
        if (!onProgress) {
          return;
        }

        const totalBytes = res.contentLength > 0 ? res.contentLength : 0;
        if (totalBytes > 0) {
          const progress = res.bytesWritten / totalBytes;
          onProgress(Math.min(Math.max(progress, 0), 1));
        } else {
          onProgress(0);
        }
      },
      begin: () => {
        if (onProgress) {
          onProgress(0);
        }
      },
    }).promise;

    if (downloadResult.statusCode === 200) {
      return filePath;
    }

    throw new Error(`Download failed with status code: ${downloadResult.statusCode}`);
  } catch (error: any) {
    console.error('Download error:', error);
    Alert.alert('Download Failed', error.message || 'Failed to download the song.');
    return null;
  }
};

export const deleteDownloadedSong = async (song: Song): Promise<boolean> => {
  try {
    const filePath = getSongFilePath(song);
    const exists = await RNFS.exists(filePath);
    if (exists) {
      await RNFS.unlink(filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting song:', error);
    return false;
  }
};

export const getDownloadedSongs = async (): Promise<string[]> => {
  try {
    await ensureDownloadDir();
    const files = await RNFS.readDir(DOWNLOAD_DIR);
    return files
      .filter(file => file.isFile() && file.name.endsWith('.m4a'))
      .map(file => file.path);
  } catch (error) {
    console.error('Error getting downloaded songs:', error);
    return [];
  }
};

export const getFileSize = async (filePath: string): Promise<number> => {
  try {
    const stat = await RNFS.stat(filePath);
    return stat.size;
  } catch (error) {
    console.error('Error getting file size:', error);
    return 0;
  }
};

