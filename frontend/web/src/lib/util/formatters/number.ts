export const formatNumber = (
  value: number | string,
  maxDecimal = 0,
  minDecimal = 0
): string | null => {
  if (!value && value !== 0) {
    return null;
  }

  if (typeof value !== 'number') {
    value = parseFloat(value) || 0;
  }

  return value.toLocaleString('en-US', {
    maximumFractionDigits: maxDecimal,
    minimumFractionDigits: minDecimal,
  });
};

export const formatBigNumber = (
  value: number | string,
  maxDecimal = 0,
  minDecimal = 0
): string | null => {
  if (!value && value !== 0) {
    return null;
  }

  if (typeof value !== 'number') {
    value = parseFloat(value) || 0;
  }

  let k = '';
  while (value >= 1000 && k.length <= 3) {
    k = k + 'K';
    value = value / 1000;
  }
  return (
    value.toLocaleString('en-US', {
      maximumFractionDigits: maxDecimal,
      minimumFractionDigits: minDecimal,
    }) + k
  );
};
