import type { AnyType } from "@/model/common.ts";
import type { AxiosRequestConfig } from "axios";
import request from "./instance";

type ResponseType<T> = Promise<ResponeTypeValue<T>>;

interface RequestParamsInstance {
  url: string;
  data?: Record<string, AnyType>;
  config?: Record<string, AnyType>;
}

export type ResponeTypeValue<T> = {
  metadata: AnyType;
  dataset: AnyType;
  data: T;
  code: string;
  message: string;
  seuucess: boolean;
};

export async function GET<T = AnyType>(
  url: string,
  opts?: AxiosRequestConfig
): Promise<T> {
  const options: AxiosRequestConfig = {
    url,
    method: "GET",
    ...opts
  };
  return request(options)
    .then((result) => {
      return result as unknown as T;
    })
    .catch((err) => {
      return err as unknown as T;
    });
}

export async function POST<T = AnyType>({
  url,
  data,
  config
}: RequestParamsInstance): ResponseType<T> {
  return request
    .post(url, data, config)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err));
}
