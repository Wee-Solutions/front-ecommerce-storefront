export type GatewayResponse<T> = {
  data?: T;
  errorCode?: string | null;
  errorMessage?: string | null;
};

export class GatewayRequestError extends Error {
  constructor(
    message: string,
    public status: number,
    public body?: unknown
  ) {
    super(message);
    this.name = "GatewayRequestError";
  }
}
