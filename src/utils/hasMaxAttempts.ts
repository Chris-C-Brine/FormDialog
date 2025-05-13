
const hasMaxAttempts = (maxAttempts?: number): maxAttempts is number => {
  return !!maxAttempts && isFinite(maxAttempts);
}

hasMaxAttempts.displayName = "hasMaxAttempts"

export default hasMaxAttempts;
