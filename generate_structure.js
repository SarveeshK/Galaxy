const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const outputFile = path.join(rootDir, 'project_structure.html');

const ignoreDirs = ['node_modules', '.git', 'dist', '.vscode', '.idea'];
const ignoreFiles = ['.DS_Store', 'project_structure.html', 'generate_structure.js'];

function generateTree(dir, prefix = '') {
    let html = '';
    const items = fs.readdirSync(dir, { withFileTypes: true });

    // Sort: directories first, then files
    items.sort((a, b) => {
        if (a.isDirectory() && !b.isDirectory()) return -1;
        if (!a.isDirectory() && b.isDirectory()) return 1;
        return a.name.localeCompare(b.name);
    });

    for (const item of items) {
        if (ignoreDirs.includes(item.name) || ignoreFiles.includes(item.name)) continue;

        const fullPath = path.join(dir, item.name);
        const relativePath = path.relative(rootDir, fullPath); // Not strictly used for links but good for debugging if needed

        html += '<li>';
        if (item.isDirectory()) {
            html += `<span class="caret">${item.name}/</span>`;
            html += `<ul class="nested">`;
            html += generateTree(fullPath);
            html += `</ul>`;
        } else {
            // Basic file extension detection for icons (approximated with CSS or simple text)
            html += `<span class="file">${item.name}</span>`;
        }
        html += '</li>';
    }
    return html;
}

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Structure - Galaxy</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #1e1e1e; color: #d4d4d4; padding: 20px; }
        h1 { color: #569cd6; }
        ul, #myUL { list-style-type: none; }
        #myUL { margin: 0; padding: 0; }
        .caret { cursor: pointer; user-select: none; color: #dcdcaa; font-weight: bold; }
        .caret::before { content: "\\25B6"; color: #888; display: inline-block; margin-right: 6px; font-size: 0.8em; transition: transform 0.2s; }
        .caret-down::before { transform: rotate(90deg); }
        .nested { display: none; padding-left: 20px; border-left: 1px solid #333; margin-left: 5px; }
        .active { display: block; }
        .file { color: #9cdcfe; }
        li { margin: 2px 0; }
        .download-btn {
            position: fixed; top: 20px; right: 20px;
            padding: 10px 20px; background-color: #0e639c; color: white;
            border: none; border-radius: 4px; cursor: pointer; font-size: 14px;
            text-decoration: none;
        }
        .download-btn:hover { background-color: #1177bb; }
    </style>
</head>
<body>
    <h1>Project Structure: Galaxy</h1>
    <a href="data:text/html;charset=utf-8,${encodeURIComponent('<html>...</html>') /* Placeholder, will be replaced by logic below if we wanted self-DL, but user asks for the file itself */}" 
       download="project_structure.html" class="download-btn" onclick="this.href='data:text/html;charset=utf-8,'+encodeURIComponent(document.documentElement.outerHTML)">Download HTML</a>

    <ul id="myUL">
        ${generateTree(rootDir)}
    </ul>

    <script>
        var toggler = document.getElementsByClassName("caret");
        var i;

        for (i = 0; i < toggler.length; i++) {
            toggler[i].addEventListener("click", function() {
                this.parentElement.querySelector(".nested").classList.toggle("active");
                this.classList.toggle("caret-down");
            });
        }
        
        // Expand all by default
        var allNested = document.querySelectorAll('.nested');
        for(var j=0; j<allNested.length; j++) {
            allNested[j].classList.add('active');
            allNested[j].parentElement.querySelector('.caret').classList.add('caret-down');
        }
    </script>
</body>
</html>
`;

fs.writeFileSync(outputFile, htmlContent);
console.log('Project structure HTML generated at:', outputFile);
