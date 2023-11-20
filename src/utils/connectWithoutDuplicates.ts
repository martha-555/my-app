/** @format */

type itemWithId = {
  id: number;
};
const connectWithoutDuplicates = <ArrayType extends itemWithId[]>(
  array1: ArrayType,
  array2: ArrayType
): ArrayType => {
  const ids = array1.map((item) => item.id);

  const data = array2.filter((item) => ids.includes(item.id) === false);

  return [...array1, ...data] as ArrayType;
};

export default connectWithoutDuplicates;
