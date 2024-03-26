### CLTP - Http client

CLTP is an HTTP client.

### Overview

Usage:

```jsx
import { Client } from 'cltp'

async function fetchData() {
  const { data, error } = await Client.get('/api/info')

  try {
    return data
  } catch err {
    return null
  }
}
```
