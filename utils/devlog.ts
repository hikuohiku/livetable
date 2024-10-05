type devlogParams = Parameters<typeof console.log>;

const devlog = (...params: devlogParams) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(...params);
  }
};

type devTimeParams = Parameters<typeof console.time>;

const devTime = (...params: devTimeParams) => {
  if (process.env.NODE_ENV === 'development') {
    console.time(...params);
  }
};

type devTimeEndParams = Parameters<typeof console.timeEnd>;

const devTimeEnd = (...params: devTimeEndParams) => {
  if (process.env.NODE_ENV === 'development') {
    console.timeEnd(...params);
  }
};

export { devTime, devTimeEnd };
export default devlog;
