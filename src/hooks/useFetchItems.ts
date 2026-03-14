import {useInfiniteQuery} from '@tanstack/react-query';
import {useEffect, useState} from 'react';


type FetchItems = {
    pageParam: number;
    searchTerm?: string;
    baseUrl: string;
}

const fetchItems = async ({pageParam, searchTerm, baseUrl}: FetchItems) => {
    const params = new URLSearchParams();

    params.append('_page', pageParam.toString());
    params.append('_per_page', '100');

    if (searchTerm) {
        const parts = searchTerm.trim().split(/\s+/);
        
        params.append('firstName_contains', parts[0]);
        if (parts[1]) params.append('lastName_contains', parts[1]);
    }

    const res = await fetch(`${baseUrl}?${params.toString()}`);

    if (!res.ok) throw new Error('Network response was not ok');

    return res.json();
};

export const useFetchItems = ({url}: { url: string }) => {
    const [inputValue, setQuery] = useState('');
    const [query, setDebouncedQuery] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedQuery(inputValue), 300);
        return () => clearTimeout(timer);
    }, [inputValue]);

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status
    } = useInfiniteQuery({
        queryKey: [url, query],
        queryFn: ({pageParam = 1}) => fetchItems({
            pageParam: pageParam as number,
            searchTerm: query,
            baseUrl: url,
        }),
        initialPageParam: 1,
        getNextPageParam: (lastPage: any) => lastPage.next ?? undefined,
    });

    return {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
        inputValue,
        setQuery
    };
};