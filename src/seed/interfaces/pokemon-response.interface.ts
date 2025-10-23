export interface IPokemonResponse {
  count: number
  next: string
  previous: any
  results: IPokemonDataResponse[]
}

export interface IPokemonDataResponse {
  name: string
  url: string
}
