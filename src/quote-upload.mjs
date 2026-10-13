export const uploadLimits = { maxFiles: 3, maxBytes: 10 * 1024 * 1024, maxBodyBytes: 11 * 1024 * 1024 };
export const uploadTypes = {
  png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp',
  pdf: 'application/pdf', ai: 'application/postscript', psd: 'image/vnd.adobe.photoshop',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  txt: 'text/plain', csv: 'text/csv'
};

export function validateUploadFiles(files) {
  if (files.length > uploadLimits.maxFiles) return 'You can attach up to 3 files.';
  let total = 0;
  for (const file of files) {
    if (typeof file.name !== 'string' || typeof file.arrayBuffer !== 'function') return 'Invalid attachment.';
    const extension = file.name.split('.').pop().toLowerCase();
    if (!uploadTypes[extension]) return 'Unsupported file type. Use PNG, JPG, WEBP, PDF, AI, PSD, DOCX, XLSX, TXT or CSV.';
    if (!Number.isFinite(file.size) || file.size <= 0 || file.size > uploadLimits.maxBytes) return 'Each attachment must be non-empty and no larger than 10 MB.';
    total += file.size;
  }
  return total > uploadLimits.maxBytes ? 'The combined attachment size must be 10 MB or less.' : null;
}

export function attachmentName(name) {
  return name.split(/[\\/]/).pop().replace(/[\u0000-\u001f\u007f]/g, '').slice(-180) || 'attachment';
}
