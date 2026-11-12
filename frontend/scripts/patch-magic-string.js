const fs = require('fs');
const path = require('path');

try {
  const magicStringDir = path.dirname(require.resolve('magic-string/package.json', { paths: [process.cwd()] }));
  const pkgPath = path.join(magicStringDir, 'package.json');
  const mjsPath = path.join(magicStringDir, 'dist', 'index.mjs');
  const cjsPath = path.join(magicStringDir, 'dist', 'index.cjs');

  if (fs.existsSync(mjsPath)) {
    let content = fs.readFileSync(mjsPath, 'utf8');
    if (content.includes('export {')) {
      content = content.replace(
        'import { encode, encodeRangeMappings } from "@jridgewell/sourcemap-codec";',
        'const { encode, encodeRangeMappings } = require("@jridgewell/sourcemap-codec");'
      );
      content = content.replace(
        'export { Bundle, MagicString, MagicString as default, MagicStringError, SourceMap };',
        'module.exports = MagicString;\nmodule.exports.default = MagicString;\nmodule.exports.Bundle = Bundle;\nmodule.exports.MagicString = MagicString;\nmodule.exports.MagicStringError = MagicStringError;\nmodule.exports.SourceMap = SourceMap;'
      );
      fs.writeFileSync(cjsPath, content, 'utf8');

      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      pkg.main = './dist/index.cjs';
      pkg.exports = {
        '.': {
          import: './dist/index.mjs',
          require: './dist/index.cjs',
          default: './dist/index.mjs'
        },
        './package.json': './package.json'
      };
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf8');
      console.log('✓ Successfully ensured magic-string CommonJS compatibility');
    }
  }
} catch (e) {
  // If magic-string is not present or already compatible, proceed without failing
  console.log('Note on magic-string patch:', e.message);
}
