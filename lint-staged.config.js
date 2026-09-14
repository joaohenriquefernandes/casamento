import path from 'node:path'

/** Skills vendorizadas: código de terceiros, não passa por lint nem format. */
const VENDORED = ['.agents/skills/', '.claude/skills/']

const own = (files) =>
  files
    .map((file) => path.relative(process.cwd(), file).split(path.sep).join('/'))
    .filter((file) => !VENDORED.some((dir) => file.startsWith(dir)))
    .map((file) => `"${file}"`)

export default {
  '*.{ts,tsx}': (files) => {
    const targets = own(files)
    if (targets.length === 0) return []
    return [`eslint --fix ${targets.join(' ')}`, `prettier --write ${targets.join(' ')}`]
  },
  '*.{js,json,css,md,html}': (files) => {
    const targets = own(files)
    if (targets.length === 0) return []
    return [`prettier --write ${targets.join(' ')}`]
  },
}
