const DebounceSubmitForm = (formattedValue, Submission, setTypingTimeout, typingTimeout) => {
    if (typingTimeout) {
        clearTimeout(typingTimeout);
    }
    const newTypingTimeout = setTimeout(() => {
        Submission(formattedValue);
    }, 2000);
    setTypingTimeout(newTypingTimeout);
};

export { DebounceSubmitForm };