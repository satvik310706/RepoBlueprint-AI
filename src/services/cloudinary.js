/**
 * Cloudinary Direct Upload and Image Optimization Service
 * 
 * Provides secure, client-side unsigned uploads to Cloudinary,
 * smart URL transformations (f_auto, q_auto, face crop, thumbnails),
 * asset tagging, and connection verification.
 */

export const DEFAULT_CLOUDINARY_CONFIG = {
  cloudName: import.meta.env?.VITE_CLOUDINARY_CLOUD_NAME || 'bgumuh2m',
  uploadPreset: import.meta.env?.VITE_CLOUDINARY_UPLOAD_PRESET || 'repo_blueprint',
  apiKey: import.meta.env?.VITE_CLOUDINARY_API_KEY || '749746485129813',
  apiSecret: import.meta.env?.VITE_CLOUDINARY_API_SECRET || 'vHBLCLMbDsdWOLR1Us4asZCGmVw',
  folder: import.meta.env?.VITE_CLOUDINARY_FOLDER || 'repo-blueprint',
};

const STORAGE_KEY_PREFIX = 'rb_cloudinary_config_';

/**
 * Retrieves the Cloudinary configuration for a specific user (or global fallback).
 */
export function getCloudinaryConfig(userId = 'default') {
  try {
    const userSaved = localStorage.getItem(`${STORAGE_KEY_PREFIX}${userId}`);
    if (userSaved) {
      const parsed = JSON.parse(userSaved);
      // Auto-upgrade if it was still on 'demo'
      if (parsed.cloudName && parsed.cloudName !== 'demo') {
        return { ...DEFAULT_CLOUDINARY_CONFIG, ...parsed };
      }
    }
    const globalSaved = localStorage.getItem('rb_cloudinary_config');
    if (globalSaved) {
      const parsed = JSON.parse(globalSaved);
      if (parsed.cloudName && parsed.cloudName !== 'demo') {
        return { ...DEFAULT_CLOUDINARY_CONFIG, ...parsed };
      }
    }
  } catch (e) {
    console.warn('[Cloudinary] Failed to read config from localStorage:', e);
  }
  return { ...DEFAULT_CLOUDINARY_CONFIG };
}

/**
 * Saves Cloudinary configuration for a specific user.
 */
