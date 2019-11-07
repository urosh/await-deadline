# await-deadline

### What happens if the JavaScript promise never resolves? 
Which ever part of the code is awaiting on the promise will hang indefinetly. 

How cool would it be to have a built in functionality on the Promise library itself to set the time limit on how long do we want to wait for the promise before throwing an error. 

One way of sorting this problem is through using the [**await-the**](https://www.npmjs.com/package/await-the) package that gives you much more than just handle the Promise not resolving issue. 

In our case, we provide simple library that handles only the non resolving issue. Basiclly when you have a Promise that might either take too long to resolve, and you don't want to be stuck until this happens, or that doesn't resolve at all, you can import the **npm-deadline** and use it like in the example: 

```
const awaitDeadline = require('await-deadline');

const response = await awaitDeadline.run(timeLimit, myFunction, funcParam1, funcParam2);
```

`timeLimit` is a number in miliseconds that we want to wait for the response
`myFunction` is the async function we want to call
After that we can pass as many parameters to the function as we need. Also its possible to pass no params at all. 
