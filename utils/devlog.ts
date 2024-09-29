type devlogParams = Parameters<typeof console.log>;

const devlog = (...params: devlogParams) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(...params);
  }
};

export default devlog;
