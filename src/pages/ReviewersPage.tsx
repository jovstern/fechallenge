import {Flex, Text} from '@radix-ui/themes'
import {Reviewer, REVIEWERS_URL} from "../api/apis.ts";
import {useFetchItems} from "../hooks/useFetchItems.ts";
import {InfinityScrollingList} from "../components/infinity-scrolling-list/InfinityScrollingList.tsx";
import {ListHeader} from "../components/list/ListHeader.tsx";
import {RenderItem} from "../components/list/RenderItem.tsx";

export const ReviewersPage = () => {
    const {
        data,
        status,
        fetchNextPage,
        hasNextPage,
        isFetching,
        inputValue,
        setQuery
    } = useFetchItems({url: REVIEWERS_URL});

    const totalItems = data?.pages[0]?.items ?? 0;
    const reviewers = data?.pages.flatMap(page => page.data) ?? [];

    const renderItem = (reviewer: Reviewer) => {
        if (!reviewer) return null;

        return <RenderItem item={reviewer} color="teal"/>
    };

    return (
        <Flex direction="column" gap="4" style={{height: '100%'}}>
            <ListHeader label="Reviewers" totalItems={totalItems} query={inputValue} setQuery={setQuery}/>

            {status === 'pending' && <Text color="gray">Loading...</Text>}
            {status === 'error' && <Text color="red">Error loading reviewers.</Text>}
            {status === 'success' && reviewers.length === 0 && <Text color="gray">No reviewers found.</Text>}
            {status === 'success' && reviewers.length > 0 && (
                <InfinityScrollingList
                    data={reviewers}
                    hasNextPage={hasNextPage}
                    isFetching={isFetching}
                    fetchNextPage={fetchNextPage}
                    renderItem={renderItem}
                    estimateSize={70}
                />
            )}
        </Flex>
    )
}