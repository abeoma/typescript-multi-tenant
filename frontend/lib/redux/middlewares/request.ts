/* eslint-disable max-classes-per-file */
import { get } from "lodash-es";

type RquestData = { [k in string]: unknown };

type CommonArgs = {
  endpoint: string;
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

const execute = (
  args: RequestArgs,
  fetchOptions: RequestInit
): Promise<Response> => {
  const preparedFetch = (endpoint: string, options: RequestInit) => {
    return fetch(endpoint, {
      ...fetchOptions,
      ...options,
    });
  };

  const { endpoint, method } = args;
  switch (method) {
    case "GET": {
      const finalEndpoint = args.data
        ? `${endpoint}?query=${encodeURIComponent(JSON.stringify(args.data))}`
        : endpoint;
      return preparedFetch(finalEndpoint, { method: "get" });
    }
    case "DELETE": {
      return preparedFetch(endpoint, { method: "delete" });
    }
    case "POST":
    case "PUT": {
      const options: RequestInit = { method: args.method };

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

      return preparedFetch(endpoint, options);
    }
    default: {
      const msg = `Invalid args="${args}"`;
      // eslint-disable-next-line no-console
      console.error(msg);
      throw new Error(msg);
    }
  }
};

export const executeRequest = async (
  args: RequestArgs,
  fetchOptions: RequestInit
): Promise<string | Record<string, unknown>> => {
  const res = await execute(args, fetchOptions);
  if (res.status !== args.successCode) {
    throw new HttpStatusError(`Http status=${res.status}`, res);
  }

  const jsonData: { meta: { status: number } } = await res.json();

  if (!jsonData.meta.status) {
    // eslint-disable-next-line no-console
    console.error(`APIStatus=${jsonData.meta.status}`, jsonData);
    throw new ApiError(`APIStatus=${jsonData.meta.status}`, jsonData);
  }
  return jsonData;
};
