export default (recipients) => {
    const emailRE = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // Discard any emails that are valid so that we're just left
    // with the invalid ones. Include check for empty strings caused
    // by trailing comma at end of list
    const invalidEmailArray = recipients
        .split(',')
        .map(recipient => recipient.trim())
        .filter(recipient => recipient && !emailRE.test(recipient));

    if (invalidEmailArray.length > 0) {
        return `These emails are invalid: ${invalidEmailArray}`;
    }
}