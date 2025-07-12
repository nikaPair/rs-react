class LocalStorageService {
  private readonly SEARCH_TERM_KEY = 'pokemonSearchTerm';

  public getSearchTerm(): string {
    return localStorage.getItem(this.SEARCH_TERM_KEY) || '';
  }

  public setSearchTerm(term: string): void {
    localStorage.setItem(this.SEARCH_TERM_KEY, term);
  }
}

export const localStorageService = new LocalStorageService();
