// Based on https://repl.it/site/blog/infinite-loops by Amjad Masad.

export default function TransformDetectInfiniteLoop({ types: t }) {
	const MAX_ITERATIONS = 2000;
	const MAX_LOOP_TIME_MS = 1500;

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