import apiClient from "./api.client";

class HTTPService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  //get all objects from api request
  getAll<T>(method: string) {
    //abort controller handles user cancels
    const controller = new AbortController();

    //api request
    const request = apiClient.get<T[]>(this.endpoint + method, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  putItem(method: string, body: any) {
    const controller = new AbortController();

    const request = apiClient.put(this.endpoint + method, body, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  postItem(method: string, body: any) {
    const controller = new AbortController();

    const request = apiClient.post(this.endpoint + method, body, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }
}

export interface Response {
  data: unknown;
}

const create = (endpoint: string) => new HTTPService(endpoint);

export default create;
