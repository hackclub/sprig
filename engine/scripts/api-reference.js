import * as _ts from 'typescript'
import fs from 'fs'

/**
 * @type {_ts}
 */
const ts = _ts.default

const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf-8').toString())

const formatFakeDeclaration = (source) => {
	const program = ts.createProgram([ source ], {
		...tsconfig,
		noEmit: true,
	})
	const sourceFile = program.getSourceFile(source)
	const checker = program.getTypeChecker()
	const sourceFileSymbol = checker.getSymbolAtLocation(sourceFile)
	const exports = checker.getExportsOfModule(sourceFileSymbol)
	const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

	let output = ''
	for (const node of exports) {
		const declaration = node.valueDeclaration || node.declarations[0]
		
		// Get the type of the node.
		let type
		if (ts.isTypeAliasDeclaration(declaration)) {
			type = printer.printNode(ts.EmitHint.Unspecified, declaration.type, sourceFile)
		} else if (ts.isInterfaceDeclaration(declaration) || ts.isClassDeclaration(declaration)) {
			const members = declaration.members.map(member => (
				printer.printNode(ts.EmitHint.Unspecified, member, sourceFile)
			)).join('\n').split('\n').map(line => '    ' + line).join('\n')
			type = '{\n' + members + '\n}'
		} else {
			type = checker.typeToString(checker.getTypeAtLocation(declaration))
		}
		if (type === 'any') {
			throw new Error(`Node "${node.name}" has type any!`)
		}

		// Format the node.
		if (ts.isFunctionDeclaration(declaration) || ts.isVariableDeclaration(declaration)) {
			output += `const ${node.name}: ${type}`
		} else if (ts.isTypeAliasDeclaration(declaration)) {
			output += `type ${node.name} = ${type}`
		} else if (ts.isInterfaceDeclaration(declaration)) {
			output += `interface ${node.name} ${type}`
		} else if (ts.isClassDeclaration(declaration)) {
			output += `class ${node.name} ${type}`
		} else {
			throw new Error(`Node "${node.name}" is of an unknown type`)
		}
		output += '\n'
	}
	output = output.trim()
	return output
}

const generateMarkdown = () => {
	return [
		'<!-- api -->',
		'',
		'### sprig',
		'',
		'```ts',
		formatFakeDeclaration('./src/api.ts'),
		'```',
		'',
		'### sprig/base',
		'',
		'```ts',
		formatFakeDeclaration('./src/base/index.ts'),
		'```',
		'',
		'### sprig/image-data',
		'',
		'```ts',
		formatFakeDeclaration('./src/image-data/index.ts'),
		'```',
		'',
		'### sprig/web',
		'',
		'```ts',
		formatFakeDeclaration('./src/web/index.ts'),
		'```',
		'',
		'<!-- apistop -->'
	].join('\n')
}

const readme = fs.readFileSync('README.md', 'utf-8').toString()
const newReadme = readme.replace(/<!-- api -->[\s\S]*<!-- apistop -->/, generateMarkdown())
fs.writeFileSync('README.md', newReadme)