export function deepMerge(source, target) {
  const targetObj = source ? source : target && Array.isArray(target) ? [] : {}; // 判断复制的目标是数组还是对象
  const keys1 = Object.keys(source || {});
  const keys2 = Object.keys(target || {});
  if (keys2.length === 0) {
    return targetObj;
  }
  // 合并所有键值
  const keys = [...new Set([...keys1, ...keys2])];
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (
      (source && source.hasOwnProperty(key)) ||
      (target && target.hasOwnProperty(key))
    ) {
      const sourceValue = source ? source[key] : null;
      const targetValue = target ? target[key] : null;
      if (
        (sourceValue && typeof sourceValue === 'object') ||
        (targetValue && typeof targetValue === 'object')
      ) {
        if (sourceValue) {
          targetObj[key] = sourceValue;
        }
        if (targetValue) {
          targetObj[key] = targetValue;
        }
        // 递归
        targetObj[key] = deepMerge(sourceValue, targetValue);
      } else {
        // 赋值
        targetObj[key] = targetValue != null ? targetValue : sourceValue;
      }
    }
  }
  return targetObj;
}
