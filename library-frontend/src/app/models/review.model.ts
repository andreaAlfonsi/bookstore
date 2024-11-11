export interface Review {
  id: number;           // ID univoco della recensione
  username: string;    // Informazioni sull'utente che ha scritto la recensione;
  book: number;       // Informazioni sul libro a cui la recensione appartiene;
  rating: number;        // Valutazione della recensione (da 1 a 5)
  comment: string;       // Testo della recensione
  created_at: string;    // Data di creazione della recensione
}