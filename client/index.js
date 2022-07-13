const grpc = require("grpc");
const LoadCalculatorPackageDefiniton = require("../utils/loadPackageDefinition");

function CalculateSum(client) {
  const request = {
    val1: 3,
    val2: 4,
  };
  client.sum(request, (error, response) => {
    if (!error)
      return console.log(
        `${request.val1} + ${request.val2} =`,
        response.result
      );
    return console.error(error);
  });
}

function CalculateAVG(client) {
  //just to show correct implementation we have created a function
  const constructRequest = (num) => {
    return { num: num };
  };
  const request = {};
  const call = client.avg(request, (error, response) => {
    //this function doesnt runs here..like in unary...it is used through call.write...even if we try to run it like unary it wont run
    if (error) return console.error(error);
    console.log("AVG = ", response.result);
  });
  const arr = [10, 20, 30, 40];
  let index = 0;
  intervalID = setInterval(() => {
    call.write(constructRequest(arr[index++]));
    if (index === arr.length) {
      clearInterval(intervalID);
      call.end();
    }
  }, 2300);
}

function CalculateFactors(client) {
  const request = {
    num: 120,
  };
  const call = client.fac(request, (error, response) => {
    if (error) console.error(error);
    console.log(response.result);
  });
  call.on("data", (response) => {
    console.log("Factor Found :", response.result);
  });
  call.on("end", () => {
    console.log("Server Side streaming ended");
  });
  call.on("error", (err) => console.error(err));
}

//To have much visual exp we ar eusing setInterval
function CalculateMaximum(client) {
  const request = { num: -1 };
  //no data is sent to server from this below line..only streaming data is sent through call.write
  const call = client.max(request, (error, response) => {
    if (error) console.log(error);
    console.log("Response in calcMax from server ", response.result);
  });
  call.on("data", (response) => {
    console.log("Max till now sent by Server", response.result);
  });
  call.on("end", () => {
    console.log("End triggered in Bidi Client \nServer not streaming anymore");
  });
  const arr = [5, 1, 5, 69, 124, 4, 444, 4, 529, 4];
  let index = 0;
  intervalID = setInterval(() => {
    call.write({ num: arr[index++] }); //this sends stream data
    if (index === arr.length) {
      clearInterval(intervalID);
      call.end(); //this will send an end event in server
    }
  }, [2000]);
}

function main() {
  const calculatorPackageDefinition = LoadCalculatorPackageDefiniton();
  const client = new calculatorPackageDefinition.CalculatorService(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );
  //remove comments and run one by one
  //you can run all of them at once but it will create chaos in terminal XD

  //   CalculateSum(client);
  //   CalculateAVG(client);
  //   CalculateFactors(client);
  CalculateMaximum(client);
}
main();
