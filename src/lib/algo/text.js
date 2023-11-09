const link = /(https?:\/\/[^ ]+) ?(\(.*\)|[^ ]+)?/g;

function getText(link, text) {
    if (text) {
        if (text[0] === '(' && text[text.length - 1] === ')') {
            return text.slice(1, text.slice(1, text.length - 1));
        }
        return text;
    }
    return link.slice(link.indexOf('://') + 3);
    
}
function addLink(text, texts) {
    let i = 0;

    for (const res of text.matchAll(link)) {
        if (i < res.index) {
            addText(text.slice(i, res.index), texts);
        }
        texts.push([res[1], getText(res[1], res[2])]);
        i = res.index + res[0].length;
    }
    if (i === 0) {
        addText(text, texts);
    } else if (i < text.length) {
        addText(text.slice(i), texts);
    }
}

function addCode(text, texts) {
    texts.push(text === '' ? null : [text]);
}

function addText(text, texts) {
    let k = false;

    text.split('\n').forEach(t => {
        if (k) {
            texts.push(null);
        } else {
            k = true;
        }
        texts.push(t);
    })
}

export function parse(text) {
    const texts = [];
    let odd = false;

    text.split('`').forEach((t) => {
        if (odd) {
            addCode(t, texts);
        } else {
            addLink(t, texts);
        }
        odd = !odd;
    });
    let block = [];
    const blocks = [];

    texts.forEach((t) => {
        if (t) {
            block.push(t);
        } else {
            if (block.length > 0) {
                blocks.push(block);
                block = [];
            }
        }
    });
    if (block.length > 0) {
        blocks.push(block);
    }
    return blocks;
}
