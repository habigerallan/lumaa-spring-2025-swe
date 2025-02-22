function ParserMiddleware(req, res, next) {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', () => processBody(req, res, body, next));

    req.on('error', () => handleBodyError(res));
}

function processBody(req, res, body, next) {
    if (!body) {
        req.body = {};
        return next();
    }

    try {
        req.body = JSON.parse(body);
    } catch {
        return handleInvalidFormat(res);
    }

    next();
}

function handleInvalidFormat(res) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Invalid request body format');
}

function handleBodyError(res) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Error reading request body');
}

export default ParserMiddleware;
