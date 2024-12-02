export const sleep = (time = 3000) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
//sleep return về 1 cái promise => chỉ có thể await được 1 cái promise
//t/c async await khi có return thì nó return 1 cái promise => cho dù nó là 1 cái number hay 1 cái string
