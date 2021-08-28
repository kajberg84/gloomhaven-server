import fs from 'fs'

/**
 * Read keys from file.
 *
 * @param { string } filePath - Relative urlpath.
 * @returns { string } - Secret key.
 */
export const getKey = (filePath) => {
  const key = fs.readFileSync(new URL(filePath, import.meta.url))
  return key
}