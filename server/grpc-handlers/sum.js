//Unary
function SumRPC(call, callback) {
  console.log("Inside SumRPC");
  const val1 = call.request.val1;
  const val2 = call.request.val2;
  console.log("Values received", val1, val2);
  callback(null, { result: val1 + val2 });
}

module.exports = SumRPC;
