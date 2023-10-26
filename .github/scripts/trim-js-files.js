import fs from 'fs';
import path from 'path';
import glob from 'glob';

const patterns = [/setLegend\(`.*?`\);/gs, /map\(`.*?`\);/gs, /bitmap\(`.*?`\);/gs];

if (!fs.existsSync('temp')) { 
  fs.mkdirSync('temp'); 
}

glob.sync('**/*.js', { ignore: 'node_modules/**' }).forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  patterns.forEach(pattern => { 
    content = content.replace(pattern, ''); 
  });
  
  const tempFilePath = `temp/trimmed_${path.basename(file)}`;
  fs.writeFileSync(tempFilePath, content);
});

console.log('JavaScript files have been trimmed and saved to the temp directory.');