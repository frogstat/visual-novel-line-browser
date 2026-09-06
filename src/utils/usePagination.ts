import {useEffect, useState} from "react";

const MAX_RESULTS_PER_PAGE = 10;

export function usePagination(numberOfResults: number) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages: number = calculateTotalPages(numberOfResults);
    const currentPageStartIndex: number = (currentPage - 1) * MAX_RESULTS_PER_PAGE;
    const currentPageEndIndex: number = Math.min(currentPageStartIndex + MAX_RESULTS_PER_PAGE, numberOfResults);

    useEffect(() => {
        setCurrentPage(1);
    }, [numberOfResults]);

    useEffect(() => {

    }, [currentPage]);


    function goToPreviousPage(): void {
        if (currentPage < 2) {
            return;
        }
        setCurrentPage(currentPage - 1);
    }

    function goToNextPage(): void {
        if (currentPage >= totalPages) {
            return;
        }
        setCurrentPage(currentPage + 1);
    }




    return {
        goToPreviousPage,
        goToNextPage,
        currentPage,
        totalPages,
        currentPageStartIndex,
        currentPageEndIndex
    }
}


function calculateTotalPages(numberOfResults: number): number {
    return Math.max(Math.ceil(numberOfResults / MAX_RESULTS_PER_PAGE), 1);
}