type TranslationData = Record<string, string> & { lang: string }
type TranslationModule = { default: TranslationData }

const translationModules = Object.values(
	import.meta.glob<TranslationModule>('/src/translations/*.json', { eager: true })
)

export const getSprikipediaTranslation = (lang: string | null | undefined): TranslationData => {
	const selectedLang = lang ?? 'en_US'

	return (
		translationModules.find((translation) => translation.default.lang === selectedLang)?.default
		?? translationModules.find((translation) => translation.default.lang === 'en_US')?.default
		?? ({ lang: selectedLang } as TranslationData)
	)
}

type TutorialModule = {
	file: string
	compiledContent: () => string | Promise<string>
}

const tutorialFilePattern = /^.*\/(.+)-(\d+)\.md$/
const tutorialModules = Object.values(
	import.meta.glob<TutorialModule>('/games/*.md', { eager: true })
)

export const getGameTutorialContent = async (tutorialName: string): Promise<string[] | undefined> => {
	const matchingTutorials = tutorialModules
		.map((tutorial) => ({ tutorial, match: tutorial.file.match(tutorialFilePattern) }))
		.filter((entry) => entry.match?.[1] === tutorialName)
		.sort((a, b) => Number(a.match?.[2] ?? 0) - Number(b.match?.[2] ?? 0))

	if (!matchingTutorials.length) return undefined

	return Promise.all(
		matchingTutorials.map(({ tutorial }) => tutorial.compiledContent())
	)
}
