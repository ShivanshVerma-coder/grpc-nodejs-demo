//BiDi Streaming
//Server listening on events as well as sending events when necessary

function MaxRPC(call, callback) {
  console.log("Inside MaxRPC");
  let max = 0;
  call.on("data", (request) => {
    console.log("Number to Calculate Max received: ", request.num);
    if (request.num > max) {
      max = request.num;
      call.write({ result: max }); //sending it in response format as in proto
    }
  });
  call.on("error", (error) => {
    console.error(error);
    call.end();
  });
  call.on("end", () => {
    console.log("Client Streaming Ended For Calculating Max");
    call.end(); //on receiving a end event from client we end it from server as well....depends upon on usecase if we want to keep on listening then we wont mention it here
  });
}

module.exports = MaxRPC;
