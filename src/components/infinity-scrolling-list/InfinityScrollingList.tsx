import {useVirtualizer} from "@tanstack/react-virtual";
import * as React from "react";
import {useEffect, useRef} from "react";
import {Box, Flex, Text} from "@radix-ui/themes";

type Props<T> = {
    data: T[];
    hasNextPage: boolean;
    isFetching: boolean;
    fetchNextPage: () => void;
    renderItem: (item: T) => React.ReactNode;
    estimateSize: number;
}

export const InfinityScrollingList = <T, >({
                                               data,
                                               hasNextPage,
                                               isFetching,
                                               fetchNextPage,
                                               renderItem,
                                               estimateSize
                                           }: Props<T>) => {
    const parentRef = useRef<HTMLDivElement>(null);

    const rowVirtualizer = useVirtualizer({
        count: hasNextPage ? data.length + 1 : data.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => estimateSize,
        overscan: 5,
    });

    const virtualItems = rowVirtualizer.getVirtualItems();

    useEffect(() => {
        const lastItem = virtualItems[virtualItems.length - 1];

        if (!lastItem) return;
        
        if (lastItem.index >= data.length - 1 && hasNextPage && !isFetching) {
            fetchNextPage();
        }
    }, [virtualItems, hasNextPage, isFetching, data.length, fetchNextPage]);

    return (
        <Box
            ref={parentRef}
            className="h-[calc(100vh-200px)] rounded-[var(--radius-3)] border border-[var(--gray-4)] bg-[var(--color-surface)] overflow-auto"
        >
            <Box
                className="relative w-full"
                style={{height: `${rowVirtualizer.getTotalSize()}px`}}
            >
                {virtualItems.map((virtualRow) => {
                    const isLoaderRow = virtualRow.index > data.length - 1;
                    const item = data[virtualRow.index];

                    return (
                        <Box
                            key={virtualRow.key}
                            className="absolute left-0 top-0 w-full"
                            style={{
                                height: `${virtualRow.size}px`,
                                transform: `translateY(${virtualRow.start}px)`,
                            }}
                        >
                            {isLoaderRow ? (
                                <Flex align="center" px="3" className="h-full border-b border-[var(--gray-3)]">
                                    <Text size="2" color="gray">Loading more...</Text>
                                </Flex>
                            ) : renderItem(item)}
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};