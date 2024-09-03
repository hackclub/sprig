
## Getting new Sprig Stuck Action Items
Run `/slacker list sprig stuck` to get all action items regarding sprig-stuck-requests.

You can also find the stuck requests in [this Airtable](https://airtable.com/appN9cSnDgORAM2bp/tblmTt3QRC1keqBh6/viw4MPdvZbRM0XASL?blocks=hide).

## Following up with stuck-requests

Add the code with a fix under the "Fixed Code" column in [this Airtale](https://airtable.com/appN9cSnDgORAM2bp/tblmTt3QRC1keqBh6/viw4MPdvZbRM0XASL?blocks=hide)

If there's no code change to make, or there is no possible answer to the request. Fill in `N/A` under the "Fixed Code" column.

### Email template

Hey,

This is a response to the stuck request you sent.

In the description you wrote: `Description`

After careful investigation, we have identified the following issues in your code:

1. `Issue` on line `Line`.
2. ...

Here is a fix for the issues stated above, respectively

1. `Explanation`
   `Fix`
2. ...

Thank you for your patience.

Kindly,
`Name`.

### Email template to use if there are no errors or description

Hey,

This is a response to your stuck request.

Thank you for reaching out for assistance. Unfortunately, it seems that your request didn't include specific details or actionable information that would allow us to address your issue effectively.

This information will enable us to offer a more accurate and timely solution to your request. Feel free to respond with the necessary details, and we'll do our best to assist you.

Thank you for your understanding.

Kindly,
`Name`

After sending the email, please create a new record in [this Airtable](https://airtable.com/appN9cSnDgORAM2bp/tblU5A9l1H53a18yy/viwgD4xFcb4RVV0u1?blocks=hide) with the your name, the email you sent and a reference to the request you sent.

![stuck request response](./assets/stuck_response_ex1.png)

### Data Schema for Stuck Requests

Stuck Request
```ts
StuckRequest = {
	Code: String,
	Email: String
	Session Length: Float // time in seconds
	Error Log: String, // list of errors in captured
	Description: String,
	Category: "Logic Error" | "Syntax Error" | "Other"
}
```

Structure of truth data

```ts
Responder: String, // name of person responding to the stuck request
Email: String // email text being sent
Stuck Data: StuckData // a reference to the stuck request being responded to
```
