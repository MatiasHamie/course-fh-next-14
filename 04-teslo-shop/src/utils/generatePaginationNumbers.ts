// [1,2,3,4,...,10]

/**
 * Generates an array of pagination numbers based on the current page and total pages.
 *
 * The function handles different scenarios:
 * - If the total number of pages is 7 or less, it returns an array of all page numbers.
 * - If the current page is among the first 3 pages, it returns the first 3 pages, ellipsis, and the last 2 pages.
 * - If the current page is among the last 3 pages, it returns the first 2 pages, ellipsis, and the last 3 pages.
 * - For any other current page, it returns the first page, ellipsis, the current page and its neighbors, and the last page.
 *
 * @param currentPage - The current active page number.
 * @param totalPages - The total number of pages.
 * @returns An array of numbers and/or strings representing the pagination sequence.
 */
export const generatePaginationNumbers = (
  currentPage: number,
  totalPages: number
) => {
  // si el numero total de paginas es 7 o menos
  // vamos a mostrar todas las paginas sin puntos suspensivos
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1); // [1,2,3,4,5,6,7]
  }

  // Si la pagina actual esta entre las primeras 3 paginas
  // mostrar las primeras 3, puntos suspensivos y las ultimas 2
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages]; // [1,2,3,...,9,10]
  }

  // Si la pagina actual esta entre las ultimas 3 paginas
  // mostrar las primeras 2, puntos suspensivos y las ultimas 3
  if (currentPage > totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages]; // [1,2,...,8,9,10]
  }

  // Si la pagina actual esta en cualquier otro lugar
  // mostrar la primera pagina, puntos suspensivos, la pagina actual y vecinos
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
