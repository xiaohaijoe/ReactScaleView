export const encode = encodeURIComponent;

export const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
export const omitSlug = article =>
  Object.assign({}, article, { slug: undefined });

/**
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
export function to(promise, errorExt) {
  return promise
    .then(data => [null, data])
    .catch(err => {
      if (errorExt) {
        Object.assign(err, errorExt);
      }

      return [err, undefined];
    });
}

export function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
