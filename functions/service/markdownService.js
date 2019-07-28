const marked = require('marked');
const fs = require('fs');

class MarkdownService{
    static parse(readmePath, targetPath){
        const readme = fs.readFileSync(readmePath, 'utf-8');
        const markdownReadme = marked(readme);
        fs.writeFileSync(targetPath, markdownReadme, 'utf-8')
    }
}

module.exports = MarkdownService