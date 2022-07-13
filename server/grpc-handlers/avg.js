//Client-Side Streaming
//listening to events
function avgRPC(call, callback) {
  console.log("Inside AvgRPC");
  let count = 0;
  let sum = 0;
  call.on("data", (request) => {
    console.log("Number to Calculate AVG Received", request.num);
    count++;
    sum += request.num;
  });
  call.on("end", () => {
    console.log("Client Side Streaming Ended For Calculating AVG...");
    console.log("Sending AVG...");
    callback(null, { result: sum / count }); //structuring it in actual response format as in proto
  });
}

module.exports = avgRPC;
