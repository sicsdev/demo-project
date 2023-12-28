export const makeCapital = (str) => {
    if (str?.includes(" ")) {
        return str
            .split(" ")
            .map((word) => word?.charAt(0).toUpperCase() + word?.slice(1).toLowerCase())
            .join(" ");
    } else {
        return str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();
    }
};

export const formatTitle = (text) => {
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

    // Function to convert URLs to lowercase
    const lowerCaseUrls = (match) => match.toLowerCase();

    // Lowercase words that should not be capitalized in titles
    let lowerCaseWords = ['of', 'or', 'and', 'an', 'a', 'with',"by"];

    // Splitting the text into lines and processing each line
    return text.split('\n').map(line => {
        // Checking if the line is a URL
        if (line.match(urlRegex)) {
            return line.toLowerCase();
        } else {
            // Formatting as title
            return line
                .toLowerCase()
                .split(' ')
                .map((word, index) => {
                    if (index === 0 || !lowerCaseWords.includes(word)) {
                        return word.charAt(0).toUpperCase() + word.slice(1);
                    }
                    return word;
                })
                .join(' ');
        }
    }).join('\n');
}