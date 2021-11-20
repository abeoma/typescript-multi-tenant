import { get } from "lodash-es";

type RquestData = { [k in string]: unknown };

type CommonArgs = {
  endpoint: string;
  raw?: boolean;
  successCode?: number;
};

export type GetArgs = {
  method: "GET";
  data?: RquestData;
} & CommonArgs;

export type PostArgs = {
  method: "POST";
  data?: RquestData;
  formData?: FormData;
  file?: File;
} & CommonArgs;

export type PutArgs = {
  method: "PUT";
  data?: RquestData;
  formData?: FormData;
  file?: File;
} & CommonArgs;

export type DeleteArgs = {
  method: "DELETE";
} & CommonArgs;

export type RequestArgs = GetArgs | PostArgs | PutArgs | DeleteArgs;

class HttpStatusError extends Error {
  public status: number;
  public constructor(msg: string, res: Response) {
    super(msg);
    this.status = res.status;
  }
}

export class ApiError extends Error {
  public responseJsonData: Record<string, unknown>;
  public errcode: string | unknown;
  public constructor(msg: string, responseJsonData: Record<string, unknown>) {
    super(msg);
    this.errcode = get(responseJsonData, "meta.errcode");
    this.responseJsonData = responseJsonData;
  }
}

export async function executeRequest(
  args: RequestArgs,
  fetchOptions: RequestInit
): Promise<string | Record<string, unknown>> {
  const { endpoint, raw, successCode = 200 } = args;

  function preparedFetch(endpoint: string, options: RequestInit) {
    return fetch(endpoint, {
      ...fetchOptions,
      ...options,
    });
  }

  async function execute(): Promise<Response> {
    switch (args.method) {
      case "GET": {
        const finalEndpoint = args.data
          ? `${endpoint}?query=${encodeURIComponent(JSON.stringify(args.data))}`
          : endpoint;
        return await preparedFetch(finalEndpoint, { method: "get" });
      }
      case "DELETE": {
        return await preparedFetch(endpoint, { method: "delete" });
      }
      case "POST":
      case "PUT": {
        const options: RequestInit = {
          method: args.method,
        };

        if (args.data && args.formData) {
          throw new Error("API call can't have data and formData together.");
        } else if (args.data) {
          options.body = JSON.stringify(args.data);
          options.headers = {
            "Content-Type": "application/json",
          };
        } else if (args.formData) {
          options.body = args.formData;
        } else if (args.file) {
          options.body = args.file;
        }

        return await preparedFetch(endpoint, options);
      }
      default: {
        const msg = `Invalid args="${args}"`;
        console.error(msg);
        throw new Error(msg);
      }
    }
  }

  const res = await execute();
  if (res.status !== successCode) {
    throw new HttpStatusError(`Http status=${res.status}`, res);
  }

  if (raw) {
    return await res.text();
  }
  const jsonData = await res.json();

  if (!jsonData.meta.status) {
    console.error(`APIStatus=${jsonData.meta.status}`, jsonData);
    throw new ApiError(`APIStatus=${jsonData.meta.status}`, jsonData);
  }
  return jsonData;
}
