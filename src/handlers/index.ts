import { controller } from "../controllers";

export const crazySwapi = async (event: any) => {
  if (event.httpMethod) {
    const { httpMethod, path } = event;

    if (httpMethod === "GET") {
      if (path === "/fusion") {
       console.log("Received event for GET fusion:", JSON.stringify(event, null, 2));
       return controller.findFusion(event);
      }

      if (path === "/history") {
        console.log("Received event for GET history:", JSON.stringify(event, null, 2));
        return controller.findHistory(event);
      }
    }

    if (httpMethod === "POST") {
      if (path === "/store") {
        console.log("Received event for POST store:", JSON.stringify(event, null, 2));
        return controller.createStore(event);
      }
    }
  }

  console.error("Event unsupported type:", JSON.stringify(event));
  return {
    statusCode: 400,
    body: "Event unsupported type"
  };
};
