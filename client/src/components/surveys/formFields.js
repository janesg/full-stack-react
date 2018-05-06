// Note: name properties match exactly those specified in server route '/api/surveys'
export default [
    { label: 'Survey Title', name: 'title', noValueMsg: 'Please provide a title' },
    { label: 'Subject Line', name: 'subject', noValueMsg: 'Please provide a subject' },
    { label: 'Email Body', name: 'body', noValueMsg: 'Please provide text for the email body' },
    { label: 'Recipient List', name: 'recipients', noValueMsg: 'Please provide one or more comma-separated email addresses' }
];
