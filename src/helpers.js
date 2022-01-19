const helpers = {
  fetchData: async (resource, init) => {
    const result = await fetch(resource, init)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch. ${
              response.status ? `Status: ${response.status}` : ''
            } ${
              response.statusText ? `Details: ${response.statusText}` : ''
            }`.trim()
          );
        }
        return response;
      })
      .then((data) => data.json());
    return result;
  },
  truncateText: (text, maxLength) =>
    text.length > maxLength ? `${text.substring(0, maxLength - 3)}...` : text,
  getDateLocalString: (date, locales, timeZone) =>
    date.toLocaleString(locales, { timeZone }),
};

export default helpers;
