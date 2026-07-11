import axios from "axios";

type ApiErrorBody = {
  message?: string;
  detail?: string;
};

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    const data = error.response?.data;
    return data?.message ?? data?.detail ?? "Request failed. Please try again.";
  }

  return "Something went wrong. Please try again.";
}

