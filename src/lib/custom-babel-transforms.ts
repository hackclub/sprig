// Based on https://repl.it/site/blog/infinite-loops by Amjad Masad.

/*
* The infinite loop detection transform will detect infinite loops if the following conditions are met
* 1. There are more than 2000 iterations in the loop
* 2. The loop takes over 1.2 seconds to complete
* 
* NOTE: Please run the test in tests/inf-loop.test.ts to and make sure they all pass before commiting changes
*       Add new tests if new functionality is added in this infinite-loop detection code
*/
export default function TransformDetectInfiniteLoop({ types: t }: { types: any }) {
	const MAX_ITERATIONS = +import.meta.env.PUBLIC_MAX_ITERATIONS;
	const MAX_LOOP_TIME_MS = +import.meta.env.PUBLIC_MAX_LOOP_TIME_MS;
	return {
		visitor: {
			'WhileStatement|ForStatement|DoWhileStatement': (path: any) => {
				const startTime = t.identifier('startTime');
				path.scope.parent.push({
					id: startTime,
					init: t.numericLiteral(0)
				});

				// An iterator that is incremented with each iteration
				const iterator = t.identifier('loopIt');
				path.scope.parent.push({
					id: iterator,
					init: t.numericLiteral(0)
				});

				// re-initialize counter variable
				const countReInitializer = t.assignmentExpression('=', t.identifier(iterator.name), t.numericLiteral(0));
				// re-initialize counter variable for this loop
				path.insertBefore(t.expressionStatement(countReInitializer));

				// re-initialize time variable
				// will begin counting execution time from before the loop starts
				const timeReInitializer = t.assignmentExpression('=', t.identifier('startTime'), t.callExpression(
					t.identifier('performance.now'),
					[]
				));
				path.insertBefore(t.expressionStatement(timeReInitializer));


				/*
				* throw RangeError if loop
				* 1. does over MAX_ITERATIONS iterations
				* 2. takes more than MAX_LOOP_TIME_MS to complete 
				*/
				const guard = t.ifStatement(
					t.logicalExpression(
						'&&',
						t.binaryExpression(
							'>',
							t.updateExpression(
								'++',
								iterator,
								true,
							),
							t.numericLiteral(MAX_ITERATIONS),
						),
						t.binaryExpression(
							'>',
							t.binaryExpression(
								'-',
								t.callExpression(t.identifier('performance.now'), []),
								startTime
							),
							t.numericLiteral(MAX_LOOP_TIME_MS)
						),
					),
					t.throwStatement(
						t.newExpression(
							t.identifier('RangeError'),
							[t.stringLiteral(
								'Potential infinite loop',
							)],
						),
					),
				);

				// No block statment e.g. `while (1) 1;`
				if (!path.get('body').isBlockStatement()) {
					const statement = path.get('body').node;
					path.get('body').replaceWith(
						t.blockStatement([
							guard,
							statement,
						]),
					);
				} else {
					path.get('body').unshiftContainer('body', guard);
				}
			}
		}
	}
}

// this exists for the sole purpose of carrying along the line and column number
// when throwing an error in the 'BuildDuplicateFunctionDetector' traversal below
class TransformError extends SyntaxError {
	public loc: any
	constructor(message: string, loc: any) {
		super(message)
		this.loc = loc
	}
}

export function BuildDuplicateFunctionDetector(engineApiKeys: string[]) {
	return function () {
		return {
			visitor: {
				"FunctionDeclaration": (path: any) => {
					const functionName = path.node.id.name;
					if (engineApiKeys.includes(functionName)) {
						const loc = path.node.loc.start;
						throw new TransformError(`Cannot redeclare built-in function: ${functionName} (${loc.line}:${loc.column})`, loc);
						// throw path.buildCodeFrameError(`Cannot redeclare built-in function: ${functionName}`);
					}
				}
			}
		}
	}

}

export function dissallowBackticksInDoubleQuotes() {
	return {
		visitor: {
			StringLiteral(path: any) {
				const { value, extra } = path.node;
				if (value.includes('`')) {
					const loc = path.node.loc.start;
					const quoteType = extra.raw[0];
					throw path.buildCodeFrameError(`Backtick found within ${quoteType === '"' ? 'double' : 'single'}-quoted string at (${loc.line}:${loc.column})`);
				}
			}
		}
	}
}