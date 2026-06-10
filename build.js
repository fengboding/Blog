#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const MD_DIR = path.join(__dirname, 'data', 'posts');
const IMG_DIR = path.join(__dirname, 'data', 'assets');
const DATA_DIR = path.join(__dirname, 'data');
const CONFIG_DIR = path.join(__dirname, 'data', 'config');

function ensureDirectories() {
    [MD_DIR, IMG_DIR, DATA_DIR, CONFIG_DIR].forEach(dir => {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    });
}

function parseFrontmatter(text) {
    const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) return { data: {}, content: text };
    const data = {};
    match[1].split('\n').forEach(line => {
        const idx = line.indexOf(':');
        if (idx > 0) {
            const key = line.substring(0, idx).trim();
            let val = line.substring(idx + 1).trim();
            if (val.startsWith('"') && val.endsWith('"')) {
                val = val.slice(1, -1);
            }
            if (val.startsWith('[')) {
                try { val = JSON.parse(val); } catch(e) { val = [val.replace(/[\[\]"]/g, '')]; }
            }
            data[key] = val;
        }
    });
    return { data, content: match[2] };
}

function processMarkdownFiles() {
    const posts = [];
    const allTags = new Set();

    if (!fs.existsSync(MD_DIR)) {
        console.warn('Markdown directory not found:', MD_DIR);
        return { posts: [], tags: [] };
    }

    const files = fs.readdirSync(MD_DIR).filter(f => f.endsWith('.md'));

    files.forEach(file => {
        try {
            const filePath = path.join(MD_DIR, file);
            const content = fs.readFileSync(filePath, 'utf8');
            const { data, content: body } = parseFrontmatter(content);

            if (Object.keys(data).length === 0) {
                console.warn('Skipping ' + file + ': no frontmatter found');
                return;
            }

            let description = data.description || '';

            posts.push({
                id: file.replace('.md', ''),
                title: data.title || 'Untitled',
                date: data.date || new Date().toISOString().split('T')[0],
                description: description,
                tags: Array.isArray(data.tags) ? data.tags : [],
                filename: file
            });

            if (Array.isArray(data.tags)) {
                data.tags.forEach(tag => allTags.add(tag));
            }
        } catch (err) {
            console.error(`Error processing ${file}:`, err.message);
        }
    });

    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    const tags = Array.from(allTags).sort().map(tag => ({
        name: tag,
        count: posts.filter(p => p.tags.includes(tag)).length
    }));

    return { posts, tags };
}

function saveJSON(filename, data) {
    fs.writeFileSync(path.join(DATA_DIR, filename), JSON.stringify(data, null, 2), 'utf8');
    console.log('Created: data/' + filename);
}

function main() {
    console.log('Starting build...\n');
    ensureDirectories();
    const { posts, tags } = processMarkdownFiles();
    console.log('Found ' + posts.length + ' posts, ' + tags.length + ' tags\n');
    saveJSON('posts.json', posts);
    saveJSON('tags.json', tags);

    const configPath = path.join(CONFIG_DIR, 'config.json');
    if (!fs.existsSync(configPath)) {
        const defaultConfig = {
            github: 'https://github.com/your-username',
            email: 'hello@example.com',
            links: [
                { title: 'GitHub', url: 'https://github.com/your-username', description: 'My GitHub profile' }
            ],
            about: 'data/config/about.md'
        };
        fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2), 'utf8');
        console.log('Created: data/config/config.json');
    } else {
        console.log('config.json already exists, skipping');
    }

    console.log('\nBuild completed!');
}

main();