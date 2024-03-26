export type HTTP_METHODS =
  | 'GET'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'PURGE'
  | 'LINK'
  | 'UNLINK'

export type FetchContextType = {
  fetcher?(
    url: string,
    config: FetchConfigType
  ): Promise<{
    json?: any
    data?: any
    status?: number
    blob?: any
    text?: any
  }>
  headers?: any
  baseUrl?: string
  resolver?: (r: Response) => any
  query?: any
  params?: any
} & Omit<RequestInit, 'body'>

export type CustomResponse<T> = Omit<Response, 'json'> & {
  json(): Promise<T>
}

export type RequestWithBody = <R = any, BodyType = any>(
  /**
   * The request url
   */
  url: string,
  /**
   * The request configuration
   */
  reqConfig?: Omit<RequestInit & FetchConfigType<R, BodyType>, 'suspense'> & {
    /**
     * Default value
     */
    default?: R
    /**
     * Request query
     */
    query?: any
    /**
     * The function that formats the body
     */
    formatBody?: any
    /**
     * Request params (like Express)
     */
    params?: any
    /**
     * The function that returns the resolved data
     */
    resolver?: (r: CustomResponse<R>) => any
    /**
     * A function that will run when the request fails
     */
    onError?(error: Error): void
    /**
     * A function that will run when the request completes succesfuly
     */
    onResolve?(data: R, res: CustomResponse<R>): void
  }
) => Promise<{
  error: any
  data: R
  config: RequestInit
  status: number
  res: CustomResponse<R>
}>

/**
 * An imperative version of the `useFetch` hook
 */
export type ImperativeFetch = {
  get: RequestWithBody
  delete: RequestWithBody
  head: RequestWithBody
  options: RequestWithBody
  post: RequestWithBody
  put: RequestWithBody
  patch: RequestWithBody
  purge: RequestWithBody
  link: RequestWithBody
  unlink: RequestWithBody
  config?: FetchInit
}

export type FetchConfigType<FetchDataType = any, BodyType = any> = Omit<
  RequestInit,
  'body' | 'headers'
> & {
  headers?: any
  fetcher?(
    url: string,
    config: FetchConfigType<FetchDataType, BodyType>
  ): Promise<{
    json?: any
    data?: any
    status?: number
    blob?: any
    text?: any
  }>
  body?: any
  /**
   * Any serializable id. This is optional.
   */
  id?: any
  /**
   * url of the resource to fetch
   */
  url?: string
  /**
   * Default data value
   */
  default?: FetchDataType
  /**
   * Function to run when request is resolved succesfuly
   */
  onResolve?: (data: FetchDataType, res?: Response) => void
  /**
   * Function to run when the request fails
   */
  onError?: (error: Error, req?: Response) => void
  /**
   * Parse as json by default
   */
  resolver?: (d: CustomResponse<FetchDataType>) => any

  /**
   * Override base url
   */
  baseUrl?: string
  /**
   * Request method
   */
  method?: HTTP_METHODS
  /**
   * URL search params
   */
  query?: any
  /**
   * URL params
   */
  params?: any
  /**
   * Customize how body is formated for the request. By default it will be sent in JSON format
   * but you can set it to false if for example, you are sending a `FormData`
   * body, or to `b => serialize(b)` for example, if you want to send JSON data
   * (the last one is the default behaviour so in that case you can ignore it)
   */
  formatBody?: boolean | ((b: BodyType) => any)
}

// If first argument is a string
export type FetchConfigTypeNoUrl<FetchDataType = any, BodyType = any> = Omit<
  FetchConfigType<FetchDataType, BodyType>,
  'url'
>

/**
 * Create a configuration object to use in a 'useFetche' call
 */
export type FetchInit<FDT = any, BT = any> = FetchConfigType<FDT, BT>
