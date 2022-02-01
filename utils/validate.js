export default function validate (code) {
    let error;
    let success = true;
    try {
        esprima.parse(code, { tolerant: true, loc: true });
    } catch (err) {
        success = false;
        let colsBefore = code.split('\n').slice(0, err.lineNumber - 1).join('\n').length;
        error = {
            line: err.lineNumber,
            col: err.lineNumber == 1 ? err.index - colsBefore + 1 : err.index - colsBefore,
            message: err.description
        }
    }
    return {
        error,
        success,
        code
    };
}