export function saveCloudinaryConfig(userId = 'default', config = {}) {
  try {
    const merged = { ...getCloudinaryConfig(userId), ...config };
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${userId}`, JSON.stringify(merged));
    localStorage.setItem('rb_cloudinary_config', JSON.stringify(merged));
    return merged;
  } catch (e) {
    console.error('[Cloudinary] Failed to save config to localStorage:', e);
    return config;
  }
}

/**
 * Converts a base64 Data URL or raw base64 string to a Blob.
 */
export function dataUrlToBlob(dataUrl, defaultMime = 'image/png') {
  let mime = defaultMime;
  let base64Data = dataUrl;

  if (dataUrl.includes(',')) {
    const parts = dataUrl.split(',');
    const mimeMatch = parts[0].match(/:(.*?);/);
    if (mimeMatch) mime = mimeMatch[1];
    base64Data = parts[1];
  }

  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mime });
}

/**
 * Uploads an image (File, Blob, or Data URL) directly to Cloudinary using unsigned upload.
 * 
 * @param {Object} options
 * @param {File|Blob|string} options.file - File, Blob, or base64 Data URL
 * @param {string} [options.fileName] - Optional custom filename
 * @param {string} [options.folder] - Target folder in Cloudinary
 * @param {Array<string>} [options.tags] - Array of tags for categorization
 * @param {string} [options.userId] - Current user ID for metadata & config
 * @param {Object} [options.context] - Key-value metadata (e.g., { project: 'habit-coach' })
 * @param {Function} [options.onProgress] - Progress callback (percentage 0-100)
 * @returns {Promise<Object>} Uploaded asset details
 */
export async function uploadToCloudinary({
  file,
  fileName = 'blueprint-upload',
  folder = 'repo-blueprint',
  tags = ['repoblueprint'],
  userId = 'default',
  context = {},
  onProgress = null,
}) {
  const config = getCloudinaryConfig(userId);
  const cloudName = (config.cloudName || 'bgumuh2m').trim();
  const uploadPreset = (config.uploadPreset || 'repo_blueprint').trim();

  let uploadPayload;
  if (typeof file === 'string') {
    // If it's already a full http/https Cloudinary URL, return as-is
    if (file.startsWith('http://') || file.startsWith('https://')) {
      return {
        url: file,
        secure_url: file,
        public_id: file.split('/').pop().split('.')[0],
        format: file.split('.').pop() || 'png',
        bytes: 0,
        width: 800,
        height: 600,
        created_at: new Date().toISOString(),
        isExistingUrl: true,
      };
    }
    uploadPayload = dataUrlToBlob(file);
  } else {
    uploadPayload = file;
  }

  const formData = new FormData();
  formData.append('file', uploadPayload, fileName);
  formData.append('upload_preset', uploadPreset);
  if (folder) formData.append('folder', folder);
  if (tags && tags.length > 0) {
    formData.append('tags', tags.join(','));
  }

  // Add context metadata if provided
  if (context && Object.keys(context).length > 0) {
    const ctxString = Object.entries(context)
      .map(([k, v]) => `${k}=${String(v).replace(/[|=]/g, '_')}`)
      .join('|');
    formData.append('context', ctxString);
  }

  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', uploadUrl);

    if (onProgress && xhr.upload) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          onProgress(percent);
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          const result = {
            url: response.url,
            secure_url: response.secure_url || response.url,
            public_id: response.public_id,
            format: response.format,
            width: response.width,
            height: response.height,
            bytes: response.bytes,
            created_at: response.created_at || new Date().toISOString(),
            original_filename: response.original_filename || fileName,
            thumbnail_url: getTransformedUrl(response.secure_url, { width: 300, height: 200, crop: 'fit' }),
            avatar_url: getTransformedUrl(response.secure_url, { width: 140, height: 140, crop: 'fill', gravity: 'face', radius: 'max' }),
            raw: response,
          };
          resolve(result);
        } catch (err) {
          reject(new Error('Failed to parse Cloudinary response: ' + err.message));
        }
      } else {
        let errMessage = `Cloudinary upload failed with status ${xhr.status}`;
        try {
          const errRes = JSON.parse(xhr.responseText);
          if (errRes.error?.message) {
            errMessage = `Cloudinary error: ${errRes.error.message}`;
          }
        } catch {}
        reject(new Error(errMessage));
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error during Cloudinary upload. Please check your internet connection and Cloudinary settings.'));
    };

    xhr.send(formData);
  });
}

/**
 * Builds an optimized Cloudinary delivery URL with custom transformations.
 * E.g., automatic WebP/AVIF format (`f_auto`), smart compression (`q_auto`),
 * responsive resizing, and rounded face avatar cropping.
 */
export function getTransformedUrl(urlOrPublicId, options = {}) {
  if (!urlOrPublicId) return '';

  const {
    width,
    height,
    crop = 'limit', // 'fill' | 'fit' | 'limit' | 'thumb' | 'scale'
    gravity,       // 'face' | 'auto' | 'center'
    quality = 'auto',
    format = 'auto',
    radius,        // 'max' or number
    effect,        // e.g., 'sharpen'
  } = options;

  // Build transform string
  const transforms = [];
  if (format) transforms.push(`f_${format}`);
  if (quality) transforms.push(`q_${quality}`);
  if (crop) transforms.push(`c_${crop}`);
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (gravity) transforms.push(`g_${gravity}`);
  if (radius) transforms.push(`r_${radius}`);
  if (effect) transforms.push(`e_${effect}`);

  const transformString = transforms.join(',');

  // Check if it's already a full Cloudinary URL
  if (urlOrPublicId.includes('res.cloudinary.com')) {
    const uploadIdx = urlOrPublicId.indexOf('/upload/');
    if (uploadIdx !== -1) {
      return (
        urlOrPublicId.substring(0, uploadIdx + 8) +
        transformString +
        '/' +
        urlOrPublicId.substring(uploadIdx + 8)
      );
    }
  }

  // If it's a public_id or relative path
  const config = getCloudinaryConfig();
  const cloudName = config.cloudName || 'demo';
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}/${urlOrPublicId}`;
}

/**
 * Quick helper for avatar URLs (circular face crop).
 */
export function getAvatarUrl(urlOrPublicId, size = 120) {
  if (!urlOrPublicId) return '';
  return getTransformedUrl(urlOrPublicId, {
    width: size,
    height: size,
    crop: 'fill',
    gravity: 'face',
    radius: 'max',
    format: 'auto',
    quality: 'auto',
  });
}

/**
 * Verifies Cloudinary configuration by attempting a lightweight test upload or ping.
 */
export async function testCloudinaryConnection(cloudName, uploadPreset) {
  if (!cloudName || !uploadPreset) {
    throw new Error('Please provide both Cloud Name and Upload Preset.');
  }

  // Minimal 1x1 transparent PNG data URI for verification
  const test1x1Png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

  const formData = new FormData();
  formData.append('file', dataUrlToBlob(test1x1Png), 'test_ping.png');
  formData.append('upload_preset', uploadPreset.trim());
  formData.append('folder', 'repo-blueprint/connection-tests');
  formData.append('tags', 'connection_test');

  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName.trim()}/image/upload`;

  const res = await fetch(uploadUrl, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errText = await res.text();
    let msg = `Verification failed (${res.status})`;
    try {
      const parsed = JSON.parse(errText);
      if (parsed.error?.message) msg = parsed.error.message;
    } catch {}
    throw new Error(msg);
  }

  const data = await res.json();
  return {
    success: true,
    cloudName,
    secure_url: data.secure_url,
    public_id: data.public_id,
  };
}
