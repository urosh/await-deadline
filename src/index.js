const errorMessages = {
  noLimit: 'No limit set.',
  noFunction: 'No callback provided.',
  limtNotNumber: 'Unable to parse the limt.',
  timeout: 'Request timed out'
}

module.exports = {
  run: async (
    limit,
    func,
    ...params
  ) => {
    let funcTimeout;
    return new Promise(async (resolve, reject) => {
      if (limit === 'undefined') {
        reject(errorMessages.noLimit);
      }

      if (isNaN(Number(limit))) {
        reject(errorMessages.limtNotNumber);
      }

      if (typeof func !== 'function') {
        reject(errorMessages.noFunction);
      }

      let resolved = false;
      funcTimeout = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          reject(errorMessages.timeout);
        }
      }, limit);
      try {
        const response = await func(...params);
        if (!resolved) {
          clearTimeout(funcTimeout);
          resolved = true;
          resolve(response);
        }
      } catch (err) {
        if (!resolved) {
          clearTimeout(funcTimeout);
          resolved = true;
          reject(err);
        }
      }
    });
  }

}
