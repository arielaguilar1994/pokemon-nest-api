import { Injectable } from "@nestjs/common";
import { HttpAdapter } from "../interface/http-adapter.interface";

// Patron adaptador (me permitira cambiar a axios por ejemplo y adaptar las peticiones y ya)
@Injectable()
export class FetchAdapter implements HttpAdapter {

  private readonly http = fetch;
  
  async get<T>(url: string): Promise<T> {
    try {
      const response = await this.http(url);

      if(!response.ok) {
        throw new Error(`Fetch failed with status: ${response.status}`);
      }

      return await response.json();

    } catch (error) {
      throw new Error(error);
    }
  }

}