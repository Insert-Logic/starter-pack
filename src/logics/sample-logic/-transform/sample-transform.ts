import type { Task } from 'types/index';

const createTransform = (context: Task) => {
  console.log(context);
};

export default createTransform;

//TEST running a transform
// if (process.env.NODE_ENV !== 'production') {
//     const newContext = {};
//   createTransform(newContext);
// }

// For testing run: npx tsx --env-file=.env src/logics/logic-name/-transform/transform-name.ts
