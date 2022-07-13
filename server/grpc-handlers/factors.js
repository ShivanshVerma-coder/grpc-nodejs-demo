//Server Side streaming
//Client listens on events
function factorsRPC(call, callback) {
  console.log("Inside Factors RPC");
  const num = call.request.num;
  for (let i = 2; i < num; i++) {
    if (num % i === 0) call.write({ result: i });
  }
  call.end();
}

module.exports = factorsRPC;
