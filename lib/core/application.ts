import { AsteroidOptions } from './interfaces/application.ts'
import { serve, Server } from "https://deno.land/std@0.83.0/http/server.ts"

class Application {
  private server: Server;

  constructor(options: AsteroidOptions) {
    const { port, hostname, jsonParser } = options
    this.server = serve({port, hostname})
  }
}

export default Application