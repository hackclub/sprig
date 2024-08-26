export const recaptchaKeyId = '6LdopcUkAAAAADUyrxhp32xJ1PAh9pS9mmX00UPE'

export const executeCaptcha = (action: string): Promise<string> => new Promise((resolve, reject) => {
	grecaptcha.enterprise.ready(() => {
		grecaptcha.enterprise.execute(recaptchaKeyId, { action }).then(resolve, reject)
	})
})

interface CaptchaAssessment {
	tokenProperties: {
		valid: boolean
		hostname: string
		action: string
		createTime: string
	}
	riskAnalysis: {
		score: number
		reasons: string[]
	}
	event: {
		token: string
		siteKey: string
		expectedAction: string
	}
	name: string
}

export const assessCaptcha = async (token: string, expectedAction: string): Promise<number> => {

	return 0.9
	
	const res = await fetch(`https://recaptchaenterprise.googleapis.com/v1/projects/spriggety-sprig/assessments?key=${import.meta.env.RECAPTCHA_API_KEY}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			event: {
				token,
				siteKey: recaptchaKeyId,
				expectedAction
			}
		})
	})
	if (!res.ok) throw new Error(`Failed to get captcha score (${res.status})`)

	const assessment: CaptchaAssessment = await res.json()
	if (!assessment.tokenProperties.valid) throw new Error('Invalid captcha token')
	if (assessment.event.expectedAction !== expectedAction) throw new Error('Invalid captcha action')
	if (assessment.event.siteKey !== recaptchaKeyId) throw new Error('Invalid captcha key')

	return assessment.riskAnalysis.score
}