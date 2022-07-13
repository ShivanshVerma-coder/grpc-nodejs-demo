const grpc = require("grpc");
const grpcHandlers = require("./grpc-handlers");
const LoadCalculatorPackageDefiniton = require("../utils/loadPackageDefinition");

function main() {
  const server = new grpc.Server();
  const calculatorPackageDefinition = LoadCalculatorPackageDefiniton();
  server.addService(
    calculatorPackageDefinition.CalculatorService.service,
    grpcHandlers
  );

  server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
  server.start();
  console.log("Server up and running");
}

main();
