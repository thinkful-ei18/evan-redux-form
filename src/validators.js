export const numberCheck = value => {

  if (isNaN(Number(value)) && value !== undefined) {
    const err = new Error('Tracking number should be... a number');
    return err;
  }
};

export const lengthCheck = value => {
  if ( value && value.length !== 5) {
    const err = new Error('Length must be exactly 5 Numbers');
    return err;
  }
}

export const required = value => {
    if (!value) {
      const err = new Error('This field is required');
      return err;
    }
}