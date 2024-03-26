const DEFAULT_RESOLVER = (e: any) => e.json()

const METHODS = {
  GET: 'GET',
  DELETE: 'DELETE',
  HEAD: 'HEAD',
  OPTIONS: 'OPTIONS',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  PURGE: 'PURGE',
  LINK: 'LINK',
  UNLINK: 'UNLINK'
}

export { DEFAULT_RESOLVER, METHODS }
